import {View, Text, Pressable} from 'react-native';
import React from 'react';
import {styles} from '../../constants/utils/styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {COLORS} from '../../constants';

interface ScreenProps {
  newOrder: {
    id: String,
    type: String,
    originLatitude: number,
    originLongitude: number,
    destinationLatitude: number,
    destinationLongitude: number,
    price: String,
    distance: String,
    duration: String,

    user: {
      rating: number,
    },
  };

  onAccept: () => void;
}
const NewOrderPopup: React.FC<ScreenProps> = ({onAccept, newOrder}) => {
  return (
    <Pressable onPress={onAccept} style={styles.orderPopup}>
      <View style={[styles.row, {padding: 0, borderBottomWidth: 0}]}>
        <Text style={styles.smallText}>{newOrder.type}</Text>

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
          <MaterialIcons name="star" color={COLORS.light.white} /> {newOrder?.user?.rating}
        </Text>
      </View>

      <View style={{alignItems: 'center', gap: 5}}>
        <Text style={[styles.mediumText, {fontWeight: 'normal'}]}>{newOrder.duration} min</Text>
        <Text style={[styles.smallText, {color: COLORS.light.lightGrey}]}>
          {newOrder.distance}
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
  );
};

export default NewOrderPopup;
