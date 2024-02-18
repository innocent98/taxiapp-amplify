import {View, Text, Image} from 'react-native';
import React from 'react';
import {styles} from './styles';

const HorizontalLine = () => {
  return (
    <View style={styles.horizontalLine}>
      <Image
        source={require('../../assets/dash.png')}
        style={{
          flex: 1,
          resizeMode: 'repeat',
          height: '100%',
          width: '100%',
        }}
      />
    </View>
  );
};

export default HorizontalLine;
