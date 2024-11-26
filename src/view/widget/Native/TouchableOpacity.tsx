import React from 'react';
import { TouchableOpacity as RNTouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import View, { IViewProps } from './View';
import normalize from 'services/utils/normalize';

export type ITouchableProps = IViewProps & {
  disabled?: boolean;
  noPadding?: boolean;
  sBaseline?: boolean;
  style?: StyleProp<ViewStyle>;
  nestedTouch?: boolean;
  onPress?: () => void;
  onPressIn?: () => void;
  onPressOut?: () => void;
  onLongPress?: () => void;
};

/*
  Notez bien que pour TouchableOpacity tous les props sont passés au Content View sauf:
  - style
  - maxWidth
  - maxHeight
  - sBaseline
  qui sont pour le Container RNTouchableOpacity
*/

const TouchableOpacity = (props: ITouchableProps) => {
  const { disabled, noPadding, maxWidth, maxHeight, nestedTouch, style, onPress, onPressIn, onPressOut, onLongPress } = props;

  const containerStyle = maxWidth || maxHeight ? [{
    maxWidth: typeof maxWidth === 'number' ? normalize(maxWidth) : maxWidth,
    maxHeight: typeof maxHeight === 'number' ? normalize(maxHeight) : maxHeight,
  }, style] : style

  const contentProps = Object.assign({}, props)
  delete contentProps.maxWidth
  delete contentProps.maxHeight
  delete contentProps.style

  return (
    <RNTouchableOpacity disabled={disabled} onPress={onPress} onPressIn={onPressIn} onPressOut={onPressOut} onLongPress={onLongPress} style={containerStyle}>
      <View {...contentProps} opacity={disabled ? 0.5 : (contentProps.opacity || 1)} padding={noPadding ? 0 : normalize(props.padding || 5)} pointerEvents={nestedTouch ? false : 'none'}>
        {props.children}
      </View>
    </RNTouchableOpacity>
  );
};

export default TouchableOpacity;