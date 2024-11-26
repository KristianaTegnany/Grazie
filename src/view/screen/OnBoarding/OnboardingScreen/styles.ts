import {StyleSheet} from "react-native";
import normalize from "services/utils/normalize";
import colors from "themes/colors";

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  videoRounded: {
    aspectRatio: 0.7,
    top: normalize(-6),
    left: normalize(6),
    borderTopLeftRadius: normalize(150),
    borderTopRightRadius: normalize(150),
    backgroundColor: colors.onSecondaryLight,
  },
});
