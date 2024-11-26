import {StyleSheet} from 'react-native';
import normalize from 'services/utils/normalize';
import colors from 'themes/colors';
import fonts from './fonts';

const defaultStyle = StyleSheet.create({
  absolute: {position: 'absolute', top: 0, left: 0, right: 0, bottom: 0},
  container: {
    paddingHorizontal: normalize(10),
  },
  flex: {
    flex: 1,
  },
  flexOH: {
    flex: 1,
    overflow: 'hidden',
  },
  fullWidth: {
    width: '100%',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  shadowSm: {
    shadowColor: 'grey',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 3,
  },
  shadowSs: {
    shadowColor: '#2210100D',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 3,
  },
  shadowLg: {
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 12,
  },
  toastError: {
    paddingVertical: 10,
    height: undefined,
    maxHeight: 200,
    minHeight: normalize(55),
    paddingHorizontal: normalize(20),
    borderRadius: normalize(20),
    borderLeftWidth: 0,
  },
  toastSuccess: {
    paddingVertical: 10,
    height: undefined,
    maxHeight: 200,
    minHeight: normalize(55),
    paddingHorizontal: normalize(20),
    borderRadius: normalize(20),
    borderLeftWidth: 0,
  },
  toastUpgrade: {
    paddingVertical: 10,
    height: undefined,
    //maxHeight: 200,
    minHeight: normalize(55),
    paddingHorizontal: normalize(10),
    borderRadius: normalize(20),
    borderLeftWidth: 0,
  },
  disabledOpacity: {opacity: 0.5},
  favorite: {
    position: 'absolute',
    top: normalize(10),
    right: normalize(10),
    zIndex: 2,
  },
  typeWriterCursorBig: {
    color: colors.primary,
  },
  typeWriterCursorSmall: {
    color: colors.primary,
  },
  robotoB12: {
    fontFamily: fonts.robotoBold,
    fontSize: normalize(12),
  },
  robotoB14: {
    fontFamily: fonts.robotoBold,
    fontSize: normalize(14),
  },
  roboto12: {
    fontFamily: fonts.roboto,
    fontSize: normalize(12),
  },
});

export default defaultStyle;
