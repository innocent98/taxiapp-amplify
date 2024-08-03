import {View, SafeAreaView} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import ScreenSizes from '../../constants/utils/ScreenSizes';
import {styles} from '../../constants/utils/styles';
import OrderMap from '../../components/order/OrderMap';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {StackParamList} from '../../navigations/Navigation';
import {generateClient} from 'aws-amplify/api';
import {getCar, getOrder} from '../../src/graphql/queries';
import {onCarUpdated, onOrderUpdated} from './subscriptions';
import {updateOrder} from '../../src/graphql/mutations';
import {StackNavigationProp} from '@react-navigation/stack';
import OrderDetails from '../../components/order/OrderDetails';
import {
  ARRIVAL,
  CANCELLED,
  COMPLETED,
  DROPPING_OFF_CLIENT,
  NEW,
} from '../../constants/orderStatus';

const client = generateClient();

type NavigationProp = StackNavigationProp<StackParamList>;

interface Route {
  route: RouteProp<StackParamList, 'Order'>;
}

interface Order {
  data: {getOrder: any; getCar: any};
}
const Order: React.FC<Route> = ({route}) => {
  const {id} = route?.params;

  // console.log(id);

  const {itemHeight, itemWidth} = ScreenSizes();

  const navigation = useNavigation<NavigationProp>();

  const [car, setCar] = useState<null | any>(null);
  const [order, setOrder] = useState<null | any>(null);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState<null | number>(null);
  const [distance, setDistance] = useState<null | number>(null);

  useEffect(() => {
    if (order?.status === NEW) {
      const intervalId = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [order]);

  // console.log(order, car)

  const formatTime = (seconds: number) => {
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${String(minutes).padStart(2, '0')}:${String(
      remainingSeconds,
    ).padStart(2, '0')}`;
  };

  // fetch order on intial render
  const fetchOrder = async () => {
    try {
      const orderData = (await client.graphql({
        query: getOrder,
        variables: {id},
      })) as Order;

      setOrder(orderData.data.getOrder);
    } catch (error) {}
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  // subscribe to real-time order update
  useEffect(() => {
    const subscription = client
      .graphql({
        query: onOrderUpdated,
        variables: {id: id},
      })
      .subscribe({
        next: (data: any) => {
          setOrder(data?.data?.onOrderUpdated);
        },
        error: (error: any) => console.log(error),
      });

    return () => subscription.unsubscribe();
  }, []);

  // fetch car on intial render when order changes
  const fetchCar = async () => {
    try {
      const carData = (await client.graphql({
        query: getCar,
        variables: {id: order?.carId},
      })) as Order;

      setCar(carData.data.getCar);
    } catch (error) {}
  };

  useEffect(() => {
    if (!order?.carId || order?.carId === 1) {
      return;
    } else {
      fetchCar();
    }
  }, [order]);

  // subscribe to real-time car update
  useEffect(() => {
    const subscription = client
      .graphql({
        query: onCarUpdated,
        variables: {id: order?.carId},
      })
      .subscribe({
        next: (data: any) => {
          setCar(data?.data?.onCarUpdated);
        },
        error: (error: any) => console.log(error),
      });

    return () => subscription.unsubscribe();
  }, []);

  // console.log(order);

  const onCancelOrder = async () => {
    if (order?.status === NEW) {
      await client.graphql({
        query: updateOrder,
        variables: {input: {id: order?.id, status: CANCELLED}},
      });

      navigation.navigate('DestinationSearch');
    }

    if (order?.status === COMPLETED) {
      // await client.graphql({
      //   query: updateOrder,
      //   variables: {input: {id: order?.id, status: COMPLETED}},
      // });

      navigation.navigate('Home');
    }
  };

  // TODO: if order.status === COMPLETED, navigate back to home
  // show a button to go back to home

  return (
    <SafeAreaView style={[styles.safeArea, {width: itemWidth}]}>
      <View
        style={{
          height:
            order?.status === ARRIVAL ||
            order?.status === DROPPING_OFF_CLIENT ||
            order?.status === COMPLETED
              ? itemHeight * 0.66
              : itemHeight * 0.72,
        }}>
        <OrderMap
          car={car}
          order={order}
          setDuration={setDuration}
          setDistance={setDistance}
        />
      </View>

      <OrderDetails
        order={order}
        car={car}
        time={time}
        formatTime={formatTime}
        onCancelOrder={onCancelOrder}
        duration={duration}
        distance={distance}
      />
    </SafeAreaView>
  );
};

export default Order;
