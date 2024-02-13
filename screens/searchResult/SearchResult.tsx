import {View, Text, SafeAreaView} from 'react-native';
import React from 'react';
import HomeMap from '../../components/home/HomeMap';
import UberTypes from '../uberType/UberTypes';
import {styles} from '../../constants/utils/styles';
import ScreenSizes from '../../constants/utils/ScreenSizes';
import RouteMap from '../../components/home/RouteMap';
import {RouteProp, useRoute} from '@react-navigation/native';
import {StackParamList} from '../../navigations/Navigation';

interface Route {
  route: RouteProp<StackParamList, 'SearchResult'>;
}
const SearchResult: React.FC<Route> = ({route}) => {

  const {originPlace, destinationPlace} = route.params

  const {itemHeight} = ScreenSizes();

  // const originPlace = route.params;
  // const destinationPlace = route.params;

  // console.log(originPlace?.details?.geometry?.location, destinationPlace?.details?.geometry?.location)

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={{height: itemHeight * 0.65}}>
        <RouteMap originPlace={originPlace} destinationPlace={destinationPlace} />
      </View>

      <View style={{height: itemHeight * 0.35}}>
        <UberTypes />
      </View>
    </SafeAreaView>
  );
};

export default SearchResult;
