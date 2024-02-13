import {View, Text, Pressable} from 'react-native';
import React from 'react';
import UberType from '../../components/uberType/UberType';
import {uberType} from '../../assets/UberAssets/data/types';
import {styles} from '../../constants/utils/styles';

const UberTypes = () => {
  const confirm = () => {};

  return (
    <View>
      {uberType.map((item, index) => (
        <UberType key={index} item={item} />
      ))}

      <Pressable onPress={confirm} style={styles.button}>
        <Text style={styles.buttonText}>Confirm Uber</Text>
      </Pressable>
    </View>
  );
};

export default UberTypes;
