import {View, Text, Dimensions, TouchableHighlight, Image} from 'react-native';
import React, {useRef, useState} from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import {styles} from '../styles';
import {COLORS, SIZES} from '../../theme';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {TextInput} from 'react-native-paper';

const NewWalletTransaction = ({refRBSheetCreateForm, refRBSheetSuccess}) => {
  return (
    <View style={[styles.container, {paddingTop: 60}]}>
      <Text style={[styles.mediumTxt, {fontSize: SIZES.xxl}]}>
        Create new wallet
      </Text>

      <Text style={[styles.smallTxt, {marginTop: 20}]}>
        Create a new wallet for any of the currencies available on Sm:)epay
      </Text>

      <View style={[styles.inputWrapper, {flexDirection: 'column'}]}>
        <View style={styles.passwordCon}>
          <TextInput
            style={[
              styles.input,
              {
                marginBottom: 20,
                padding: 0,
                borderTopLeftRadius: SIZES.small,
                borderTopRightRadius: SIZES.small,
                paddingHorizontal: 30,
              },
            ]}
            label="Select currency 🇺🇸"
            placeholder="Select currency 🇺🇸"
            placeholderTextColor={COLORS.light.primary}
            inputMode="text"
            mode="flat"
            contentStyle={{color: COLORS.light.primary}}
            activeUnderlineColor={COLORS.light.primary}
            underlineColor="transaparent"
            outlineColor="transaparent"
          />

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
      </View>

      <TouchableHighlight
        style={styles.button}
        onPress={() => {
          refRBSheetCreateForm?.current?.close();
          refRBSheetSuccess?.current?.open();
        }}>
        <Text style={styles.buttonTxt}>Create wallet</Text>
      </TouchableHighlight>
    </View>
  );
};

const NewWallet = ({refRBSheetCreateForm, refRBSheetSuccess}) => {
  const itemHeight = Dimensions.get('window').height;

  return (
    <View>
      <RBSheet
        ref={refRBSheetCreateForm}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={itemHeight * 0.5}
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
            onPress={() => refRBSheetCreateForm.current.close()}
          />
        </View>

        <NewWalletTransaction
          refRBSheetCreateForm={refRBSheetCreateForm}
          refRBSheetSuccess={refRBSheetSuccess}
        />
      </RBSheet>
    </View>
  );
};

export default NewWallet;
