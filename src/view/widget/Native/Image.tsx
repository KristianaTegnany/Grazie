import React from 'react';
import { DimensionValue, Image as RNImage } from 'react-native';
import FastImage, { Source, ResizeMode, OnLoadEvent } from 'react-native-fast-image';
import normalize from 'services/utils/normalize';
import colors from 'themes/colors';

type IProps = {
    source: Source;
    resizeMode?: ResizeMode;
    tintColor?: 'white' | 'black' | 'primary';

    opacity?: number;
    aspectRatio?: number;

    margin?: number;
    marginH?: number;
    marginV?: number;
    marginT?: number;
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
    borderC?: 'white' | 'primary';
    borderW?: number;
    borderT?: number;

    height?: DimensionValue;
    width?: DimensionValue;
    maxHeight?: DimensionValue;

    flex?: boolean | number;

    absolute?: number;
    top?: DimensionValue;
    bottom?: DimensionValue;
    left?: DimensionValue;
    right?: DimensionValue;
    native?: boolean;
    poster?: boolean;
    onLoad?: (event: OnLoadEvent) => void;
};

const Image = (props: IProps) => {
    const { source, resizeMode, tintColor,

        aspectRatio,

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
        border,
        borderT,

        height,
        width,
        maxHeight,

        flex,

        absolute,
        top,
        bottom,
        left,
        right,

        opacity,
        native,
        poster,
        onLoad
    } = props;

    const imagesProps: any = {
        source, onLoad, resizeMode, tintColor: tintColor ? colors[tintColor] : undefined, style: {
            width: typeof width === 'number' ? normalize(width) : width,
            height: typeof height === 'number' ? normalize(height) : height,
            maxHeight: typeof maxHeight === 'number' ? normalize(maxHeight) : maxHeight,
            aspectRatio,
            flex: flex ? 1 : undefined,
            opacity: opacity || 1,
            marginBottom: normalize(marginB),
            marginLeft: normalize(marginL),
            marginRight: normalize(marginR),
            marginTop: normalize(marginT),
            marginHorizontal: normalize(marginH),
            marginVertical: normalize(marginV),
            margin: normalize(margin),
            paddingBottom: normalize(paddingB),
            paddingLeft: normalize(paddingL),
            paddingRight: normalize(paddingR),
            paddingTop: normalize(paddingT),
            paddingHorizontal: normalize(paddingH),
            paddingVertical: normalize(paddingV),
            padding: normalize(padding),
            backgroundColor: poster ? colors.onSecondaryLight : undefined,
            borderTopLeftRadius: normalize(borderT),
            borderTopRightRadius: normalize(borderT),
            borderRadius: normalize(border),
            borderColor: borderC ? colors[borderC] : undefined,
            borderWidth: normalize(borderW),
            position: absolute ? 'absolute' : 'relative',
            top: typeof top === 'number' ? normalize(top) : bottom,
            bottom: typeof bottom === 'number' ? normalize(bottom) : bottom,
            left: typeof left === 'number' ? normalize(left) : left,
            right: typeof right === 'number' ? normalize(right) : bottom,
            zIndex: absolute || undefined,
        }
    }
    return native ? <RNImage {...imagesProps} /> :
        <FastImage {...imagesProps} />
};

export default Image;