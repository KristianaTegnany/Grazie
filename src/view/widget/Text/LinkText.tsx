import React from 'react';
import { TouchableOpacity } from 'widget/Native';
import Text from 'widget/Native/Text';

export type IProps = {
    color?: 'white' | 'onSecondary' | 'onSecondaryDark' | 'onPrimary' | 'primaryDark' | 'black',
    text: string;
    right?: boolean;
    center?: boolean;
    margin?: number;
    marginH?: number;
    marginV?: number;
    marginT?: number;
    marginL?: number;
    marginR?: number;
    marginB?: number;
    bold?: boolean;
    medium?: boolean;
    size?: number;
    onPress?: () => void;
}

const LinkText = (props: IProps) => {
    return <TouchableOpacity onPress={props.onPress} noPadding><Text {...props} color={props.color || 'primary'} underlined>{props.text}</Text></TouchableOpacity>;
};

export default LinkText;