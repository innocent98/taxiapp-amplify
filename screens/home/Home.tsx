import {View, Text, SafeAreaView} from 'react-native';
import React, {useEffect} from 'react';
import HomeMap from '../../components/home/HomeMap';
import CovidMessage from '../../components/home/CovidMessage';
import Search from '../../components/home/Search';
import ScreenSizes from '../../constants/utils/ScreenSizes';
import {styles} from '../../constants/utils/styles';
import {generateClient} from 'aws-amplify/api';
import {updateUser} from '../../src/graphql/mutations';
import {getUser} from '../../src/graphql/queries';
import useUser from '../../constants/hooks/useUser';
import {useDispatch} from 'react-redux';
import Geolocation from '@react-native-community/geolocation';
import {setAddressState, setLocationState} from '../../redux/locationRedux';
import {googleApi} from '../../env.config';

const client = generateClient();

interface User {
  data: {getUser: {userRole: any}};
}
const Home = () => {
  const {itemHeight} = ScreenSizes();

  const dispatch = useDispatch();

  const {user} = useUser();

  // automatically update user's info the first time after registration
  const updateUserProfile = async () => {
    const userData = (await client.graphql({
      query: getUser,
      variables: {id: user},
    })) as User;

    if (!userData.data.getUser.userRole) {
      await client.graphql({
        query: updateUser,
        variables: {
          input: {id: user, wallet: 0, userRole: 'User', country: 'Nigeria'},
        },
      });
    }
  };

  useEffect(() => {
    updateUserProfile();
  }, []);

  const reverseGeocode = (lat: number, lng: number) => {
    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${googleApi}`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        // console.log('data:', data?.results[0]?.geometry);
        if (data.results && data.results.length > 0) {
          const formattedAddress = data?.results[0]?.formatted_address;

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

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={{height: itemHeight * 0.55}}>
        <HomeMap />
      </View>

      <View style={{height: itemHeight * 0.45}}>
        <CovidMessage />
        <Search />
      </View>
    </SafeAreaView>
  );
};

export default Home;
