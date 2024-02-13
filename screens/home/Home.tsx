import {View, Text, SafeAreaView} from 'react-native';
import React from 'react';
import HomeMap from '../../components/home/HomeMap';
import CovidMessage from '../../components/home/CovidMessage';
import Search from '../../components/home/Search';
import ScreenSizes from '../../constants/utils/ScreenSizes';
import { styles } from '../../constants/utils/styles';

const Home = () => {
  const {itemHeight} = ScreenSizes();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={{height: itemHeight * 0.55}}>
        <HomeMap />
      </View>

      <View style={{height: itemHeight * 0.45}}>
        <CovidMessage />
        <Search />
      </View>
    </SafeAreaView>
  );
};

export default Home;
