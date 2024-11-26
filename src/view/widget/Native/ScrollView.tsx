import React from 'react';
import { ScrollView as RNScrollView } from 'react-native';
import { ScrollView as GHScrollView } from 'react-native-gesture-handler';
import View, { IViewProps } from './View';

export type IScrollProps = IViewProps & {
  hasPaddingBottom?: boolean;
  bounces?: boolean;
  horizontal?: boolean;
  forwardRef?: React.RefObject<RNScrollView>
};

const ScrollView = (props: IScrollProps) => {
  const { forwardRef, fullWidth, hasPaddingBottom, horizontal, bounces = true } = props;

  return horizontal ? (<GHScrollView bounces={bounces} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} horizontal={horizontal} style={{ flexGrow: horizontal ? 0 : 1 }}>
    <View {...props}>{props.children}</View>
  </GHScrollView>) : (
    <RNScrollView ref={forwardRef} bounces={bounces} contentContainerStyle={{ paddingBottom: hasPaddingBottom ? 80 : undefined }} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} horizontal={horizontal} style={{ width: fullWidth ? '100%' : undefined, flexGrow: horizontal ? 0 : 1 }}>
      <View {...props}>{props.children}</View>
    </RNScrollView>
  );
};

export default ScrollView;