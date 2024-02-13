import {View, Text} from 'react-native';
import React from 'react';
import {styles} from '../../constants/utils/styles';
import Entypo from 'react-native-vector-icons/Entypo';
import {COLORS} from '../../constants';

interface Data {
  data: {
    description: String;
    vicinity?: String;
  };
}

const PlaceRow: React.FC<Data> = ({data}) => {
  return (
    <View style={[styles.row, {padding: 0, borderBottomWidth: 0}]}>
      <View
        style={[
          styles.iconContainer,
          {
            backgroundColor:
              data.description === 'Home'
                ? COLORS.light.link
                : COLORS.light.gray,
          },
        ]}>
        {data.description === 'Home' ? (
          <Entypo name="home" size={22} color={COLORS.light.white} />
        ) : (
          <Entypo name="location-pin" size={22} color={COLORS.light.white} />
        )}
      </View>

      <Text style={[styles.smallText, {color: COLORS.light.black}]}>
        {data.description ? data.description : data.vicinity}
      </Text>
    </View>
  );
};

export default PlaceRow;
