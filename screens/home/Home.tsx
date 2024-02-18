import {View, Text, SafeAreaView, Pressable} from 'react-native';
import React, {useEffect, useState} from 'react';
import ScreenSizes from '../../constants/utils/ScreenSizes';
import {styles} from '../../constants/utils/styles';
import HomeMap from '../../components/home/HomeMap';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import {COLORS} from '../../constants';
import NewOrderPopup from '../../components/home/NewOrderPopup';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {generateClient} from 'aws-amplify/api';
import {getCurrentUser} from 'aws-amplify/auth';
import {getCar} from '../../src/graphql/queries';
import {updateCar} from '../../src/graphql/mutations';

const client = generateClient();

interface Car {
  data: {getCar: any; updateCar: any};
}

const Home = () => {
  const {itemHeight} = ScreenSizes();

  const [order, setOrder] = useState<null | any>(null);
  const [car, setCar] = useState<null | any>(null);
  const [duration, setDuration] = useState<null | number>(null);
  const [distance, setDistance] = useState<null | number>(null);
  const [newOrder, setNewOrder] = useState<null | any>({
    id: '1',
    type: 'UberX',
    originLatitude: 4.9911616,
    originLongitude: 7.9586544,
    destinationLatitude: 4.9441051,
    destinationLongitude: 7.9925957,
    price: '25.00',
    duration: '20',

    user: {
      rating: 4.8,
      name: 'Clara',
    },
  });

  const fetchCar = async () => {
    try {
      const {userId} = await getCurrentUser();

      const carData = (await client.graphql({
        query: getCar,
        variables: {id: userId},
      })) as Car;

      setCar(carData.data.getCar);
    } catch (error) {}
  };

  useEffect(() => {
    fetchCar();
  }, []);

  const handleGoPress = async () => {
    try {
      const {userId} = await getCurrentUser();

      const res = (await client.graphql({
        query: updateCar,
        variables: {
          input: {id: userId, isActive: car?.isActive ? false : true},
        },
      })) as Car;

      setCar(res.data.updateCar);
    } catch (error) {}
  };

  const onDecline = () => {
    setNewOrder(null);
  };

  const onAccept = () => {
    setOrder(newOrder);
    setNewOrder(null);
  };

  useEffect(() => {
    if (distance && distance < 0.3) {
      setOrder({...order, pickedUp: true});
    }
  }, [distance]);

  useEffect(() => {
    if (order && order.pickedUp && distance && distance < 0.2) {
      setOrder({...order, isFinished: true});
    }
  }, [distance]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={{height: itemHeight * 0.91, opacity: newOrder ? 0.3 : 1}}>
        <HomeMap
          order={order}
          setDuration={setDuration}
          setDistance={setDistance}
          distance={distance}
        />

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

        <Pressable style={[styles.roundButton, {bottom: 10, right: 10}]}>
          <MaterialCommunityIcons
            name="message-plus"
            color={COLORS.light.primary}
            size={20}
          />
        </Pressable>

        <View style={[styles.bottomCon, {height: itemHeight * 0.09}]}>
          {order && order.isFinished && (
            <Pressable
              style={{backgroundColor: COLORS.light.primary, padding: 10}}>
              <Text
                style={[
                  styles.mediumText,
                  {color: COLORS.light.white, textAlign: 'center'},
                ]}>
                Complete {order.type} with {order.user.name}
              </Text>
            </Pressable>
          )}

          {order && !order.isFinished && (
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
              {car?.isActive
                ? "You're online"
                : order && order.pickedUp
                ? `Dropping off ${order.user.name}`
                : order
                ? `Picking up ${order.user.name}`
                : "You're offline"}
            </Text>
            <Entypo name="menu" color={COLORS.light.primary} size={22} />
          </View>
        </View>
      </View>

      {newOrder && (
        <>
          <Text style={styles.declineBtn} onPress={onDecline}>
            <MaterialCommunityIcons name="close" /> Decline
          </Text>

          <NewOrderPopup onAccept={onAccept} newOrder={newOrder} />
        </>
      )}
    </SafeAreaView>
  );
};

export default Home;
