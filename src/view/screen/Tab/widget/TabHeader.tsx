import React, { ReactElement, useState } from 'react';
import {
    Animated, StyleSheet,
} from 'react-native';
import {
    AnimatedView,
    Input,
    TouchableOpacity,
    View,
} from 'widget/Native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import normalize from 'services/utils/normalize';
import colors from 'themes/colors';
import AnimatedText from 'widget/Native/AnimatedText';
import { useDispatch, useSelector } from 'react-redux';
import { updateMenuShown } from 'store/slice/app/appSlice';
import useTabHeaderCtr from './tabHeaderCtr';
import { rootState } from 'store/reducer';

type IProps = {
    backBtn?: boolean;
    background?: boolean;
    isRelative?: boolean;
    search?: boolean;
    text?: string | null;
    noMargin?: boolean;
    contentColor?: any;
    customRight?: ReactElement;
    animatedTitle?: any;
    onSearch?: (text: string) => void;
    toggleSearch?: () => void;
};

const TabHeader = (props: IProps) => {
    const { top } = useSafeAreaInsets();

    const dispatch = useDispatch();

    const { goBack } = useTabHeaderCtr(props?.backBtn);

    const { searchPlaceholder } = useSelector((s: rootState) => s.appReducer.sharedDatas.translation);

    const { customRight, search, onSearch, toggleSearch } = props;

    const openMenu = () => {
        dispatch(updateMenuShown(true))
    }

    return (
        <>
            <View paddingH={20} paddingB={10} paddingT={props.background ? top : 0} marginT={props.background ? 0 : top} color={props.background ? 'white' : undefined}>
                <Animated.View style={styles.container}>
                    {
                        search ?
                            <AnimatedView animation={'flipInX'} duration={500} flex>
                                <Input autoFocus search placeholder={searchPlaceholder} onChange={onSearch} /></AnimatedView> :
                            <>
                                {props?.backBtn ? (
                                    <TouchableOpacity width={40}
                                        onPress={goBack}>
                                        <AnimatedText color={props?.background ? 'onSecondary' : 'white'} animatedColor={props?.contentColor}>
                                            <AntDesign name="arrowleft" size={normalize(25)} />
                                        </AnimatedText>
                                    </TouchableOpacity>
                                ) : (props.backBtn === false ? <View width={40} /> : (
                                    <TouchableOpacity width={40}
                                        onPress={openMenu}>
                                        <Animated.Text
                                            style={[
                                                { color: props?.background ? colors.onSecondary : colors.white },
                                                props?.contentColor && { color: props?.contentColor },
                                            ]}>
                                            <Feather name="menu" size={normalize(30)} />
                                        </Animated.Text>
                                    </TouchableOpacity>
                                ))}
                                {props?.text && (
                                    <AnimatedText size={22} rosha
                                        animatedOpacity={props?.animatedTitle} maxWidth={'80%'} numberOfLines={1}>
                                        {props?.text}
                                    </AnimatedText>
                                )}
                            </>
                    }

                    <View width={customRight ? undefined : 40}>
                        {props?.backBtn === undefined && !customRight && (
                            <TouchableOpacity onPress={toggleSearch}>
                                <AnimatedText color={props?.background ? 'onSecondary' : 'white'} animatedColor={props?.contentColor}>
                                    <Feather name={search ? 'x' : 'search'} size={normalize(25)} color={search ? colors.onSecondaryLight : undefined} />
                                </AnimatedText>
                            </TouchableOpacity>
                        )}
                        {customRight}
                    </View>
                </Animated.View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }
})

export default TabHeader;