import React from 'react';
import View from './View';
import Text from './Text';
import Icon from 'react-native-vector-icons/Feather';
import TouchableOpacity from './TouchableOpacity';
import colors from 'themes/colors';

type IProps = {
    text?: string;
    radio?: boolean;
    sm?: boolean;
    value: boolean;
    reverse?: boolean;
    uncheckedC?: 'onTertiary' | 'white';
    dark?: boolean;
    rounded?: boolean;
    onChecked?: (checked: boolean) => void;
};

const PureCheckBox = (props: IProps) => {
    const { dark, radio, reverse, rounded, text, value } = props;

    let uncheckedC = props.uncheckedC || (dark ? 'onTertiary' : undefined)
    return (
        <View iCenter center marginR={(!reverse && !!text) ? 10 : 0} size={20} border={radio || rounded ? 10 : 3} borderC='primary' borderW={(value && radio) ? 3 : 0} color={rounded ? 'white' : ((!radio && value) ? 'primaryDark' : (uncheckedC || 'white'))}>
            {
                value && !radio &&
                <Icon name='check' color={rounded ? colors.primary : 'white'} size={rounded ? 12 : 18} />
            }
        </View>
    )
}

const CheckBox = (props: IProps) => {
    const { dark, sm, radio, text, reverse, value, onChecked } = props;

    const onPress = () => {
        onChecked && onChecked(!value);
    }

    return (
        <TouchableOpacity onPress={onPress} padding={5}>
            {!!text ? (
                <View {...props} rowR={reverse} row={!reverse} iCenter={radio}>
                    <PureCheckBox {...props} />
                    <View flex={!radio && !sm} center={sm} marginR={radio ? 10 : 0}>
                        <Text size={sm ? 12 : (dark ? 17 : 14)} medium={dark || sm} color={dark ? 'onSecondaryDark' : 'white'}>{text}</Text>
                    </View>
                </View>
            ) : <PureCheckBox {...props} />
            }
        </TouchableOpacity>
    )
};

export default CheckBox;