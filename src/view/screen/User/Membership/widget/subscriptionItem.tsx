import React, { PropsWithChildren } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { ImageBackground, Text, TouchableOpacity, View } from 'widget/Native';
import LinearGradient from 'widget/Native/LinearGradient';

type IProps = {
    title: string;
    big?: boolean;
    check?: boolean;
    price?: string;
    notPrice?: string;
    isLocked?: boolean;
    hasMarginR?: boolean;
    loading?: boolean;
    uri?: string;
    onPress: () => void;
};

const SubscriptionItem = (props: PropsWithChildren<IProps>) => {
    const { title, big, check, price, notPrice, uri, isLocked, hasMarginR, loading, onPress } = props

    return (
        <TouchableOpacity marginB={big ? 20 : 0} opacity={loading ? 0.3 : 1} disabled={loading} noPadding onPress={check ? undefined : onPress}>
            {!check && !!notPrice && <View absolute={1} right={5} top={-7} paddingV={2} paddingH={5} border={15} color='primary'><Text bold size={12} through color='white'>{notPrice}</Text></View>}
            <ImageBackground sShadow poster ImageProps={{ source: { uri } }} width={big ? undefined : 170} row={isLocked} center iCenter marginR={hasMarginR ? 9 : 0} paddingL={15} paddingR={10} height={big? 117 : 100} marginB={9} border={15}>
                <LinearGradient
                    colors={[
                        '#000000A6',
                        '#00000000',
                    ]}
                    locations={[0, 1]} />
                <View>
                    <Text rosha color='white' size={18} children={title.toUpperCase()} />
                    {isLocked && !!price && <View paddingV={2} paddingH={5} border={15} hexColor='#00000088'><Text bold size={12} color='white'>{price}</Text></View>}
                </View>
                {isLocked && <View size={30} border={15} iCenter hexColor='#00000080'>
                    <Icon name='lock' color='white' size={20} />
                </View>}
                {!isLocked && (check ? <View padding={5} border={15} color='primary'><Icon name='check' color='white' /></View> : !!price && <View marginT={5} paddingV={2} paddingH={5} border={15} hexColor='#00000088'><Text bold size={11} color='white'>{price}</Text></View>)}
            </ImageBackground>
        </TouchableOpacity>
    );
};

export default SubscriptionItem;
