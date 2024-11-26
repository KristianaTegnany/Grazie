import React from 'react';
import { Animated, DimensionValue } from 'react-native';
import { ITextProps } from './Text';
import fonts from 'themes/fonts';
import normalize from 'services/utils/normalize';
import colors from 'themes/colors';

type IProps = ITextProps & {
    animatedColor?: any;
    animatedOpacity?: any;
    maxWidth?: DimensionValue;
};

const AnimatedText = (props: IProps) => {
    const {
        children,
        color,
        margin,
        marginH,
        marginV,
        marginB,
        marginL,
        marginR,
        marginT,
        opacity,
        center,
        right,
        rosha,
        size,
        bold,
        light,
        medium,
        underlined,
        italic,
        style,
        numberOfLines,
        maxWidth,

        animatedColor,
        animatedOpacity,

    } = props;

    return (
        <Animated.Text numberOfLines={numberOfLines || 0} style={[
            style,
            {
                color: animatedColor || colors[color || 'onSecondaryExtraDark'],
                opacity: animatedOpacity || (opacity || 1),
                fontFamily: rosha ? fonts.rosha : fonts.roboto,
                fontWeight: bold ? '700' : (medium ? '500' : (light ? '300' : '400')),
                fontSize: normalize(size || 17),
                textDecorationLine: underlined ? 'underline' : 'none',
                textAlign: center ? 'center' : (right ? 'right' : 'left'),
                marginBottom: marginB ? normalize(marginB) : undefined,
                marginLeft: marginL ? normalize(marginL) : undefined,
                marginRight: marginR ? normalize(marginR) : undefined,
                marginTop: marginT ? normalize(marginT) : undefined,
                marginHorizontal: marginH ? normalize(marginH) : undefined,
                marginVertical: marginV ? normalize(marginV) : undefined,
                margin: margin ? normalize(margin) : undefined,
                fontStyle: italic ? 'italic' : 'normal',
                maxWidth: typeof maxWidth === 'number' ? normalize(maxWidth) : maxWidth
            }]} >
            {children}
        </Animated.Text>
    )
};

export default AnimatedText;