import {View, Text, Pressable} from 'react-native';
import React from 'react';
import {styles} from '../../constants/utils/styles';
import ScreenSizes from '../../constants/utils/ScreenSizes';
import {COLORS} from '../../constants';
import AnimatedCar from '../../screens/order/AnimatedCar';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  ARRIVAL,
  COMPLETED,
  DROPPING_OFF_CLIENT,
  NEW,
  PICKING_UP_CLIENT,
} from '../../constants/orderStatus';

interface ScreenProps {
  order: any;
  car: any;
  time: any;
  formatTime: any;
  onCancelOrder: () => void;
  duration: any;
  distance: any;
}

const OrderDetails: React.FC<ScreenProps> = ({
  order,
  car,
  time,
  formatTime,
  onCancelOrder,
  duration,
  distance,
}) => {
  const {itemHeight} = ScreenSizes();

  return (
    <View
      style={{
        height:
          order?.status === ARRIVAL ||
          order?.status === DROPPING_OFF_CLIENT ||
          order?.status === COMPLETED
            ? itemHeight * 0.34
            : itemHeight * 0.28,
        padding: 15,
        // justifyContent:'center'
      }}>
      {/* <Text style={{color: 'black'}}>Order status: {order?.status}</Text> */}

      <Text
        style={[
          styles.mediumText,
          {
            fontWeight: 'normal',
            color: COLORS.light.primary,
            marginBottom: 20,
          },
        ]}>
        {order?.status === NEW
          ? 'Searching for nearby driver to pick your order...'
          : order?.status === DROPPING_OFF_CLIENT
          ? 'Your journey has began, wishing you safe trip to your destination'
          : order?.status === ARRIVAL
          ? `Congratulations! You just arrived your destination. Kindly make your payment $${order?.amount} to complete the order.`
          : order?.status === PICKING_UP_CLIENT
          ? `${
              car?.type
            } picked your order, will arrive in ${car?.arrivalDuration?.toFixed(
              0,
            )} mins`
          : order?.status === COMPLETED
          ? 'Your order has been completed, thank you for riding with us.'
          : null}
      </Text>

      {order?.status === DROPPING_OFF_CLIENT && (
        <View style={{alignItems: 'center'}}>
          <Text
            style={[
              styles.mediumText,
              {
                fontWeight: 'normal',
                color: COLORS.light.primary,
                marginBottom: 20,
              },
            ]}>
            {distance?.toFixed(2)}km * {duration?.toFixed(0)} mins
          </Text>
          <Text
            style={[
              styles.smallText,
              {
                fontWeight: 'normal',
                color: COLORS.light.primary,
                marginBottom: 20,
              },
            ]}>
            To arrive your destination
          </Text>
        </View>
      )}

      {order?.status === NEW && (
        <>
          <AnimatedCar time={time} order={order} />

          <View
            style={{
              height: 1,
              width: '100%',
              backgroundColor: COLORS.light.gray,
              marginBottom: 20,
            }}></View>

          <Text
            style={[styles.smallText, {color: 'black', textAlign: 'center'}]}>
            {formatTime(time)}
          </Text>
        </>
      )}

      {order?.status === PICKING_UP_CLIENT && (
        <View style={{flexDirection: 'column', gap: 10, marginTop: -4}}>
          <Text
            style={[
              styles.mediumText,
              {textDecorationLine: 'underline', color: COLORS.light.primary},
            ]}>
            Driver's Information
          </Text>
          <Text style={[styles.smallText, {color: COLORS.light.primary}]}>
            Driver's Name:{' '}
            {`${order?.driver?.firstName} ${order?.driver?.lastName}`}
          </Text>
          <Text style={[styles.smallText, {color: COLORS.light.primary}]}>
            Driver's Phone: +120522975
          </Text>
          <Text style={[styles.smallText, {color: COLORS.light.primary}]}>
            Car Type: {car?.type}
          </Text>
        </View>
      )}

      {order?.status !== DROPPING_OFF_CLIENT && (
        <View
          style={[
            styles.row,
            {padding: 0, borderBottomWidth: 0, width: '100%', gap: 0},
          ]}>
          <Pressable
            onPress={onCancelOrder}
            style={[
              styles.button,
              {
                width:
                  order?.status === NEW || order?.status === PICKING_UP_CLIENT
                    ? '80%'
                    : '90%',
                backgroundColor: COLORS.light.primary,
              },
            ]}>
            <Text style={styles.buttonText}>
              {order?.status === NEW
                ? 'Cancel order'
                : order?.status === ARRIVAL
                ? `Proceed to make payment of $${order?.amount?.toFixed(2)}`
                : order?.status === COMPLETED
                ? 'Go back to home'
                : order?.status === PICKING_UP_CLIENT
                ? `${car?.arrivalDistance?.toFixed(2)}km away from you`
                : null}
            </Text>
          </Pressable>

          {/* TODO: remove container if order.status !== NEW or PICKING_UP_CLIENT */}
          {order?.status === NEW || order?.status === PICKING_UP_CLIENT ? (
            <View
              style={[
                styles.iconContainer,
                {backgroundColor: COLORS.light.primary},
              ]}>
              <MaterialCommunityIcons
                name="chat"
                color={COLORS.light.white}
                size={28}
              />
            </View>
          ) : null}
        </View>
      )}
    </View>
  );
};

export default OrderDetails;
