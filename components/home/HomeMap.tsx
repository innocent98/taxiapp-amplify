import {Image} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {generateClient} from 'aws-amplify/api';
import {listCars} from '../../src/graphql/queries';
import Geolocation from '@react-native-community/geolocation';
import useLocation from '../../constants/hooks/useLocation';

const client = generateClient();

interface Cars {
  longitude: number;
  latitude: number;
  type: String;
  heading: number;
}

interface Response {
  data: {
    listCars: {items: []};
  };
}

interface Location {
  details: {geometry: {location: {}}};
}

const HomeMap = () => {
  const {location} = useLocation();

  const [cars, setCars] = useState<any | []>([]);
  const [currentLoc, setCurrentLoc] = useState<null | any>(null);

  const fetchCars = useCallback(async () => {
    try {
      const response = (await client.graphql({
        query: listCars,
        variables: {filter: {isActive: {eq: true}}},
      })) as Response;

      setCars(response?.data?.listCars?.items);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchCars();
  }, []);

  // TODO: make subscription for all cars for real-time updates of cars

  // console.log(cars)

  const getImageSource = (type: String) => {
    switch (type) {
      case 'UberX':
        return require('../../assets/UberAssets/images/top-UberX.png');
      case 'Comfort':
        return require('../../assets/UberAssets/images/top-Comfort.png');
      case 'UberXL':
        return require('../../assets/UberAssets/images/top-UberXL.png');
      default:
        return require('../../assets/UberAssets/images/top-UberX.png');
    }
  };

  useEffect(() => {
    // Get current location
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setCurrentLoc({latitude, longitude});
      },
      error => console.log('Error getting location:', error),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  }, []);

  return (
    <MapView
      style={{height: '100%', width: '100%'}}
      provider={PROVIDER_GOOGLE}
      showsUserLocation={true}
      showsMyLocationButton={false}
      initialRegion={{
        latitude: location?.details?.geometry?.location?.lat,
        longitude: location?.details?.geometry?.location?.lng,
        latitudeDelta: 0.0222,
        longitudeDelta: 0.0121,
      }}>
      {cars.map((item: Cars, index: number) => (
        <Marker
          key={index}
          coordinate={{latitude: item.latitude, longitude: item.longitude}}>
          <Image
            source={getImageSource(item.type)}
            style={{
              width: 50,
              height: 50,
              transform: [{rotate: `${item.heading}deg`}],
            }}
            resizeMode="contain"
          />
        </Marker>
      ))}
    </MapView>
  );
};

export default HomeMap;
