import {View, Text, Dimensions} from 'react-native';
import React from 'react';
import {styles} from '../styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import RBSheet from 'react-native-raw-bottom-sheet';
import {COLORS, SIZES} from '../../theme';

const AccountDetailsTransaction = () => {
  return (
    <View style={[styles.container, {paddingTop: 60}]}>
      <Text style={[styles.mediumTxt, {fontSize: SIZES.xxl}]}>Next Steps</Text>

      <Text style={[styles.smallTxt, {marginTop: 20}]}>
        Please proceed to the bank to deposit your cash ($1) using the account
        number provider below
      </Text>

      <View style={styles.accountNoCon}>
        <Text style={styles.smallTxt}>Account Number</Text>

        <Text style={[styles.bigTxt, {fontSize: SIZES.xxxl}]}>20940378594</Text>
      </View>

      <Text style={[styles.bigTxt, {fontSize: SIZES.xxxl}]}>Providus Bank</Text>
    </View>
  );
};

const AccountDetails = ({refRBSheetAccount}) => {
  const itemHeight = Dimensions.get('window').height;

  return (
    <View>
      <RBSheet
        ref={refRBSheetAccount}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={itemHeight * 0.66}
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
            onPress={() => refRBSheetAccount.current.close()}
          />
        </View>

        <AccountDetailsTransaction />
      </RBSheet>
    </View>
  );
};

export default AccountDetails;
