import {Dimensions, PixelRatio} from "react-native";

const scale = Dimensions.get("window").width / 390;
const scaleH = Dimensions.get("window").height / 844;

const normalize = (size: number | undefined, height?: boolean) => {
  if (size === undefined) {
    return undefined;
  }

  return Math.round(
    PixelRatio.roundToNearestPixel(size * (height ? scaleH : scale)) /*-
      (Platform.OS === 'android' ? 2 : 0),*/,
  );
};

export default normalize;
