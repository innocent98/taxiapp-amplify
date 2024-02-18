import {View, Text, SafeAreaView, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import HomeMap from '../../components/home/HomeMap';
import UberTypes from '../uberType/UberTypes';
import {styles} from '../../constants/utils/styles';
import ScreenSizes from '../../constants/utils/ScreenSizes';
import RouteMap from '../../components/home/RouteMap';
import {RouteProp, useRoute} from '@react-navigation/native';
import {StackParamList} from '../../navigations/Navigation';
import {generateClient} from 'aws-amplify/api';
import {getCurrentUser} from 'aws-amplify/auth';
import {createOrder} from '../../src/graphql/mutations';

const client = generateClient();

interface Route {
  route: RouteProp<StackParamList, 'SearchResult'>;
}

const SearchResult: React.FC<Route> = ({route}) => {
  const {originPlace, destinationPlace} = route.params;

  const {itemHeight} = ScreenSizes();

  const [selectedType, setSelectedType] = useState(null);

  const onSubmit = async () => {
    if (!selectedType) {
      return;
    } else {
      const {userId} = await getCurrentUser();

      const date = new Date();

      try {
        const input = {
          type: selectedType,
          createdAt: date.toISOString(),

          originLatitude: originPlace?.details?.geometry?.location?.lat,
          originLongitude: originPlace?.details?.geometry?.location?.lng,

          destinationLatitude:
            destinationPlace?.details?.geometry?.location?.lat,
          destinationLongitude:
            destinationPlace?.details?.geometry?.location?.lng,

          userId: userId,
          carId: '1',
          status: 'NEW'
        };

        const response = await client.graphql({
          query: createOrder,
          variables: {
            input,
          },
        });

        // console.log(response);

        Alert.alert('Huraay!', 'Your order has been submitted');
      } catch (error) {}
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={{height: itemHeight * 0.65}}>
        <RouteMap
          originPlace={originPlace}
          destinationPlace={destinationPlace}
        />
      </View>

      <View style={{height: itemHeight * 0.35}}>
        <UberTypes
          setSelectedType={setSelectedType}
          selectedType={selectedType}
          onSubmit={onSubmit}
        />
      </View>
    </SafeAreaView>
  );
};

export default SearchResult;
