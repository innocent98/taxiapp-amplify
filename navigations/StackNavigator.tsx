import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/home/Home';
import DestinationSearch from '../screens/destinationSearch/DestinationSearch';
import SearchResult from '../screens/searchResult/SearchResult';
import DrawerNavigator from './DrawerNavigator';
import Order from '../screens/order/Order';
import useLocation from '../constants/hooks/useLocation';
import {Text, View} from 'react-native';

const Stack = createStackNavigator();

const StackNavigator = () => {
  const {location} = useLocation();
  return (
    <>
      {location ? (
        <Stack.Navigator screenOptions={{headerShown: true}}>
          <Stack.Screen
            name="Home"
            component={DrawerNavigator}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="DestinationSearch"
            component={DestinationSearch}
            options={{headerTitle: 'Where to'}}
          />

          <Stack.Screen
            name="SearchResult"
            component={SearchResult}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="Order"
            component={Order}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
          }}>
          <Text style={{color: 'black'}}>Taxi App loading...</Text>
        </View>
      )}
    </>
  );
};

export default StackNavigator;
