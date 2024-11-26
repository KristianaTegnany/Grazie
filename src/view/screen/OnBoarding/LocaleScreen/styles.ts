import {StyleSheet} from "react-native";
import normalize from "services/utils/normalize";

export const localeScreenStyle = StyleSheet.create({
  image: {
    flex: 1,
  },
  blurBg: {
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    // width: 300,
    height: "120%",
    zIndex: 0,
    borderRadius: normalize(20),
  },
});
