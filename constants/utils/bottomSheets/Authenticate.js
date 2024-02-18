import {
  View,
  Text,
  TextInput,
  Dimensions,
  TouchableHighlight,
} from 'react-native';
import React, {useRef, useState} from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import {styles} from '../styles';
import {COLORS, SIZES} from '../../theme';
import Icon from 'react-native-vector-icons/MaterialIcons';

const AuthenticateTransaction = ({
  refRBSheet,
  refRBSheetSuccess,
  refRBSheetAccount,
}) => {
  const [inputValues, setInputValues] = useState(['', '', '', '']);
  const textInputRefs = useRef([]);

  const handleInputChange = (index, text) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = text;
    setInputValues(newInputValues);

    // Move focus to the next input
    if (text.length === 1 && index < inputValues.length - 1) {
      textInputRefs.current[index + 1].focus();
    }

    // Submit if the last input is filled
    if (text.length === 1 && index === inputValues.length - 1) {
      submitForm();
    }
  };

  const submitForm = () => {
    // Perform your submission logic here
  };

  return (
    <View style={[styles.container, {paddingTop: 60}]}>
      <Text style={[styles.mediumTxt, {fontSize: SIZES.xxl}]}>
        Authenticate transaction
      </Text>

      <Text style={[styles.smallTxt, {marginTop: 20}]}>
        Enter your transaction pin to complete this process :) Complete
      </Text>

      <View style={styles.inputWrapper}>
        {inputValues.map((value, index) => (
          <TextInput
            key={index}
            ref={ref => (textInputRefs.current[index] = ref)}
            style={[styles.input, {width: '22%', textAlign: 'center'}]}
            inputMode="numeric"
            maxLength={1}
            value={value}
            onChangeText={text => handleInputChange(index, text)}
          />
        ))}
      </View>

      <TouchableHighlight
        style={styles.button}
        onPress={() => {
          refRBSheet?.current?.close();
          refRBSheetSuccess?.current?.open();
          refRBSheetAccount?.current?.open();
        }}>
        <Text style={styles.buttonTxt}>Complete</Text>
      </TouchableHighlight>
    </View>
  );
};

const Authenticate = ({refRBSheet, refRBSheetSuccess, refRBSheetAccount}) => {
  const itemHeight = Dimensions.get('window').height;

  return (
    <View>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={itemHeight * 0.56}
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
            onPress={() => refRBSheet.current.close()}
          />
        </View>

        <AuthenticateTransaction
          refRBSheet={refRBSheet}
          refRBSheetSuccess={refRBSheetSuccess}
          refRBSheetAccount={refRBSheetAccount}
        />
      </RBSheet>
    </View>
  );
};

export default Authenticate;
