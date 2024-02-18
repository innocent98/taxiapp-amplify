import {View, Text, Pressable} from 'react-native';
import React from 'react';
import {styles} from '../../constants/utils/styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import {COLORS} from '../../constants';
import {StackParamList} from '../../navigations/Navigation';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';

type NavigationProp = StackNavigationProp<StackParamList>;

const Search = () => {
  const navigation = useNavigation<NavigationProp>();

  const handleNavigation = (route: any) => {
    navigation.navigate(route);
  };

  return (
    <View style={{padding: 15, backgroundColor: COLORS.light.backgroundSoft}}>
      <Pressable
        onPress={() => handleNavigation('DestinationSearch')}
        style={[styles.flex, {backgroundColor: COLORS.light.lightGrey, paddingVertical: 15}]}>
        <Text
          style={[
            styles.smallText,
            {marginBottom: 0, color: COLORS.light.black},
          ]}>
          Where to?
        </Text>

        <View style={styles.timeCon}>
          <AntDesign name="clockcircle" size={14} color="black" />
          <Text style={styles.timeText}>Now</Text>
          <Entypo name="chevron-down" size={20} color="black" />
        </View>
      </Pressable>

      <View style={[styles.row, {}]}>
        <View style={styles.iconContainer}>
          <AntDesign name="clockcircle" color={COLORS.light.white} size={14} />
        </View>

        <Text
          style={[
            styles.smallText,
            {color: COLORS.light.black, fontWeight: '600'},
          ]}>
          Spin Nightclub
        </Text>
      </View>

      <View style={[styles.row, {}]}>
        <View
          style={[styles.iconContainer, {backgroundColor: COLORS.light.link}]}>
          <Entypo name="home" color={COLORS.light.white} size={14} />
        </View>

        <Text
          style={[
            styles.smallText,
            {color: COLORS.light.black, fontWeight: '600'},
          ]}>
          Spin Nightclub
        </Text>
      </View>
    </View>
  );
};

export default Search;
