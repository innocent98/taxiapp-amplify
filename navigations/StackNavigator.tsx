import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/home/Home';
import RegisterCar from '../screens/car/RegisterCar';
import useLocation from '../constants/hooks/useLocation';
import {Text, View} from 'react-native';

const Stack = createStackNavigator();

const StackNavigator = () => {
  const {location} = useLocation();

  return (
    <>
      {location ? (
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{headerShown: false}}>
          <Stack.Screen component={Home} name="Home" />
          <Stack.Screen component={RegisterCar} name="RegisterCar" />
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
