import React, {useEffect, useState} from 'react';
import DrawerNavigator from './navigations/DrawerNavigator';
import StackNavigator from './navigations/StackNavigator';
import AuthenticationNavigator from './navigations/AuthenticationNavigator';
import useUser from './constants/hooks/useUser';
import {useDispatch} from 'react-redux';
import Geolocation from '@react-native-community/geolocation';
import {setAddressState, setLocationState} from './redux/locationRedux';
import {googleApi} from './env.config';

const MainApp = () => {
  const dispatch = useDispatch();

  const {user} = useUser();

  const reverseGeocode = (lat: number, lng: number) => {
    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${googleApi}`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        // console.log('data:', data?.results[0]?.geometry);
        if (data.results && data.results.length > 0) {
          const formattedAddress = data?.results[0]?.formatted_address;

          // console.log(data?.results[0]);

          dispatch(setAddressState(formattedAddress?.substring(0, 30)));
        } else {
          return;
        }
      })
      .catch(error => {
        console.error('Error fetching reverse geocoding:', error);
      });
  };

  useEffect(() => {
    // Get current location
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;

        if (latitude && longitude) {
          dispatch(
            setLocationState({
              details: {
                geometry: {
                  location: {
                    lat: latitude,
                    lng: longitude,
                  },
                },
              },
            }),
          );
        }

        // console.log('position:', position);

        reverseGeocode(latitude, longitude);
      },

      error => console.log('Error getting location:', error),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  }, []);

  return user ? <StackNavigator /> : <AuthenticationNavigator />;
};

export default MainApp;
