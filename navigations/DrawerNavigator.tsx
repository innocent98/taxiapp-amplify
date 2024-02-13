import {View, Text} from 'react-native';
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import StackNavigator from './StackNavigator';
import CustomDrawer from './CustomDrawer';
import Home from '../screens/home/Home';

const Drawer = createDrawerNavigator();

const DummyScreen = (text: any) => {
  return (
    <View style={{alignItems: 'center', justifyContent: 'center'}}>
      <Text>{text.text}</Text>
    </View>
  );
};
const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerTitle: '',
        headerTransparent: true,
      }}
      drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen name="HomeScreen" component={Home} />

      <Drawer.Screen name="Your Trips">
        {() => <DummyScreen text={'Your Trips'} />}
      </Drawer.Screen>

      <Drawer.Screen name="Help">
        {() => <DummyScreen text={'Help'} />}
      </Drawer.Screen>

      <Drawer.Screen name="Wallet">
        {() => <DummyScreen text={'Wallet'} />}
      </Drawer.Screen>

      <Drawer.Screen name="Settings">
        {() => <DummyScreen text={'Settings'} />}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
