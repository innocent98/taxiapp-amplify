import {View, Text, Pressable} from 'react-native';
import React from 'react';
import {styles} from '../../constants/utils/styles';
import {COLORS} from '../../constants';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ScreenSizes from '../../constants/utils/ScreenSizes';
import {
  ARRIVAL,
  DROPPING_OFF_CLIENT,
  En_route,
  PICKING_UP_CLIENT,
} from '../../constants/orderStatus';

interface ScreenProps {
  order: any;
  car: any;
  duration: any;
  distance: any;
  statusText: String;
  handleGoPress: () => void;
  updateOrderStatus: () => void;
}
const HomeComponents: React.FC<ScreenProps> = ({
  order,
  car,
  duration,
  distance,
  statusText,
  handleGoPress,
  updateOrderStatus,
}) => {
  const {itemHeight} = ScreenSizes();

  // console.log(order)

  return (
    <>
      <Pressable style={[styles.roundButton, {top: 10, left: 10}]}>
        <Entypo name="menu" color={COLORS.light.primary} size={20} />
      </Pressable>

      <Pressable
        style={[
          styles.roundButton,
          {
            top: 10,
            backgroundColor: COLORS.light.primary,
            padding: 8,
            paddingHorizontal: 14,
            alignSelf: 'center',
          },
        ]}>
        <Text style={styles.mediumText}>$10.00</Text>
      </Pressable>

      <Pressable style={[styles.roundButton, {top: 10, right: 10}]}>
        <Feather name="search" color={COLORS.light.primary} size={20} />
      </Pressable>

      <Pressable style={[styles.roundButton, {bottom: 10, left: 10}]}>
        <MaterialCommunityIcons
          name="google-lens"
          color={COLORS.light.primary}
          size={20}
        />
      </Pressable>

      {car?.status !== En_route && (
        <Pressable
          onPress={handleGoPress}
          style={[
            styles.roundButton,
            {
              bottom: 10,
              backgroundColor: COLORS.light.link,
              height: 60,
              width: 60,
              borderRadius: 50,
              alignSelf: 'center',
              justifyContent: 'center',
            },
          ]}>
          <Text style={[styles.mediumText, {textAlign: 'center'}]}>
            {car?.isActive ? 'END' : 'GO'}
          </Text>
        </Pressable>
      )}

      {statusText !== '' && (
        <Pressable
          onPress={updateOrderStatus}
          style={[
            styles.roundButton,
            {
              bottom: 10,
              backgroundColor: COLORS.light.link,
              height: 50,
              width: '80%',
              borderRadius: 10,
              alignSelf: 'center',
              justifyContent: 'center',
            },
          ]}>
          <Text style={[styles.mediumText, {textAlign: 'center'}]}>
            {statusText === PICKING_UP_CLIENT
              ? `Pick up ${order?.user?.firstName}`
              : statusText === DROPPING_OFF_CLIENT
              ? `Arrive destination`
              : statusText === ARRIVAL
              ? `Accept payment of $${order?.amount?.toFixed(0)}`
              : `Complete ${order?.type} with ${order?.user?.firstName}`}
          </Text>
        </Pressable>
      )}

      <Pressable style={[styles.roundButton, {bottom: 10, right: 10}]}>
        <MaterialCommunityIcons
          name="message-plus"
          color={COLORS.light.primary}
          size={20}
        />
      </Pressable>

      <View style={[styles.bottomCon, {height: itemHeight * 0.09}]}>
        {order && (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={[styles.smallText, {color: COLORS.light.black}]}>
              {duration?.toFixed(0)} mins
            </Text>

            <View
              style={[
                styles.iconContainer,
                {
                  backgroundColor: COLORS.light.link,
                  borderWidth: 2,
                  borderColor: COLORS.light.white,
                  padding: 3,
                },
              ]}>
              <MaterialIcons
                name="person"
                size={12}
                color={COLORS.light.white}
              />
            </View>

            <Text style={[styles.smallText, {color: COLORS.light.black}]}>
              {distance?.toFixed(2)} km
            </Text>
          </View>
        )}

        <View style={styles.bottomDet}>
          <MaterialCommunityIcons
            name="tune-variant"
            color={COLORS.light.primary}
            size={22}
          />

          <Text style={[styles.mediumText, {color: COLORS.light.textSoft}]}>
            {order?.status === DROPPING_OFF_CLIENT
              ? `Dropping off ${order?.user?.firstName}`
              : order?.status === PICKING_UP_CLIENT
              ? `Picking up ${order?.user?.firstName}`
              : car?.isActive
              ? "You're online"
              : "You're offline"}
          </Text>

          <Entypo name="menu" color={COLORS.light.primary} size={22} />
        </View>
      </View>
    </>
  );
};

export default HomeComponents;
