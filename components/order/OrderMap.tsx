import {Image} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
// import {cars} from '../../assets/UberAssets/data/cars';
import {generateClient} from 'aws-amplify/api';
import MapViewDirections from 'react-native-maps-directions';
import {googleApi} from '../../env.config';
import {
  ARRIVAL,
  DROPPING_OFF_CLIENT,
  NEW,
  PICKING_UP_CLIENT,
} from '../../constants/orderStatus';

const client = generateClient();

interface ScreenProps {
  car: {longitude: number; latitude: number; type: String; heading: number};
  order: any;
  setDuration: (value: number) => void;
  setDistance: (value: number) => void;
}

interface Response {
  data: {
    listCars: {items: []};
  };
}

const OrderMap: React.FC<ScreenProps> = ({
  car,
  order,
  setDistance,
  setDuration,
}) => {
  const mapRef = useRef<MapView>(null);

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

  const origin = {
    latitude: order?.originLatitude,
    longitude: order?.originLongitude,
  };

  const destination = {
    latitude: order?.destinationLatitude,
    longitude: order?.destinationLongitude,
  };

  useEffect(() => {
    if (mapRef.current) {
      setTimeout(() => {
        // Create an array with origin and destination coordinates
        const coordinates = [origin, destination];

        // Fit the map to the coordinates with padding
        mapRef?.current?.fitToCoordinates(coordinates, {
          edgePadding: {top: 50, right: 50, bottom: 50, left: 50},
          animated: true,
        });
      }, 2000);
    }
  }, [origin, destination]);

  return (
    <MapView
      ref={mapRef}
      style={{height: '100%', width: '100%'}}
      provider={PROVIDER_GOOGLE}
      showsUserLocation={true}
      showsMyLocationButton={false}
      initialRegion={{
        latitude: 4.9941616,
        longitude: 7.9526544,
        latitudeDelta: 0.0222,
        longitudeDelta: 0.0121,
      }}>
      {car && order?.status === PICKING_UP_CLIENT && (
        <Marker coordinate={{latitude: car.latitude, longitude: car.longitude}}>
          <Image
            source={getImageSource(car.type)}
            style={{
              width: 50,
              height: 50,
              transform: [{rotate: `${car.heading}deg`}],
            }}
            resizeMode="contain"
          />
        </Marker>
      )}

      {/* TODO: change to order.status !== NEW */}
      {order?.status !== NEW && order?.status !== PICKING_UP_CLIENT && (
        <MapViewDirections
          origin={origin}
          destination={destination}
          apikey={googleApi}
          strokeWidth={3}
          strokeColor="green"
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

export default OrderMap;
