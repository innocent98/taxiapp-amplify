import {View, Text, Image, Pressable} from 'react-native';
import React from 'react';
import {styles} from '../../constants/utils/styles';
import {COLORS, SIZES} from '../../constants';
import ScreenSizes from '../../constants/utils/ScreenSizes';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface uberType {
  item: {
    id: String;
    type: String;
    price: number;
    duration: number;
  };
  isSelected: boolean;
  onPress: () => void;
}

const UberType: React.FC<uberType> = ({item, isSelected, onPress}) => {
  const {itemHeight} = ScreenSizes();

  const getImageSource = (type: String) => {
    switch (type) {
      case 'UberX':
        return require('../../assets/UberAssets/images/UberX.jpeg');
      case 'Comfort':
        return require('../../assets/UberAssets/images/Comfort.jpeg');
      case 'UberXL':
        return require('../../assets/UberAssets/images/UberXL.jpeg');
      default:
        return require('../../assets/UberAssets/images/UberX.jpeg');
    }
  };

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.flex,
        {
          backgroundColor: isSelected? '#efefef' : COLORS.light.background,
          height: itemHeight * 0.085,
          paddingHorizontal: 15,
        },
      ]}>
      <View
        style={[
          styles.row,
          {padding: 0, borderBottomWidth: 0, height: '100%'},
        ]}>
        <Image
          source={getImageSource(item.type)}
          style={styles.car}
          resizeMode="contain"
        />

        <View>
          <Text
            style={[
              styles.mediumText,
              {color: COLORS.light.black, fontSize: SIZES.font},
            ]}>
            {item.type}
            <Ionicons name="person" size={10} color={COLORS.light.black} />3
          </Text>

          <Text
            style={[
              styles.smallText,
              {color: COLORS.light.black, fontSize: SIZES.small},
            ]}>
            8:03PM drop off
          </Text>
        </View>
      </View>

      <View style={{alignItems: 'center'}}>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
          <Ionicons name="pricetag" size={12} color={COLORS.light.success} />

          <Text
            style={[
              styles.mediumText,
              {color: COLORS.light.black, fontSize: SIZES.font},
            ]}>
            est. ${item.price}
          </Text>
        </View>

        <Text
          style={[
            styles.smallText,
            {color: COLORS.light.black, fontSize: SIZES.small},
          ]}>
          {item.duration}
        </Text>
      </View>
    </Pressable>
  );
};

export default UberType;
