import {View, Text, Dimensions, TouchableHighlight, Image} from 'react-native';
import React, {useRef, useState} from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import {styles} from '../styles';
import {COLORS, SIZES} from '../../theme';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {TextInput} from 'react-native-paper';

const WithdrawTransaction = ({refRBSheetForm, refRBSheet}) => {
  return (
    <View style={[styles.container, {paddingTop: 60}]}>
      <Text style={[styles.mediumTxt, {fontSize: SIZES.xxl}]}>
        Wallet withdrawal
      </Text>

      <Text style={[styles.smallTxt, {marginTop: 20}]}>
        Enter an amount and select a location to withdraw your from
      </Text>

      <View style={[styles.inputWrapper, {flexDirection: 'column'}]}>
        <View style={styles.passwordCon}>
          <TextInput
            style={[
              styles.input,
              {
                marginBottom: 10,
                padding: 0,
                borderTopLeftRadius: SIZES.small,
                borderTopRightRadius: SIZES.small,
                paddingHorizontal: 30,
              },
            ]}
            label="Amount to fund"
            placeholder="Enter amount to fund"
            placeholderTextColor={COLORS.light.primary}
            inputMode="numeric"
            defaultValue="1"
            mode="flat"
            contentStyle={{color: COLORS.light.primary}}
            activeUnderlineColor={COLORS.light.primary}
            underlineColor="transaparent"
            outlineColor="transaparent"
          />

          <Text
            style={[
              styles.smallTxt,
              {
                position: 'absolute',
                left: 18,
                top: 27,
                color: COLORS.light.primary,
              },
            ]}>
            $
          </Text>

          <Image
            source={require('../../../assets/us.png')}
            style={[styles.passwordIcon, {height: 40, width: 40, right: 50}]}
          />

          <Icon
            name="expand-more"
            size={32}
            color={COLORS.light.primary}
            style={styles.passwordIcon}
          />
        </View>

        <Text
          style={[
            styles.smallTxt,
            {textAlign: 'left', marginBottom: SIZES.base},
          ]}>
          * Amount to fund: Zero dollars
        </Text>

        <View style={styles.passwordCon}>
          <TextInput
            style={[
              styles.input,
              {
                marginBottom: 10,
                padding: 0,
                borderTopLeftRadius: SIZES.small,
                borderTopRightRadius: SIZES.small,
                paddingHorizontal: 30,
              },
            ]}
            label="Source of fund"
            placeholder="Select source of fund"
            placeholderTextColor={COLORS.light.primary}
            inputMode="text"
            mode="flat"
            contentStyle={{color: COLORS.light.primary}}
            activeUnderlineColor={COLORS.light.primary}
            underlineColor="transaparent"
            outlineColor="transaparent"
          />

          <Icon
            name="expand-more"
            size={32}
            color={COLORS.light.primary}
            style={styles.passwordIcon}
          />
        </View>

        <View style={styles.passwordCon}>
          <TextInput
            style={[
              styles.input,
              {
                marginBottom: 10,
                padding: 0,
                borderTopLeftRadius: SIZES.small,
                borderTopRightRadius: SIZES.small,
                paddingHorizontal: 30,
              },
            ]}
            label=" Account to fund"
            placeholder="Select account to fund"
            placeholderTextColor={COLORS.light.primary}
            inputMode="text"
            mode="flat"
            contentStyle={{color: COLORS.light.primary}}
            activeUnderlineColor={COLORS.light.primary}
            underlineColor="transaparent"
            outlineColor="transaparent"
          />

          <Icon
            name="expand-more"
            size={32}
            color={COLORS.light.primary}
            style={styles.passwordIcon}
          />
        </View>
      </View>

      <Text style={styles.smallTxt}>
        You’re about to fund your selected dollar wallet with $X, click below to
        continue Fund
      </Text>

      <TouchableHighlight
        style={styles.button}
        onPress={() => {
          refRBSheetForm?.current?.close();
          refRBSheet?.current?.open();
        }}>
        <Text style={styles.buttonTxt}>Withdraw</Text>
      </TouchableHighlight>
    </View>
  );
};

const Withdraw = ({refRBSheetForm, refRBSheet}) => {
  const itemHeight = Dimensions.get('window').height;

  return (
    <View>
      <RBSheet
        ref={refRBSheetForm}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={itemHeight * 0.76}
        customStyles={{
          draggableIcon: {
            backgroundColor: 'lightgray',
          },
        }}>
        <WithdrawTransaction
          refRBSheetForm={refRBSheetForm}
          refRBSheet={refRBSheet}
        />
      </RBSheet>
    </View>
  );
};

export default Withdraw;
