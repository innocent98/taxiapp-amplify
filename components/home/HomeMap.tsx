import {View, Text, Image, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from '../../constants/utils/styles';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
// import {cars} from '../../assets/UberAssets/data/cars';
import {generateClient} from 'aws-amplify/api';
import {listCars} from '../../src/graphql/queries';

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

const HomeMap = () => {
  const [cars, setCars] = useState<any | []>([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = (await client.graphql({
          query: listCars,
        })) as Response;

        setCars(response?.data?.listCars?.items);
      } catch (error) {}
    };

    fetchCars();
  }, []);

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

  return (
    <MapView
      style={{height: '100%', width: '100%'}}
      provider={PROVIDER_GOOGLE}
      showsUserLocation={true}
      showsMyLocationButton={false}
      initialRegion={{
        latitude: 28.450627,
        longitude: -16.263045,
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
