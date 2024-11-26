import {StyleSheet} from 'react-native';
import normalize from 'services/utils/normalize';
import colors from 'themes/colors';
import fonts from './fonts';

const textStyle = StyleSheet.create({
  //Heading Rosha
  rosha34: {
    fontFamily: fonts.rosha,
    fontSize: normalize(34),
  },
  rosha30: {
    fontFamily: fonts.rosha,
    fontSize: normalize(30),
  },
  rosha28: {
    fontFamily: fonts.rosha,
    fontSize: normalize(28),
    lineHeight: normalize(32),
  },
  rosha25: {
    fontFamily: fonts.rosha,
    fontSize: normalize(25),
  },
  rosha22: {
    fontFamily: fonts.rosha,
    fontSize: normalize(22),
  },

  //Heading Roboto Bold
  robotoB34: {
    fontFamily: fonts.robotoBold,
    fontSize: normalize(34),
  },
  robotB28: {
    fontFamily: fonts.robotoBold,
    fontSize: normalize(28),
    lineHeight: normalize(32),
  },
  robotB22: {
    fontFamily: fonts.robotoBold,
    fontSize: normalize(22),
  },
  robotB20: {
    fontFamily: fonts.robotoBold,
    fontSize: normalize(20),
  },
  robotB17: {
    fontFamily: fonts.robotoBold,
    fontSize: normalize(17),
    lineHeight: normalize(20),
  },
  robotB15: {
    fontFamily: fonts.robotoBold,
    fontSize: normalize(15),
  },
  robotB12: {
    fontFamily: fonts.robotoBold,
    fontSize: normalize(12),
  },

  // Roboto Medium
  robotM17: {
    fontFamily: fonts.robotoMedium,
    fontSize: normalize(17),
    lineHeight: normalize(20),
  },
  robotM15: {
    fontFamily: fonts.robotoMedium,
    fontSize: normalize(15),
  },
  robotM14: {
    fontFamily: fonts.robotoMedium,
    fontSize: normalize(14),
  },
  robotM12: {
    fontFamily: fonts.robotoMedium,
    fontSize: normalize(12),
  },

  // Roboto Light
  robot17l: {
    fontFamily: fonts.robotoLight,
    fontSize: normalize(17),
    lineHeight: normalize(20),
  },
  robot15l: {
    fontFamily: fonts.robotoLight,
    fontSize: normalize(15),
  },
  robot14l: {
    fontFamily: fonts.robotoLight,
    fontSize: normalize(14),
  },
  robot12l: {
    fontFamily: fonts.robotoLight,
    fontSize: normalize(12),
  },
  robot10l: {
    fontFamily: fonts.robotoLight,
    fontSize: normalize(10),
  },

  //Paragraphs
  robot17: {
    fontFamily: fonts.roboto,
    fontSize: normalize(17),
    lineHeight: normalize(20),
  },
  robot17d: {
    fontFamily: fonts.roboto,
    fontSize: normalize(17),
    lineHeight: normalize(20),
    color: colors.onPrimary,
  },
  robot15: {
    fontFamily: fonts.roboto,
    fontSize: normalize(15),
  },
  robot15d: {
    fontFamily: fonts.roboto,
    fontSize: normalize(15),
    color: colors.onPrimary,
  },
  robot13: {
    fontFamily: fonts.roboto,
    fontSize: normalize(13),
  },
  robot12: {
    fontFamily: fonts.roboto,
    fontSize: normalize(12),
  },
});

export default textStyle;
