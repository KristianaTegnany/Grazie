import React, { ReactElement } from 'react';
import { Image, Text, TouchableOpacity, View } from 'widget/Native';
import Icon from 'react-native-vector-icons/AntDesign';
import colors from 'themes/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import normalize from 'services/utils/normalize';
import { Source } from 'react-native-fast-image';
import useBackBtnCtr from './backBtnCtr';

type IProps = {
    transparent?: boolean;
    bottomRadiusReverse?: boolean;
    customRight?: ReactElement;
    image?: Source;
    noPaddingT?: boolean;
    sm?: boolean;
    title: string;
    white?: boolean;
    onPress?: () => void;
};

const TitleBackBtn = (props: IProps) => {
    const { top } = useSafeAreaInsets();
    const { canGoBack, goBack, onLogout } = useBackBtnCtr();
    const { bottomRadiusReverse, customRight, image, sm, title, transparent, white } = props

    return (
        <View fullWidth iStart paddingH={20} paddingT={props.noPaddingT ? undefined : top} paddingB={image ? 30 : 10} color={(white || image || transparent) ? undefined : 'white'} row between >
            {image &&
                <Image absolute={-1} top={0} left={0} right={0} bottom={0} source={image} />
            }
            <TouchableOpacity
                width={40}
                onPress={canGoBack ? (props.onPress || goBack) : onLogout}>
                <Icon name={canGoBack ? "arrowleft" : "close"} size={normalize(25)} color={white ? colors.white : colors.onSecondary} />
            </TouchableOpacity>
            <Text flex center sCenter size={sm ? 18 : 20} rosha color={white ? 'white' : 'onSecondaryDark'}>
                {title}
            </Text>
            <View width={40} row>
                {customRight}
            </View>
            {bottomRadiusReverse && <View absolute bottom={0} left={0} right={0} borderT={20} height={20} color='white' />}
        </View>
    );
};

export default TitleBackBtn;