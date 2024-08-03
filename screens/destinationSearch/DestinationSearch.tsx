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
import useLocation from '../../constants/hooks/useLocation';

type NavigationProp = StackNavigationProp<StackParamList>;

const DestinationSearch = () => {
  const navigation = useNavigation<NavigationProp>();

  const {location, address} = useLocation();

  const [originPlace, setOriginPlace] = useState<any | null>(null);
  const [destinationPlace, setDestinationPlace] = useState<any | null>(null);
  const [airportDesc, setAirportDesc] = useState('');

  const homePlace = {
    description: 'Home',
    geometry: {location: {lat: 48.8152937, lng: 2.4597668}},
  };

  const workPlace = {
    description: 'Work',
    geometry: {location: {lat: 48.8496818, lng: 2.2940881}},
  };

  // reverse geocode for destination set to the airport
  const reverseGeocode = (lat: number, lng: number) => {
    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${googleApi}`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        if (data.results && data.results.length > 0) {
          const formattedAddress = data?.results[0]?.formatted_address;

          setAirportDesc(formattedAddress.substring(0, 40));
        } else {
          return;
        }
      })
      .catch(error => {
        console.error('Error fetching reverse geocoding:', error);
      });
  };

  // // update the destination place
  // useEffect(() => {
  //   setDestinationPlace({
  //     details: {
  //       geometry: {
  //         location: {
  //           lat: 4.8717055,
  //           lng: 8.08957,
  //         },
  //       },
  //     },
  //   });

  //   reverseGeocode(4.8717055, 8.08957);
  // }, []);

  useEffect(() => {
    if (originPlace && destinationPlace) {
      navigation.navigate('SearchResult', {
        originPlace: originPlace,
        destinationPlace: destinationPlace,
      });
    }
  }, [originPlace, destinationPlace]);

  useEffect(() => {
    // setOriginPlace(location);
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.inputCon}>
        <GooglePlacesAutocomplete
          placeholder={'Where from?'}
          minLength={2}
          nearbyPlacesAPI="GooglePlacesSearch"
          fetchDetails={true}
          onPress={(data, details = null) => {
            setOriginPlace({data, details});
          }}
          currentLocation={true}
          currentLocationLabel={'My Current Location'}
          query={{
            key: googleApi,
            language: 'en',
            radius: 5000,
            location: {
              latitude: location?.details.geometry.location.lat,
              longitude: location?.details.geometry.location.lng,
            },
            components: 'country:ng',
          }}
          predefinedPlacesAlwaysVisible={true}
          textInputProps={{
            placeholderTextColor: COLORS.light.link,
            defaultValue: address,
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
            setDestinationPlace({data, details});
          }}
          query={{
            key: googleApi,
            language: 'en',
            radius: 5000,
            location: {
              latitude: location?.details.geometry.location.lat,
              longitude: location?.details.geometry.location.lng,
            },
            components: 'country:ng',
          }}
          predefinedPlacesAlwaysVisible={true}
          textInputProps={{
            placeholderTextColor: COLORS.light.black,
            // value: airportDesc,
            // editable: false,
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
