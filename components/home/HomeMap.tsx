import {View, Text, Image, FlatList} from 'react-native';
import React from 'react';
import {styles} from '../../constants/utils/styles';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {cars} from '../../assets/UberAssets/data/cars';

interface Cars {
  longitude: number;
  latitude: number;
  type: String;
}

const HomeMap = () => {
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
      {cars.map((item, index) => (
        <Marker
          key={index}
          coordinate={{latitude: item.latitude, longitude: item.longitude}}>
          <Image
            source={getImageSource(item.type)}
            style={{width: 50, height: 50}}
            resizeMode="contain"
          />
        </Marker>
      ))}
    </MapView>
  );
};

export default HomeMap;
