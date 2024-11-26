import React from 'react';
import { StyleProp } from 'react-native';
import FastImage, { Source, ImageStyle, ResizeMode } from 'react-native-fast-image';
import View, { IViewProps } from './View';
import defaultStyle from 'themes/defaultStyle';
import { BlurView } from '@react-native-community/blur';

type IProps = IViewProps & {
  blur?: boolean;
  poster?: boolean;
  dark?: boolean;
  ImageProps?: {
    source: Source;
    style?: StyleProp<ImageStyle>;
    resizeMode?: ResizeMode;
    onLoad?: () => void;
  }
};

const ImageBackground = (props: IProps) => {
  const { ImageProps, blur, children, color, poster, dark } = props;

  const bgStyle: StyleProp<ImageStyle> = ImageProps?.style ? [defaultStyle.absolute, ImageProps.style] : defaultStyle.absolute
  return (
    <View
      {...props} overflow='hidden' color={poster ? 'onSecondaryLight' : color}>
      {ImageProps && <FastImage {...ImageProps} style={bgStyle} />}
      {
        blur &&
        <BlurView blurType="dark" blurAmount={1} style={defaultStyle.absolute} />
      }
      {dark && <View absolute top={0} left={0} right={0} bottom={0} hexColor="#00000055" />}
      {children}
    </View>
  );
};

export default ImageBackground;