import React from 'react';
import colors from 'themes/colors';
import View from 'widget/Native/View';

type IProps = {
    count: number;
    active: number;
    activeColor?: string;
};

const DotProgress = (props: IProps) => {
    const { count, active } = props;

    return (
        <View row center>
            {Array.from(new Array(count)).map((_, i) => (
                <View size={6} border={3} marginH={2}
                    style={{ backgroundColor: i === active ? (props?.activeColor ? props?.activeColor : colors.primaryDark) : colors.tertiary }}
                    key={i}
                />
            ))}
        </View>
    );
};

export default DotProgress;