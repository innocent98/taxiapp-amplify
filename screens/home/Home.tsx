import {View, Text, SafeAreaView} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import ScreenSizes from '../../constants/utils/ScreenSizes';
import {styles} from '../../constants/utils/styles';
import HomeMap from '../../components/home/HomeMap';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import NewOrderPopup from '../../components/home/NewOrderPopup';
import {generateClient} from 'aws-amplify/api';
import {getCar, getOrder, listOrders} from '../../src/graphql/queries';
import {updateCar, updateOrder} from '../../src/graphql/mutations';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackParamList} from '../../navigations/navigations';
import {useNavigation} from '@react-navigation/native';
import useUser from '../../constants/hooks/useUser';
import HomeComponents from '../../components/home/HomeComponents';
import {
  ARRIVAL,
  COMPLETED,
  DROPPING_OFF_CLIENT,
  En_route,
  PICKING_UP_CLIENT,
} from '../../constants/orderStatus';

const client = generateClient();

type NavigationProp = StackNavigationProp<StackParamList>;

interface Car {
  data: {
    getCar: any;
    updateCar: any;
    listOrders: {items: any};
    updateOrder: any;
    getOrder: any;
  };
}

const Home = () => {
  const {itemHeight} = ScreenSizes();

  const {user} = useUser();

  const navigation = useNavigation<NavigationProp>();

  const [order, setOrder] = useState<null | any>(null);
  const [car, setCar] = useState<null | any>(null);
  const [duration, setDuration] = useState<null | number>(null);
  const [distance, setDistance] = useState<null | number>(null);
  const [newOrders, setNewOrders] = useState<null | any>([]);
  const [statusText, setStatusText] = useState('');

  // check if driver has a car registered, otherwise, register one
  const fetchCar = async () => {
    try {
      const carData = (await client.graphql({
        query: getCar,
        variables: {id: user},
      })) as Car;

      if (carData?.data?.getCar) {
        setCar(carData.data.getCar);
      } else {
        navigation.navigate('RegisterCar');
      }
    } catch (error) {}
  };

  useEffect(() => {
    fetchCar();
  }, []);

  // change visibility status
  const handleGoPress = async () => {
    try {
      const res = (await client.graphql({
        query: updateCar,
        variables: {
          input: {id: user, isActive: car?.isActive ? false : true},
        },
      })) as Car;

      setCar(res.data.updateCar);
    } catch (error) {}
  };

  // fetch orders on initial render
  const fetchOrders = async () => {
    try {
      const orderData = (await client.graphql({
        query: listOrders,
        variables: {filter: {status: {eq: 'NEW'}}},
      })) as Car;

      setNewOrders(orderData.data.listOrders.items);
    } catch (error) {}
  };

  useEffect(() => {
    if (car?.isActive) {
      fetchOrders();
    }
  }, [car?.isActive]);

  // decline order
  const onDecline = (id: any) => {
    // setNewOrders(newOrders.slice(1));
    setNewOrders(newOrders.filter((item: any) => item?.id !== id));
  };

  // accept order
  const onAccept = async (id: any) => {
    const input = {
      id: id,
      status: PICKING_UP_CLIENT,
      carId: car?.id,
      driverId: user,
    };

    try {
      const orderData = (await client.graphql({
        query: updateOrder,
        variables: {input},
      })) as Car;

      setOrder(orderData.data.updateOrder);
    } catch (error) {}

    setNewOrders(newOrders.slice(1));
  };

  // update car if the order has been accepted
  const onOrderAcceptCarUpdate = async (input: object) => {
    if (order?.status === PICKING_UP_CLIENT) {
      try {
        const orderData = (await client.graphql({
          query: updateOrder,
          variables: {input: {id: order?.id, status: PICKING_UP_CLIENT}},
        })) as Car;

        setOrder(orderData.data.updateOrder);

        const carData = (await client.graphql({
          query: updateCar,
          variables: {input},
        })) as Car;

        setCar(carData.data.updateCar);
      } catch (error) {}
    }
  };

  useEffect(() => {
    if (order?.status === PICKING_UP_CLIENT) {
      onOrderAcceptCarUpdate({
        id: car?.id,
        arrivalDuration: duration,
        arrivalDistance: distance,
        status: En_route,
        orderId: order?.id,
      });
    }
  }, [order?.status]);

  // console.log(car)

  // check if car is currently en_route and fetch car order using the orderId
  const fetchOrder = async () => {
    try {
      const orderData = (await client.graphql({
        query: getOrder,
        variables: {id: car?.orderId},
      })) as Car;

      setOrder(orderData.data.getOrder);

      // console.log(orderData.data.getOrder)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (car?.status === En_route) {
      fetchOrder();
    }
  }, [car?.status]);

  // update order status sequentially in respect to current status
  const updateOrderStatus = async () => {
    try {
      if (order?.status === PICKING_UP_CLIENT) {
        const orderData = (await client.graphql({
          query: updateOrder,
          variables: {input: {id: order?.id, status: DROPPING_OFF_CLIENT}},
        })) as Car;

        setOrder(orderData.data.updateOrder);
      }

      if (order?.status === DROPPING_OFF_CLIENT) {
        const orderData = (await client.graphql({
          query: updateOrder,
          variables: {input: {id: order?.id, status: ARRIVAL}},
        })) as Car;

        setOrder(orderData.data.updateOrder);
      }

      if (order?.status === ARRIVAL) {
        (await client.graphql({
          query: updateOrder,
          variables: {input: {id: order?.id, status: COMPLETED}},
        })) as Car;

        const carData = (await client.graphql({
          query: updateCar,
          variables: {
            input: {
              id: car?.id,
              status: null,
              orderId: null,
            },
          },
        })) as Car;

        setCar(carData.data.updateCar);
        setOrder(null);
        setDuration(null);
        setDistance(null);
      }

      setStatusText('');
    } catch (error) {
      console.log(error);
    }
  };

  // update status text with respect to distance at different stage of journey
  useEffect(() => {
    if (order?.status === PICKING_UP_CLIENT && distance && distance < 0.2) {
      setStatusText(PICKING_UP_CLIENT);
    }

    if (order?.status === DROPPING_OFF_CLIENT && distance && distance < 0.2) {
      setStatusText(DROPPING_OFF_CLIENT);
    }

    if (order?.status === ARRIVAL) {
      setStatusText(ARRIVAL);
    }

    if (order?.status === COMPLETED) {
      setStatusText('');
    }
  }, [distance, order]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View
        style={{
          height: itemHeight * 0.91,
          opacity:
            car?.status !== En_route && newOrders.length > 0 && !order
              ? 0.3
              : 1,
        }}>
        <HomeMap
          order={order}
          setDuration={setDuration}
          setDistance={setDistance}
          distance={distance}
          duration={duration}
          onOrderAcceptCarUpdate={onOrderAcceptCarUpdate}
          car={car}
        />

        <HomeComponents
          order={order}
          car={car}
          distance={distance}
          duration={duration}
          handleGoPress={handleGoPress}
          statusText={statusText}
          updateOrderStatus={updateOrderStatus}
        />
      </View>

      {car?.status !== En_route &&
        newOrders.length > 0 &&
        !order &&
        car?.isActive && (
          <>
            {newOrders?.map((item: any, index: number) => (
              <Text
                style={styles.declineBtn}
                onPress={() => onDecline(item?.id)}
                key={index}>
                <MaterialCommunityIcons name="close" /> Decline
              </Text>
            ))}

            {newOrders?.map((item: any, index: number) => (
              <NewOrderPopup onAccept={onAccept} newOrder={item} key={index} />
            ))}
          </>
        )}
    </SafeAreaView>
  );
};

export default Home;
