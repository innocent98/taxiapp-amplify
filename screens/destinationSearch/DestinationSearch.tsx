import {View, Text, TextInput, SafeAreaView, Platform} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from '../../constants/utils/styles';
import {COLORS} from '../../constants';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {googleApi} from '../../env.config';
import PlaceRow from '../../components/destination/PlaceRow';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackParamList} from '../../navigations/Navigation';
import {useNavigation} from '@react-navigation/native';
import Geolocation from '@react-native-community/geolocation';

type NavigationProp = StackNavigationProp<StackParamList>;

const DestinationSearch = () => {
  const navigation = useNavigation<NavigationProp>();

  const [currentLoc, setCurrentLoc] = useState<null | any>(null);
  const [address, setAddress] = useState<null | any>(null);
  const [originPlace, setOriginPlace] = useState<any | null>(null);
  const [destinationPlace, setDestinationPlace] = useState<any | null>(null);

  const reverseGeocode = (lat: number, lng: number) => {
    // Use a geocoding API or service to get address details from coordinates
    // You can use services like OpenCage, Google Maps Geocoding, etc.
    // const apiKey = 'YOUR_GEOCODING_API_KEY';
    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${googleApi}`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        console.log(data?.results[0]?.formatted_address);
        if (data.results && data.results.length > 0) {
          const formattedAddress = data?.results[0]?.formatted_address;
          setAddress(formattedAddress);
        } else {
          setAddress('Address not found');
        }
      })
      .catch(error => {
        console.error('Error fetching reverse geocoding:', error);
        setAddress('Error fetching address');
      });
  };

  useEffect(() => {
    // Get current location
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setCurrentLoc({latitude, longitude});

        reverseGeocode(latitude, longitude);
      },

      error => console.log('Error getting location:', error),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  }, []);

  // console.log(address);

  const homePlace = {
    description: 'Home',
    geometry: {location: {lat: 48.8152937, lng: 2.4597668}},
  };
  const workPlace = {
    description: 'Work',
    geometry: {location: {lat: 48.8496818, lng: 2.2940881}},
  };

  useEffect(() => {
    if (originPlace && destinationPlace) {
      navigation.navigate('SearchResult', {
        originPlace: originPlace,
        destinationPlace: destinationPlace,
      });
    }
  }, [originPlace, destinationPlace]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.inputCon}>
        <GooglePlacesAutocomplete
          placeholder={address ? address.substring(0, 40) : 'Current Location'}
          minLength={2}
          nearbyPlacesAPI="GooglePlacesSearch"
          fetchDetails
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            setOriginPlace({data, details});
            // console.log(data, details);
          }}
          currentLocation={true}
          currentLocationLabel="Current Location"
          query={{
            key: googleApi,
            language: 'en',
          }}
          predefinedPlacesAlwaysVisible={true}
          textInputProps={{
            placeholderTextColor: COLORS.light.link,
          }}
          styles={{
            description: {
              color: COLORS.light.black, // Color of the suggestion text
            },
            textInput: [
              styles.input,
              {color: COLORS.light.link, height: 50, marginLeft: 20},
            ],
            container: {
              position: 'absolute',
              top: 0,
              left: 10,
              right: 10,
              zIndex: 999,
            },
            listView: {position: 'absolute', top: 120},
          }}
          renderRow={data => <PlaceRow data={data} />}
          renderDescription={data => data.description || data?.vicinity}
          enablePoweredByContainer={false}
          predefinedPlaces={[homePlace, workPlace]}
        />

        <GooglePlacesAutocomplete
          placeholder="Where to?"
          minLength={2}
          nearbyPlacesAPI="GooglePlacesSearch"
          fetchDetails
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            setDestinationPlace({data, details});
            // console.log(data, details);
          }}
          query={{
            key: googleApi,
            language: 'en',
          }}
          predefinedPlacesAlwaysVisible={true}
          textInputProps={{
            placeholderTextColor: COLORS.light.black,
          }}
          styles={{
            description: {
              color: COLORS.light.black, // Color of the suggestion text
            },
            textInput: [
              styles.input,
              {color: COLORS.light.black, height: 50, marginLeft: 20},
            ],
            container: {
              position: 'absolute',
              top: 55,
              left: 10,
              right: 10,
            },
          }}
          renderRow={data => <PlaceRow data={data} />}
          enablePoweredByContainer={false}
        />

        <View style={styles.circle}></View>
        <View style={styles.line}></View>
        <View style={styles.square}></View>
      </View>
    </SafeAreaView>
  );
};

export default DestinationSearch;
