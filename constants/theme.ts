import {PixelRatio, Dimensions} from 'react-native';

const fontScale = PixelRatio.getFontScale();

const getFontSize = (size: number) => size / fontScale;

const itemWidth = Dimensions.get('window').width;
const itemHeight = Dimensions.get('window').height;


export const COLORS = {
  light: {
    primary: '#17193D',
    secondary: '#F2F2F2',
    background: '#FDFEFE',
    backgroundSoft: '#f6f3f3',
    textSoft: '#555',
    white: '#fff',
    gray: '#848C9D',
    link: '#0B72D2',
    black: '#000000',
    success: '#25A348',
    red: '#DF3737',
    yellow: '#FF9F1C',
    lightGrey: '#eee'
  },
  dark: {
    primary: '#2D3281',
    secondary: '#9BA0E8',
    background: '#222',
    backgroundSoft: '#333',
    textSoft: '#F4F3F5',
    black: '#000000',
  },
};

export const SIZES = {
  nano: getFontSize(4),
  base: getFontSize(8),
  small: getFontSize(itemHeight * 0.015),
  font: getFontSize(itemHeight * 0.018),
  medium: getFontSize(itemHeight * 0.02),
  large: getFontSize(itemHeight * 0.022),
  extraLarge: getFontSize(itemHeight * 0.026),
  xxl: getFontSize(itemHeight * 0.028),
  xxxl: getFontSize(28),
  button: getFontSize(48),
};


export const SHADOWS = {
  light: {
    shadowColor: COLORS.light.gray,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  medium: {
    shadowColor: COLORS.light.gray,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  dark: {
    shadowColor: COLORS.light.gray,
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,

    elevation: 14,
  },
};
