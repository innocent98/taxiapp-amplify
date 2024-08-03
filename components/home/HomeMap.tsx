import {View, Text} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {googleApi} from '../../env.config';
import MapViewDirections from 'react-native-maps-directions';
import {COLORS} from '../../constants';
import Geolocation from '@react-native-community/geolocation';
import {getCurrentUser} from 'aws-amplify/auth';
import {generateClient} from 'aws-amplify/api';
import {updateCar} from '../../src/graphql/mutations';
import {DROPPING_OFF_CLIENT} from '../../constants/orderStatus';
import useLocation from '../../constants/hooks/useLocation';

const client = generateClient();

interface ScreenProps {
  order: {
    originLatitude: number;
    originLongitude: number;
    destinationLatitude: number;
    destinationLongitude: number;
    pickedUp: boolean;
    status: String;
  };
  setDuration: (value: number) => void;
  setDistance: (value: number) => void;
  distance: any;
  duration: any;
  onOrderAcceptCarUpdate: (value: object) => void;
  car: any;
}

interface Car {
  data: {getCar: any; updateCar: any; listOrders: {items: any}};
}

const HomeMap: React.FC<ScreenProps> = ({
  order,
  setDistance,
  setDuration,
  duration,
  distance,
  onOrderAcceptCarUpdate,
  car,
}) => {
  const mapRef = useRef<MapView>(null);

  const {location} = useLocation();

  // const [car, setCar] = useState<null | any>(null);

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

  const handleUserLocationChange = async (event: any) => {
    // Update the destination coordinates based on the user's location change
    const newDestination = {
      latitude: event.nativeEvent.coordinate.latitude,
      longitude: event.nativeEvent.coordinate.longitude,
    };

    const {latitude, longitude, heading} = event.nativeEvent.coordinate;

    // Set the new destination for the MapViewDirections
    setMyCurrentPosition(newDestination);

    onOrderAcceptCarUpdate({
      id: car?.id,
      latitude,
      longitude,
      heading,
      arrivalDuration: duration,
      arrivalDistance: distance,
    });

    // try {
    //   const {userId} = await getCurrentUser();

    //   const res = (await client.graphql({
    //     query: updateCar,
    //     variables: {
    //       input: {
    //         id: userId,
    //         latitude,
    //         longitude,
    //         heading,
    //         arrivalDuration: duration,
    //         arrivalDistance: distance,
    //       },
    //     },
    //   })) as Car;

    //   setCar(res.data.updateCar);
    // console.log(res.data.updateCar)
    // } catch (error) {}
  };

  // console.log(order);

  return (
    <MapView
      ref={mapRef}
      style={{width: '100%', height: '100%'}}
      provider={PROVIDER_GOOGLE}
      showsUserLocation={true}
      showsMyLocationButton={false}
      onUserLocationChange={handleUserLocationChange}
      // userLocationUpdateInterval={10000}
      initialRegion={{
        latitude: location?.details?.geometry?.location?.lat,
        longitude: location?.details?.geometry?.location?.lng,
        latitudeDelta: 0.0222,
        longitudeDelta: 0.0121,
      }}>
      {order && (
        <MapViewDirections
          origin={{
            latitude: car?.latitude,
            longitude: car?.longitude,
          }}
          destination={
            order?.status === DROPPING_OFF_CLIENT ? orderDest : orderOrigin
          }
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
