import {Dimensions, StyleSheet} from 'react-native';
import ScreenSizes from './ScreenSizes';
import {COLORS, SIZES} from '../theme';

const itemWidth = Dimensions.get('window').width;
const itemHeight = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  safeArea: {flex: 1, backgroundColor: COLORS.light.background},

  homeMap: {
    height: itemHeight * 0.5,
    backgroundColor: COLORS.light.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },

  container: {
    backgroundColor: COLORS.light.link,
    padding: 12,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },

  mediumText: {
    color: COLORS.light.white,
    fontSize: SIZES.large,
    fontWeight: 'bold',
  },

  smallText: {
    color: COLORS.light.white,
    fontSize: SIZES.font,
    fontWeight: 'normal',
  },

  flex: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },

  timeCon: {
    backgroundColor: COLORS.light.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: itemWidth * 0.215,
    borderRadius: SIZES.font,
    padding: SIZES.nano,
    gap: 5,
  },

  timeText: {
    color: COLORS.light.black,
    fontSize: SIZES.font,
    fontWeight: 'normal',
  },

  row: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.light.lightGrey,
    padding: 15,
  },

  iconContainer: {
    backgroundColor: COLORS.light.gray,
    padding: 5,
    borderRadius: 100,
  },

  inputCon: {
    padding: 10,
    flex: 1,
  },

  input: {
    padding: 10,
    backgroundColor: COLORS.light.lightGrey,
    marginVertical: 4,
  },

  car: {width: itemWidth * 0.15, height: '100%'},

  button: {
    width: itemWidth * 0.93,
    backgroundColor: COLORS.light.black,
    padding: 10,
    margin: 15,
    alignItems: 'center',
  },

  buttonText: {color: COLORS.light.white, fontWeight: 'bold'},

  circle: {
    width: 5,
    height: 5,
    backgroundColor: COLORS.light.black,
    position: 'absolute',
    top: 20,
    left: 15,
    borderRadius: 5
  },

  line: {
    width: 1,
    height: 65,
    backgroundColor: COLORS.light.black,
    position: 'absolute',
    top: 25,
    left: 17,
  },

  square: {
    width: 5,
    height: 5,
    backgroundColor: COLORS.light.black,
    position: 'absolute',
    top: 88,
    left: 15,
  },
});
