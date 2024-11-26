import useAppNavigator from 'hooks/useAppNavigator';
import React from 'react';
import { useSelector } from 'react-redux';
import routeName from 'routes/routeName';
import { rootState } from 'store/reducer';
import { Image, Text, TouchableOpacity, View } from 'widget/Native';

const OrderItem = ({ data, isLast }: { data: any, isLast?: boolean }) => {
    const navigator = useAppNavigator()

    const {
        statusLabel
    } = useSelector((state: rootState) => state.userReducer.serviceDatas.translation)


    const onPress = () => {
        navigator.navigateScreen(routeName.user.service.orderDetail, { id: data.id })
    }

    return (
        <TouchableOpacity iCenter noPadding paddingB={20} paddingH={20} marginB={isLast ? 0 : 20} borderBW={isLast ? 0 : 1} borderC='onTertiary' row onPress={onPress}>
            <Image source={{ uri: data.product?.thumbnail?.urlLq }} poster width={80} height={80} border={10} />
            <View marginL={10} flex>
                <Text size={14} bold>{data.product?.title}</Text>
                <Text size={12} color='onSecondaryLight' marginV={2}>{data.ordered}</Text>
                <Text size={12} color='onSecondaryLight' marginV={2}>{data.region?.label}</Text>
                <Text size={12} color='onSecondaryLight' marginV={2}>{statusLabel} {data.status?.label}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default OrderItem;
