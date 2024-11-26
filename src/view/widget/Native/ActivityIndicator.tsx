import React from 'react';
import View, { IViewProps } from './View'
import { ActivityIndicator as RNActivityIndicator } from 'react-native';
import colors from 'themes/colors';

type IProps = IViewProps & {
    isWhite?: boolean;
};

const ActivityIndicator = (props: IProps) => {

    return (
        <View {...props}>
            <RNActivityIndicator color={props.isWhite ? 'white' : colors.primary} />
        </View>
    )
};

export default ActivityIndicator;