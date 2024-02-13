import {View, Text, Image, FlatList} from 'react-native';
import React from 'react';
import {styles} from '../../constants/utils/styles';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {cars} from '../../assets/UberAssets/data/cars';
import MapViewDirections from 'react-native-maps-directions';
import {googleApi} from '../../env.config';

interface ScreenProps {
  originPlace: any;
  destinationPlace: any;
}

const RouteMap: React.FC<ScreenProps> = ({originPlace, destinationPlace}) => {
  const origin = {
    latitude: originPlace?.details?.geometry?.location?.lat,
    longitude: originPlace?.details?.geometry?.location?.lng,
  };

  const destination = {
    latitude: destinationPlace?.details?.geometry?.location?.lat,
    longitude: destinationPlace?.details?.geometry?.location?.lng,
  };

  return (
    <MapView
      style={{height: '100%', width: '100%'}}
      provider={PROVIDER_GOOGLE}
      showsUserLocation={true}
      showsMyLocationButton={false}
      initialRegion={{
        latitude: origin.latitude,
        longitude: origin.longitude,
        latitudeDelta: 0.0222,
        longitudeDelta: 0.0121,
      }}>
      {/* <Marker coordinate={origin} title="Origin" /> */}

      <MapViewDirections
        origin={origin}
        destination={destination}
        apikey={googleApi}
        strokeWidth={3}
        strokeColor="green"
      />

      <Marker coordinate={destination} title="Destination" />
    </MapView>
  );
};

export default RouteMap;
