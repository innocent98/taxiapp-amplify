import {View, Text, Dimensions} from 'react-native';
import React from 'react';
import {COLORS, SIZES} from '../../theme';
import {styles} from '../styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import RBSheet from 'react-native-raw-bottom-sheet';

const SuccessTransaction = ({text}) => {
  return (
    <View style={[styles.container, {paddingTop: 60, alignItems: 'center'}]}>
      <View
        style={{
          height: 70,
          width: 70,
          borderWidth: 3,
          borderColor: COLORS.light.success,
          borderRadius: 50,
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 10,
        }}>
        <Icon name="check" size={45} color={COLORS.light.success} />
      </View>

      <Text
        style={[
          styles.mediumTxt,
          {fontSize: SIZES.xxl, color: COLORS.light.success},
        ]}>
        {text}
      </Text>
    </View>
  );
};

const Success = ({refRBSheetSuccess, text}) => {
  const itemHeight = Dimensions.get('window').height;

  return (
    <View>
      <RBSheet
        ref={refRBSheetSuccess}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={itemHeight * 0.46}
        customStyles={{
          draggableIcon: {
            backgroundColor: 'lightgray',
          },
        }}>
        <View style={[styles.exchangeIcon, {top: 10, right: 10}]}>
          <Icon
            name="close"
            size={25}
            color={COLORS.light.primary}
            onPress={() => refRBSheetSuccess.current.close()}
          />
        </View>

        <SuccessTransaction text={text} />
      </RBSheet>
    </View>
  );
};

export default Success;
