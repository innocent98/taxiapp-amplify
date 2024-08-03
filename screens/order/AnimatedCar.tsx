import {View, Text, Animated, Image} from 'react-native';
import React, {useEffect} from 'react';
import { NEW } from '../../constants/orderStatus';

interface Time {
  time: number;
  order: {status: any};
}

const AnimatedCar: React.FC<Time> = ({time, order}) => {
  const carPosition = new Animated.Value(0);

  useEffect(() => {
    if (order?.status === NEW) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(carPosition, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: false, // Make sure to set useNativeDriver to false for position animations
          }),
          Animated.timing(carPosition, {
            toValue: 0,
            duration: 0, // Set duration to 0 for an immediate reset
            useNativeDriver: false,
          }),
        ]),
        {iterations: -1},
      ).start();
    }
  }, [time, order]);

  const animatedStyles = {
    transform: [
      {
        translateX: carPosition.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 600], // Adjust the distance the car moves horizontally
        }),
      },
    ],
  };

  return (
    <Animated.View style={[animatedStyles]}>
      <Image
        source={require('../../assets/UberAssets/images/car.png')}
        style={{width: 100, height: 50}}
      />
    </Animated.View>
  );
};

export default AnimatedCar;
