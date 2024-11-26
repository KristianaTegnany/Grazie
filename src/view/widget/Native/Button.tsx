import { BlurView } from '@react-native-community/blur';
import React, { ReactNode } from 'react';
import { ActivityIndicator, DimensionValue, StyleSheet, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import normalize from 'services/utils/normalize';
import colors from 'themes/colors';
import Text from 'widget/Native/Text';
import View from 'widget/Native/View';

type IProps = {
    sm?: boolean;
    md?: boolean;
    lg?: boolean;
    text: string;
    white?: boolean;
    outline?: boolean;
    disabled?: boolean;
    loading?: boolean;
    height?: number;
    width?: DimensionValue;
    paddingH?: number;
    marginB?: number;
    marginT?: number;
    marginL?: number;
    marginH?: number;
    noBorder?: boolean;
    right?: ReactNode;
    flex?: boolean;
    underlined?: boolean;
    wrapContent?: boolean;
    onPress: (() => void) | undefined;
};

const Button = (props: IProps) => {
    const { sm, md, lg, text, white, outline, disabled, loading, width, height, marginB, marginL, marginH, marginT, noBorder, paddingH, flex, right, underlined, wrapContent, onPress } = props;
    return (
        <TouchableOpacity disabled={loading || disabled} onPress={onPress} style={{ flex: flex ? 1 : undefined, minWidth: (flex || wrapContent) ? undefined : width, marginBottom: normalize(marginB), marginLeft: normalize(marginL), marginHorizontal: normalize(marginH), marginTop: normalize(marginT) }}>
            {!outline && !white && !disabled ? (
                <LinearGradient
                    style={[styles.bg, {
                        borderRadius: normalize(md ? 13 : 9),
                        height: normalize(height || (sm ? 52 : 56), true),
                        //opacity: disabled ? 0.3 : 1,
                        alignSelf: wrapContent ? 'baseline' : 'auto',
                        paddingHorizontal: normalize(paddingH),
                    }]}
                    colors={[
                        '#E89570',
                        '#C77651'
                    ]}
                    locations={[0, 1]}>
                    {loading ?
                        <ActivityIndicator color={colors.white} size={normalize(sm ? 9 : (md ? 12 : 13))} />
                        :
                        <View row iCenter><Text adjustsFontSizeToFit numberOfLines={1} color={'white'} bold={sm} medium={md} size={lg ? 17 : (md ? 16 : 14)}>{text}</Text>{right}</View>
                    }
                </LinearGradient>
            ) : (
                <View border={md ? 13 : (outline ? 9 : 12)} overflow='hidden'>
                    {
                        (!outline && (white || disabled)) && <>
                            <View color={disabled ? 'onSecondaryLight' : 'white'} opacity={0.5} style={styles.blurBg} />
                            <BlurView
                                blurType={disabled ? "dark" : "light"}
                                blurAmount={7}
                                style={styles.blurBg}
                            />
                        </>
                    }
                    <View padding={10} height={wrapContent ? undefined : (height || (sm ? 52 : 56))} center iCenter border={md ? 13 : (outline ? 9 : 12)} opacity={disabled ? 0.3 : 1} borderW={(!outline || noBorder) ? 0 : (sm ? 0.6 : 1)} borderC='primary' paddingH={paddingH}>
                        {loading ?
                            <ActivityIndicator color={(outline || white) ? colors.primary : colors.white} size={normalize(sm ? 9 : (md ? 12 : 13))} />
                            :
                            <View row iCenter flex><Text adjustsFontSizeToFit numberOfLines={1} color={outline ? 'primary' : (!white ? 'white' : undefined)} bold={sm} medium={md} size={lg ? 17 : (md ? 16 : 14)} underlined={underlined}>{text}</Text>{right}</View>
                        }
                    </View>
                </View>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    bg: {
        padding: normalize(10),
        justifyContent: 'center',
        alignItems: 'center',
    },
    blurBg: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        zIndex: 0,
    },
})
export default Button;