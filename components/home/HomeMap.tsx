import {View, Text} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {googleApi} from '../../env.config';
import MapViewDirections from 'react-native-maps-directions';
import {COLORS} from '../../constants';
import Geolocation from '@react-native-community/geolocation';

interface ScreenProps {
  order: {
    originLatitude: number;
    originLongitude: number;
    destinationLatitude: number;
    destinationLongitude: number;
    pickedUp: boolean;
  };
  setDuration: (value: number) => void;
  setDistance: (value: number) => void;
  distance: any;
}

const HomeMap: React.FC<ScreenProps> = ({
  order,
  setDistance,
  setDuration,
  distance,
}) => {
  const mapRef = useRef<MapView>(null);

  const [myCurrentPosition, setMyCurrentPosition] = useState({
    latitude: 0,
    longitude: 0,
  });

  const orderOrigin = {
    latitude: order?.originLatitude,
    longitude: order?.originLongitude,
  };

  const orderDest = {
    latitude: order?.destinationLatitude,
    longitude: order?.destinationLongitude,
  };

  useEffect(() => {
    // Get current location
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setMyCurrentPosition({latitude, longitude});
      },
      error => console.log('Error getting location:', error),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  }, []);

  useEffect(() => {
    if (mapRef.current) {
      setTimeout(() => {
        // Create an array with origin and destination coordinates
        const coordinates = [myCurrentPosition, orderOrigin];

        // Fit the map to the coordinates with padding
        mapRef?.current?.fitToCoordinates(coordinates, {
          edgePadding: {top: 50, right: 50, bottom: 50, left: 50},
          animated: true,
        });
      }, 2000);
    }
  }, [orderOrigin]);

  const handleUserLocationChange = (event: any) => {
    // Update the destination coordinates based on the user's location change
    const newDestination = {
      latitude: event.nativeEvent.coordinate.latitude,
      longitude: event.nativeEvent.coordinate.longitude,
    };

    // Set the new destination for the MapViewDirections
    setMyCurrentPosition(newDestination);
  };

  const getDestination = () => {};

  return (
    <MapView
      ref={mapRef}
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
      {order && (
        <MapViewDirections
          origin={myCurrentPosition}
          destination={order?.pickedUp ? orderDest : orderOrigin}
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

export default HomeMap;
