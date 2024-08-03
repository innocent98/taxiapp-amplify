import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Signup from '../screens/authentication/Signup';
import Login from '../screens/authentication/Login';
import ConfirmEmail from '../screens/authentication/ConfirmEmail';

const Stack = createStackNavigator();

const AuthenticationNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Signup"
      screenOptions={{headerShown: false}}>
      <Stack.Screen component={Signup} name="Signup" />
      <Stack.Screen component={Login} name="Login" />
      <Stack.Screen component={ConfirmEmail} name="ConfirmEmail" />
    </Stack.Navigator>
  );
};

export default AuthenticationNavigator;
