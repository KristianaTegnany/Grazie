import { Portal } from '@gorhom/portal';
import React, { ReactNode, useEffect, useRef } from 'react';
import { AnimatedView, View } from 'widget/Native';
import { Animated, Dimensions, StyleSheet } from 'react-native';
import { slideInLeft, slideInRight, slideInUp } from 'services/utils/animations';
import { PanResponder } from 'react-native';

const { height } = Dimensions.get('screen')

type IProps = {
    animationType?: 'fadeIn' | 'slideInUp' | 'slideInLeft' | 'slideInRight';
    blurAmount?: number;
    center?: boolean;
    children: ReactNode;
    fullscreen?: boolean;
    isVisible: boolean;
    nonDismissible?: boolean;
    transparent?: boolean;
    callback?: () => void;
}
const Modal = ({ animationType, blurAmount, center, children, fullscreen, isVisible, nonDismissible, transparent, callback }: IProps) => {

    const animation = {
        'slideInLeft': slideInLeft,
        'slideInRight': slideInRight,
        'fadeIn': 'fadeIn',
        'slideInUp': slideInUp
    }

    const topAnim = useRef(new Animated.Value(0)).current

    function closeModal() {
        if (callback) {
            Animated.timing(topAnim, {
                toValue: height,
                duration: 200,
                useNativeDriver: false,
            }).start();
            setTimeout(callback, 200)
        }
    }

    const panResponder = React.useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (e, gestureState) => {
                if (gestureState.dy > 20) {
                    Animated.event([null, { dy: topAnim }], {
                        useNativeDriver: false,
                    })(e, gestureState);
                }
            },
            onPanResponderRelease: (e, gs) => {
                if (gs.dy > 50) {
                    return closeModal()
                }
                return Animated.spring(topAnim, {
                    toValue: 0,
                    useNativeDriver: false,
                }).start();
            }
        }),
    ).current;

    useEffect(() => {
        if (isVisible && !center && !fullscreen) {
            Animated.timing(topAnim, {
                toValue: 0,
                duration: 100,
                useNativeDriver: false,
            }).start();
        }
    }, [isVisible])

    return isVisible ? (
        <Portal>
            <View absolute={100} left={0} right={0} top={0} bottom={0} center={center} end={!center} hexColor={transparent ? undefined : '#000000DD'}>
                <AnimatedView animation={animationType ? animation[animationType] : ''} flex={fullscreen} padding={center ? 10 : 0} duration={300}>
                    {!nonDismissible && !center && !fullscreen && <Animated.View style={{
                        flex: (fullscreen || center) ? 1 : undefined, top: topAnim
                    }} {...panResponder.panHandlers}>{children}</Animated.View>
                    }
                    {(nonDismissible || center || fullscreen) && children}
                </AnimatedView>
            </View>
        </Portal>
    ) : null;
};

const styles = StyleSheet.create({
    blurBg: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.1)'
    },
})

export default Modal;
