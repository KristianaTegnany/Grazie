import React, { ReactNode } from 'react';
import { DimensionValue, LayoutChangeEvent, View as RNView, StyleProp, ViewStyle } from 'react-native';
import normalize from 'services/utils/normalize';
import colors from 'themes/colors';
import defaultStyle from 'themes/defaultStyle';

export type IViewProps = {
    color?: 'white' | 'secondary' | 'onSecondary' | 'onSecondaryLight' | 'onSecondaryDark' | 'onSecondaryExtraDark' | 'tertiary' | 'onTertiary' | 'primary' | 'primaryDark' | 'onPrimary' | 'onForm' | 'green' | 'quartenary' | 'onQuartenary' | 'private' | 'brown'
    ,
    hexColor?: `#${string}`;
    children?: ReactNode;
    opacity?: number;
    margin?: number;
    marginH?: number;
    marginV?: number;
    marginT?: DimensionValue;
    marginL?: number;
    marginR?: number;
    marginB?: number;
    padding?: number;
    paddingH?: number;
    paddingV?: number;
    paddingT?: number;
    paddingL?: number;
    paddingR?: number;
    paddingB?: number;
    border?: number;
    borderT?: number;
    borderTL?: number;
    borderTR?: number;
    borderB?: number;
    borderBL?: number;
    borderBR?: number;
    borderC?: 'primary' | 'onTertiary' | 'tertiary' | 'quartenary' | 'onQuartenary' | 'white' | 'grey' | 'transparent';
    borderW?: number;
    borderBW?: number;
    borderTW?: number;
    row?: boolean;
    rowR?: boolean;
    center?: boolean;
    end?: boolean;
    around?: boolean;
    between?: boolean;
    iCenter?: boolean;
    iEnd?: boolean;
    iStart?: boolean;
    sStart?: boolean;
    sCenter?: boolean;
    sBaseline?: boolean;
    sEnd?: boolean;
    wrap?: boolean;
    height?: DimensionValue;
    width?: DimensionValue;
    size?: number;
    minWidth?: DimensionValue;
    minHeight?: DimensionValue;
    maxWidth?: DimensionValue;
    maxHeight?: DimensionValue;
    aspectRatio?: number;
    fullWidth?: boolean;
    flex?: boolean | number;
    absolute?: number | boolean;
    top?: number;
    bottom?: DimensionValue;
    left?: DimensionValue;
    right?: number;
    overflow?: 'hidden';
    shadow?: boolean;
    sShadow?: boolean;
    xsShadow?: boolean;
    style?: StyleProp<ViewStyle>;
    pointerEvents?: 'none' | false;
    onLayout?: (event: LayoutChangeEvent) => void;
}

type JustifyContent = 'flex-start' | 'flex-end' | 'center' | 'space-around' | 'space-between'

const View = (props: IViewProps) => {
    const {
        children,
        color,
        hexColor,
        margin,
        marginH,
        marginV,
        marginB,
        marginL,
        marginR,
        marginT,
        padding,
        paddingH,
        paddingV,
        paddingB,
        paddingL,
        paddingR,
        paddingT,
        borderC,
        borderW,
        borderBW,
        borderTW,
        border,
        borderT,
        borderTL,
        borderTR,
        borderB,
        borderBL,
        borderBR,
        row,
        rowR,
        center,
        end,
        around,
        between,
        iCenter,
        iEnd,
        iStart,
        sStart,
        sCenter,
        sBaseline,
        sEnd,
        wrap,
        height,
        width,
        size,
        minWidth,
        minHeight,
        maxWidth,
        maxHeight,
        aspectRatio,
        fullWidth,
        flex,
        absolute,
        top,
        bottom,
        left,
        right,
        opacity,
        shadow,
        sShadow,
        xsShadow,
        style,
        overflow,
        pointerEvents,
        onLayout
    } = props;

    let justifyContent: JustifyContent = 'flex-start'
    if (center)
        justifyContent = 'center'
    else if (end)
        justifyContent = 'flex-end'
    else if (around)
        justifyContent = 'space-around'
    else if (between)
        justifyContent = 'space-between'

    return <RNView onLayout={onLayout} style={[
        {
            backgroundColor: hexColor || (color ? colors[color] : undefined),
            width: size? normalize(size) : (fullWidth ? '100%' : (typeof width === 'number' ? normalize(width) : width)),
            height: size? normalize(size) : (typeof height === 'number' ? normalize(height, true) : height),
            minWidth: typeof minWidth === 'number' ? normalize(minWidth) : minWidth,
            maxWidth: typeof maxWidth === 'number' ? normalize(maxWidth) : maxWidth,
            minHeight: typeof minHeight === 'number' ? normalize(minHeight, true) : minHeight,
            maxHeight: typeof maxHeight === 'number' ? normalize(maxHeight, true) : maxHeight,
            aspectRatio,
            opacity: opacity || 1,
            marginBottom: normalize(marginB, true),
            marginLeft: normalize(marginL),
            marginRight: normalize(marginR),
            marginTop: typeof marginT === 'number' ? normalize(marginT, true) : marginT,
            marginHorizontal: normalize(marginH),
            marginVertical: normalize(marginV, true),
            margin: normalize(margin),
            paddingBottom: normalize(paddingB, true),
            paddingLeft: normalize(paddingL),
            paddingRight: normalize(paddingR),
            paddingTop: normalize(paddingT, true),
            paddingHorizontal: normalize(paddingH),
            paddingVertical: normalize(paddingV, true),
            padding: normalize(padding),
            borderRadius: normalize(border),
            borderTopLeftRadius: normalize(borderT || borderTL),
            borderTopRightRadius: normalize(borderT || borderTR),
            borderBottomLeftRadius: normalize(borderB || borderBL),
            borderBottomRightRadius: normalize(borderB || borderBR),
            borderColor: borderC ? colors[borderC] : undefined,
            borderWidth: normalize(borderW),
            borderBottomWidth: normalize(borderBW),
            borderTopWidth: normalize(borderTW),
            flexDirection: row ? 'row' : (rowR ? 'row-reverse' : 'column'),
            justifyContent,
            alignSelf: sStart ? 'flex-start' : (sCenter ? 'center' : (sBaseline ? 'baseline' : (sEnd ? 'flex-end' : 'auto'))),
            alignItems: iCenter ? 'center' : (iEnd ? 'flex-end' : (iStart ? 'flex-start' : 'stretch')),
            flex: typeof flex === 'number' ? flex : (flex ? 1 : undefined),
            flexWrap: wrap ? 'wrap' : 'nowrap',
            position: absolute ? 'absolute' : 'relative',
            top: normalize(top, true),
            bottom: typeof bottom === 'number' ? normalize(bottom, true) : bottom,
            left: typeof left === 'number' ? normalize(left) : left,
            right: normalize(right),
            zIndex: typeof absolute === 'number' ? absolute : undefined,
            overflow: overflow || 'visible',
            pointerEvents: pointerEvents ? 'none' : 'auto',
        },
        style, xsShadow && defaultStyle.shadowSs, sShadow && defaultStyle.shadowSm, shadow && defaultStyle.shadowLg //V3 from shaadowSm
    ]}>{children}</RNView>;
};

export default View;