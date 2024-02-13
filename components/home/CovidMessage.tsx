import {View, Text} from 'react-native';
import React from 'react';
import {LearnMoreLinks} from 'react-native/Libraries/NewAppScreen';
import {styles} from '../../constants/utils/styles';
import {COLORS, SIZES} from '../../constants';

const CovidMessage = () => {
  return (
    <View style={styles.container}>
      <Text style={[styles.mediumText, {marginBottom: SIZES.base}]}>Travel only if neccessary</Text>

      <Text
        style={[
          styles.smallText,
          {color: COLORS.dark.textSoft, marginBottom: SIZES.base},
        ]}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate
        voluptates esse id laborum unde exercitationem omnis dolorum quas non,
        inventore accusantium adipisci consectetur eligendi impedit modi tempore
        sit laboriosam corporis!
      </Text>

      <Text style={styles.smallText}>Learn more</Text>
    </View>
  );
};

export default CovidMessage;
