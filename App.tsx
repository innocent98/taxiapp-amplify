/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {Platform, PermissionsAndroid} from 'react-native';
import React, {useEffect} from 'react';
import {StatusBar, useColorScheme} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import Home from './screens/home/Home';
import Geolocation from '@react-native-community/geolocation';
import {withAuthenticator} from '@aws-amplify/ui-react-native';
import {generateClient} from 'aws-amplify/api';
import {getCurrentUser} from 'aws-amplify/auth';
import {getCarId} from './src/graphql/queries';
import {createCar} from './src/graphql/mutations';

navigator.geolocation = require('@react-native-community/geolocation');

const client = generateClient();

interface Car {
  data: {getCar: any};
}

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'light';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Taxi App Location Permission',
          message:
            'Taxi App needs access to your location ' +
            'so you can take awesome rides.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the location');
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    if (Platform.OS === 'android') {
      requestLocationPermission();
    } else {
      Geolocation.requestAuthorization();
    }
  }, []);

  useEffect(() => {
    const updateUsserCar = async () => {
      const {userId} = await getCurrentUser();

      if (!userId) {
        return;
      }

      const carData = (await client.graphql({
        query: getCarId,
        variables: {id: userId},
      })) as Car;

      // console.log(carData.data);

      if (carData?.data?.getCar) {
        console.log('Car exist');
        return;
      } else {
        const newCar = {
          id: userId,
          type: 'UberX',
          userId: userId,
        };

        await client.graphql({
          query: createCar,
          variables: {input: newCar},
        });

        console.log('Car registered');
      }
    };

    updateUsserCar();
  }, []);

  return (
    <>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <Home />
    </>
  );
}

export default withAuthenticator(App);
