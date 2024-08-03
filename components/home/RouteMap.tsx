import React, {useEffect, useRef} from 'react';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {googleApi} from '../../env.config';

interface ScreenProps {
  originPlace: any;
  destinationPlace: any;
}

const RouteMap: React.FC<ScreenProps> = ({originPlace, destinationPlace}) => {
  const mapRef = useRef<MapView>(null);

  const origin = {
    latitude: originPlace?.details?.geometry?.location?.lat,
    longitude: originPlace?.details?.geometry?.location?.lng,
  };

  const destination = {
    latitude: destinationPlace?.details?.geometry?.location?.lat,
    longitude: destinationPlace?.details?.geometry?.location?.lng,
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
