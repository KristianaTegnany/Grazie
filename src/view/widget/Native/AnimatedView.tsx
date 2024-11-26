import React from 'react';
import View, { IViewProps } from './View';
import { View as RNAnimated, CustomAnimation } from 'react-native-animatable';
import { Animated, ImageStyle, TextStyle, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native';

type IProps = IViewProps & {
    animation?: string | CustomAnimation<TextStyle & ViewStyle & ImageStyle>;
    delay?: number;
    duration?: number;
    iterationCount?: number | 'infinite';
    forwardRef?: any;
    animatedColor?: any;
    animatedOpacity?: any;
    animatedTop?: any;
    animatedWidth?: any;
};

const AnimatedView = (props: IProps) => {
    const { animation, delay, duration, flex, iterationCount, forwardRef, animatedColor, animatedOpacity, animatedTop, animatedWidth } = props;

    return (
        <View {...props}>
            {animation !== undefined || forwardRef ?
                <RNAnimated ref={forwardRef} animation={animation} delay={delay} duration={duration} iterationCount={iterationCount} useNativeDriver style={[styles.fullWidth, { flex: typeof flex === 'number' ? flex : (flex ? 1 : undefined) }]}>
                    {props.children}
                </RNAnimated> :
                <Animated.View style={{
                    backgroundColor: animatedColor,
                    opacity: animatedOpacity,
                    top: animatedTop,
                    width: animatedWidth,
                }} >
                    {props.children}
                </Animated.View>
            }
        </View>
    )
};

const styles = StyleSheet.create({
    fullWidth: { width: '100%', justifyContent: 'center' }
})

export default AnimatedView;