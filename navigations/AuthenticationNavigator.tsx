import {View, Text} from 'react-native';
import React from 'react';
import Signup from '../screens/authentication/Signup';
import {createStackNavigator} from '@react-navigation/stack';
import ConfirmEmail from '../screens/authentication/ConfirmEmail';
import Login from '../screens/authentication/Login';

const Stack = createStackNavigator();

const AuthenticationNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{headerShown: false}}>
      <Stack.Screen component={Signup} name="Signup" />
      <Stack.Screen component={ConfirmEmail} name="ConfirmEmail" />
      <Stack.Screen component={Login} name="Login" />
    </Stack.Navigator>
  );
};

export default AuthenticationNavigator;
