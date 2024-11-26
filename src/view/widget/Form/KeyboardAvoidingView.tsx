import { useKeyboard } from '@react-native-community/hooks';
import { PropsWithChildren, memo, useEffect } from 'react';
import { Animated, Dimensions, DimensionValue, TextInput } from 'react-native';
import normalize from 'services/utils/normalize';

const { height: windowHeight } = Dimensions.get('window');
const { State: TextInputState } = TextInput;

const shift = new Animated.Value(0);

const KeyboardAvoiding = (props: PropsWithChildren & {flex?: boolean, inputHeight?: number}) => {
    const keyboard = useKeyboard()


    useEffect(() => {
        if (keyboard.keyboardShown && keyboard.keyboardHeight > 0) {
            const currentlyFocusedField = TextInputState.currentlyFocusedInput();
            currentlyFocusedField && currentlyFocusedField.measureInWindow((x, y) => {

                const gap = (windowHeight - keyboard.keyboardHeight) - (y + normalize(props.inputHeight || 55, true)!);

                if (gap >= 0) {
                    return;
                }
                Animated.timing(
                    shift,
                    {
                        toValue: gap,
                        duration: 200,
                        useNativeDriver: false,
                    }
                ).start();
            })

        }
        else {
            Animated.timing(
                shift,
                {
                    toValue: 0,
                    duration: 200,
                    useNativeDriver: false,
                }
            ).start();
        }
    }, [keyboard.keyboardShown, keyboard.keyboardHeight])


    return (
        <Animated.View style={{ flex: props.flex? 1 : undefined, transform: [{ translateY: shift }] }}>{props.children}</Animated.View>
    )
}

export default memo(KeyboardAvoiding);