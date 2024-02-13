import {Dimensions, useWindowDimensions} from 'react-native';

const ScreenSizes = () => {
  const {height, width} = useWindowDimensions();
  const itemHeight = Dimensions.get('window').height;
  const itemWidth = Dimensions.get('window').width;

  return {height, width, itemHeight, itemWidth};
};

export default ScreenSizes;
