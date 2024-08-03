import {View, SafeAreaView} from 'react-native';
import React, {useEffect, useState} from 'react';
import UberTypes from '../uberType/UberTypes';
import {styles} from '../../constants/utils/styles';
import ScreenSizes from '../../constants/utils/ScreenSizes';
import RouteMap from '../../components/home/RouteMap';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {StackParamList} from '../../navigations/Navigation';
import {generateClient} from 'aws-amplify/api';
import {getCurrentUser} from 'aws-amplify/auth';
import {createOrder} from '../../src/graphql/mutations';
import {StackNavigationProp} from '@react-navigation/stack';
import {NEW} from '../../constants/orderStatus';

const client = generateClient();

type NavigationProp = StackNavigationProp<StackParamList>;

interface Route {
  route: RouteProp<StackParamList, 'SearchResult'>;
}

interface Order {
  data: {createOrder: {id: number}};
}

const SearchResult: React.FC<Route> = ({route}) => {
  const {originPlace, destinationPlace} = route.params;

  const {itemHeight} = ScreenSizes();

  const navigation = useNavigation<NavigationProp>();

  const [selectedType, setSelectedType] = useState<null | any>(null);
  const [baseFare, setBaseFare] = useState(10);

  useEffect(() => {
    switch (selectedType) {
      case 'UberX':
        setBaseFare(10);
        break;

      case 'Comfort':
        setBaseFare(12);
        break;

      case 'UberXL':
        setBaseFare(14);
        break;

      default:
        setBaseFare(10);
        break;
    }
  }, [selectedType]);

  // function to calculate trip price in regards to the distance and time
  const haversineDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ) => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c; // Distance in kilometers
    return distance;
  };

  const toRadians = (angle: number) => {
    return (angle * Math.PI) / 180;
  };

  const calculateTripPrice = (
    distance: number,
    baseFare: number,
    ratePerKm: number,
  ) => {
    // Your pricing logic goes here
    const price = baseFare + distance * ratePerKm;
    return price;
  };

  const distance = haversineDistance(
    originPlace?.details?.geometry?.location?.lat,
    originPlace?.details?.geometry?.location?.lng,
    destinationPlace?.details?.geometry?.location?.lat,
    destinationPlace?.details?.geometry?.location?.lng,
  );

  // const baseFare = 10; // Example base fare
  const ratePerKm = 2; // Example rate per kilometer

  const tripPrice = calculateTripPrice(distance, baseFare, ratePerKm);

  const onSubmit = async () => {
    if (!selectedType) {
      return;
    } else {
      const {userId} = await getCurrentUser();

      try {
        const input = {
          type: selectedType,
          status: NEW,
          amount: tripPrice,

          originLatitude: originPlace?.details?.geometry?.location?.lat,
          originLongitude: originPlace?.details?.geometry?.location?.lng,

          destinationLatitude:
            destinationPlace?.details?.geometry?.location?.lat,
          destinationLongitude:
            destinationPlace?.details?.geometry?.location?.lng,

          userId: userId,
          carId: '1',
        };

        const response = (await client.graphql({
          query: createOrder,
          variables: {
            input,
          },
        })) as Order;

        navigation.navigate('Order', {id: response.data.createOrder.id});
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
          distance={distance}
          ratePerKm={ratePerKm}
        />
      </View>
    </SafeAreaView>
  );
};

export default SearchResult;
