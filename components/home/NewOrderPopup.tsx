import {View, Text, Pressable} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from '../../constants/utils/styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {COLORS} from '../../constants';
import {getUser} from '../../src/graphql/queries';
import {generateClient} from 'aws-amplify/api';
import NewOrderMap from './NewOrderMap';

const client = generateClient();

interface ScreenProps {
  newOrder: {
    id: String;
    type: String;
    originLatitude: number;
    originLongitude: number;
    destinationLatitude: number;
    destinationLongitude: number;
    price: String;
    distance: String;
    duration: String;
    userId: any;
    amount: number;

    user: {
      rating: number;
    };
  };

  onAccept: (value: any) => void;
}

interface User {
  data: {getUser: any};
}

const NewOrderPopup: React.FC<ScreenProps> = ({onAccept, newOrder}) => {
  const [user, setUser] = useState<null | any>(null);
  const [duration, setDuration] = useState<null | any>(null);
  const [distance, setDistance] = useState<null | any>(null);
  const [address, setAddress] = useState<null | any>(null);

  const getOrderUser = async () => {
    try {
      const userData = (await client.graphql({
        query: getUser,
        variables: {id: newOrder?.userId},
      })) as User;

      setUser(userData.data.getUser);
    } catch (error) {}
  };

  useEffect(() => {
    getOrderUser();
  }, [newOrder]);

  return (
    <>
      <Pressable onPress={()=>onAccept(newOrder?.id)} style={styles.orderPopup}>
        <View style={[styles.row, {padding: 0, borderBottomWidth: 0}]}>
          <Text style={styles.smallText}>{user?.firstName}</Text>

          <View
            style={[
              styles.iconContainer,
              {
                backgroundColor: COLORS.light.link,
                borderWidth: 2,
                borderColor: COLORS.light.white,
              },
            ]}>
            <MaterialIcons name="person" size={30} color={COLORS.light.white} />
          </View>

          <Text style={[styles.smallText, {color: COLORS.light.lightGrey}]}>
            <MaterialIcons name="star" color={COLORS.light.white} /> 4.8
          </Text>
        </View>

        <View style={{alignItems: 'center', gap: 5}}>
          <Text
            style={[styles.smallText, {color: COLORS.light.lightGrey}]}
            ellipsizeMode="tail"
            numberOfLines={1}>
            {address}
          </Text>

          <Text style={[styles.smallText, {fontWeight: 'normal'}]}>
            {distance?.toFixed(2)}km . {duration?.toFixed(2)}mins away from you
          </Text>

          <Text style={[styles.smallText, {color: COLORS.light.lightGrey}]}>
            ${newOrder?.amount.toFixed(2)}
          </Text>
        </View>

        <Text
          style={[
            styles.mediumText,
            {
              fontWeight: 'normal',
              borderTopWidth: 1,
              borderTopColor: COLORS.light.textSoft,
              width: '100%',
              textAlign: 'center',
              padding: 10,
            },
          ]}>
          <MaterialIcons name="star" color={COLORS.light.white} /> Toward your
          destination
        </Text>
      </Pressable>

      {newOrder && (
        <View style={{zIndex: -999, position: 'absolute'}}>
          <NewOrderMap
            order={newOrder}
            setDistance={setDistance}
            setDuration={setDuration}
            setAddress={setAddress}
          />
        </View>
      )}
    </>
  );
};

export default NewOrderPopup;
