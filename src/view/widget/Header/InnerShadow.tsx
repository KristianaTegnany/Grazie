import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { View } from 'widget/Native';
import { IViewProps } from 'widget/Native/View';

const InnerShadow = (props: IViewProps) => {
    return (
        <View {...props}>
            <LinearGradient style={{ flex: 1 }} locations={[0, 0.5, 1]}
                colors={['rgba(0, 0, 0, 0.1)', 'rgba(0, 0, 0, 0.05)', 'rgba(0, 0, 0, 0.005)']} />
        </View>
    );
};

export default InnerShadow;