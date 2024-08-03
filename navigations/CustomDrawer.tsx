import {View, Text, Pressable} from 'react-native';
import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {COLORS, SIZES} from '../constants';
import {styles} from '../constants/utils/styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ScreenSizes from '../constants/utils/ScreenSizes';
import {signOut} from 'aws-amplify/auth';
import AccountDeletion from '../constants/utils/AccountDeletion';
import {useDispatch} from 'react-redux';
import {setUserState} from '../redux/userRedux';

const CustomDrawer = (props: any) => {
  const {itemHeight} = ScreenSizes();

  const dispatch = useDispatch();

  return (
    <DrawerContentScrollView {...props}>
      <View style={{backgroundColor: COLORS.light.primary, padding: 15}}>
        <View style={[styles.row, {borderBottomWidth: 0, padding: 0}]}></View>

        <View
          style={[
            styles.row,
            {padding: 0, borderBottomWidth: 0, paddingVertical: 20},
          ]}>
          <View
            style={[
              styles.iconContainer,
              {backgroundColor: COLORS.light.white},
            ]}>
            <Icon name="person" size={44} color={COLORS.light.gray} />
          </View>

          <View>
            <Text style={styles.mediumText}>Vadim Savin</Text>

            <Text style={[styles.smallText, {color: COLORS.light.textSoft}]}>
              5.00 <Icon name="star" size={10} color={COLORS.light.textSoft} />
            </Text>
          </View>
        </View>

        <Pressable
          style={{
            paddingVertical: 10,
            borderBottomWidth: 1,
            borderTopWidth: 1,
            borderColor: COLORS.light.textSoft,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View style={[styles.row, {padding: 0, borderBottomWidth: 0}]}>
            <Text
              style={[
                styles.smallText,
                {color: COLORS.light.white, fontSize: SIZES.medium},
              ]}>
              Message
            </Text>

            <Icon name="circle" size={8} color={COLORS.light.link} />
          </View>

          <Icon name="arrow-forward-ios" size={14} color={COLORS.light.white} />
        </Pressable>

        <Pressable style={{marginVertical: 12}}>
          <Text
            style={[
              styles.smallText,
              {color: COLORS.light.textSoft, fontSize: SIZES.medium},
            ]}>
            Do more with your account
          </Text>
        </Pressable>

        <Pressable>
          <Text style={[styles.smallText, {fontSize: SIZES.medium}]}>
            Make money driving
          </Text>
        </Pressable>
      </View>

      <DrawerItemList {...props} />

      <Pressable
        onPress={() => {
          signOut();
          dispatch(setUserState(null));
        }}
        style={{
          padding: 15,
          marginTop: itemHeight * 0.1,
          backgroundColor: COLORS.light.primary,
        }}>
        <Text
          style={[
            styles.smallText,
            {
              fontSize: SIZES.large,
              // color: COLORS.light.primary,
              fontWeight: 'bold',
              textAlign: 'center',
            },
          ]}>
          Logout
        </Text>
      </Pressable>

      <AccountDeletion />
    </DrawerContentScrollView>
  );
};

export default CustomDrawer;
