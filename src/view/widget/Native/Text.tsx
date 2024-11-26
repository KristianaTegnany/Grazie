import React, { ReactNode } from 'react';
import { Text as RNText, StyleProp, TextStyle } from 'react-native';
import normalize from 'services/utils/normalize';
import colors from 'themes/colors';
import fonts from 'themes/fonts';

export type ITextProps = {
  color?: 'white' | 'black' | 'onSecondary' | 'onSecondaryLight' | 'onSecondaryDark' | 'primary' | 'primaryDark' | 'onPrimary' | 'onForm' | 'green' | 'onQuartenary' | 'textColorBlack' | 'textColorGrey' | 'textField' | 'textFieldGrey' | 'textFieldTitle' | 'error',
  hexColor?: `#${string}`;
  underlined?: boolean;
  uppercase?: boolean
  italic?: boolean;
  children: ReactNode;
  opacity?: number;
  right?: boolean;
  center?: boolean;
  sCenter?: boolean;
  sBaseline?: boolean;
  sEnd?: boolean;
  lineHeight?: number;
  margin?: number;
  marginH?: number;
  marginV?: number;
  marginT?: number;
  marginL?: number;
  marginR?: number;
  marginB?: number;
  rosha?: boolean;
  bold?: boolean;
  letterSpacing?: number;
  light?: boolean;
  medium?: boolean;
  size?: number;
  numberOfLines?: number;
  style?: StyleProp<TextStyle>;
  flex?: number | boolean;
  adjustsFontSizeToFit?: boolean;
  thin?: boolean;
  through?: boolean;
}

const Text = (props: ITextProps) => {
  const {
    children,
    color,
    hexColor,
    lineHeight,
    margin,
    marginH,
    marginV,
    marginB,
    marginL,
    marginR,
    marginT,
    opacity,
    center,
    sCenter,
    sBaseline,
    sEnd,
    right,
    rosha,
    size,
    bold,
    letterSpacing,
    light,
    medium,
    underlined,
    italic,
    style,
    numberOfLines,
    flex,
    adjustsFontSizeToFit,
    thin,
    through
  } = props;
  return <RNText numberOfLines={numberOfLines || 0} style={[
    {
      color: hexColor || colors[color || 'onSecondaryExtraDark'],
      fontFamily: rosha ? fonts.rosha : fonts.roboto,
      fontWeight: bold ? '700' : (medium ? '500' : (light ? '300' : (thin ? '100' : '400'))),
      fontSize: normalize(size || 17, true),
      textDecorationLine: underlined ? 'underline' : (through ? 'line-through' : 'none'),
      textAlign: center ? 'center' : (right ? 'right' : 'left'),
      alignSelf: sCenter ? 'center' : (sBaseline ? 'baseline' : (sEnd ? 'flex-end' : 'auto')),
      opacity: opacity || 1,
      letterSpacing,
      lineHeight: lineHeight ? normalize(lineHeight, true) : undefined,
      marginBottom: marginB ? normalize(marginB) : undefined,
      marginLeft: marginL ? normalize(marginL) : undefined,
      marginRight: marginR ? normalize(marginR) : undefined,
      marginTop: marginT ? normalize(marginT) : undefined,
      marginHorizontal: marginH ? normalize(marginH) : undefined,
      marginVertical: marginV ? normalize(marginV) : undefined,
      margin: margin ? normalize(margin) : undefined,
      fontStyle: italic ? 'italic' : 'normal',
      flex: typeof flex === 'number' ? flex : (flex ? 1 : undefined)
    },
    style,
  ]} adjustsFontSizeToFit={adjustsFontSizeToFit}>{children}</RNText>;
};

export default Text;