import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {COLORS} from '../../constants';
import {googleApi} from '../../env.config';
import {updateCar} from '../../src/graphql/mutations';
import {generateClient} from 'aws-amplify/api';
import useUser from '../../constants/hooks/useUser';
import Geolocation from '@react-native-community/geolocation';

const client = generateClient();

interface Car {
  data: {getCar: any; updateCar: any; listOrders: {items: any}};
}

interface Order {
  order: any;
  setDuration: (value: any) => void;
  setDistance: (value: any) => void;
  setAddress: (value: any) => void;
}

const NewOrderMap: React.FC<Order> = ({
  order,
  setDistance,
  setDuration,
  setAddress,
}) => {
  const {user} = useUser();

  const [car, setCar] = useState<null | any>(null);

  const orderOrigin = {
    latitude: order?.originLatitude,
    longitude: order?.originLongitude,
  };

  const handleUserLocationChange = async (event: any) => {
    // Update the destination coordinates based on the user's location change

    const {latitude, longitude, heading} = event.nativeEvent.coordinate;

    try {
      const res = (await client.graphql({
        query: updateCar,
        variables: {
          input: {id: user, latitude, longitude, heading},
        },
      })) as Car;

      setCar(res.data.updateCar);
    } catch (error) {}
  };

  const reverseGeocode = (lat: number, lng: number) => {
    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${googleApi}`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        // console.log('data:', data?.results[0]?.geometry);
        if (data.results && data.results.length > 0) {
          const formattedAddress = data?.results[0]?.formatted_address;
          setAddress(formattedAddress);
        } else {
          setAddress('Address not found');
        }
      })
      .catch(error => {
        console.error('Error fetching reverse geocoding:', error);
        setAddress('Error fetching address');
      });
  };

  useEffect(() => {
    // Get current location
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;

        reverseGeocode(latitude, longitude);
      },

      error => console.log('Error getting location:', error),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  }, []);

  return (
    <MapView
      style={{width: '100%', height: '100%'}}
      provider={PROVIDER_GOOGLE}
      showsUserLocation={true}
      showsMyLocationButton={false}
      onUserLocationChange={handleUserLocationChange}
      userLocationUpdateInterval={20000}
      initialRegion={{
        latitude: 4.9941616,
        longitude: 7.9526544,
        latitudeDelta: 0.0222,
        longitudeDelta: 0.0121,
      }}>
      {car && (
        <MapViewDirections
          origin={{
            latitude: car?.latitude,
            longitude: car?.longitude,
          }}
          destination={orderOrigin}
          apikey={googleApi}
          strokeWidth={4}
          strokeColor={COLORS.light.link}
          timePrecision="now"
          onReady={result => {
            setDuration(result.duration);
            setDistance(result.distance);
          }}
        />
      )}
    </MapView>
  );
};

export default NewOrderMap;
