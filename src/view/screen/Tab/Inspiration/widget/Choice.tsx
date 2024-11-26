import React from 'react';
import { Source } from 'react-native-fast-image';
import { Image, Text, TouchableOpacity } from 'widget/Native';

type IProps = {
    title: string;
    onPress: () => void;
    disabled?: boolean;
    icon?: Source,
};

const DetailChoice = (props: IProps) => {
    const { disabled, title, icon, onPress } = props
    return (
        <TouchableOpacity minWidth={icon ? 105 : undefined} paddingV={icon ? 10 : undefined} paddingH={30} center iCenter marginR={icon ? 10 : 5} border={icon ? 10 : 19} color={'tertiary'} minHeight={30}
            onPress={onPress}>
            {icon &&
                <Image source={icon} width={20} height={20} margin={10} />
            }
            <Text size={13} bold={!!icon || !disabled} color={icon ? undefined : disabled ? 'onPrimary' : 'onSecondary'}>
                {title}
            </Text>
        </TouchableOpacity>
    );
};

export default DetailChoice;
