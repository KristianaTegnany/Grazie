import React, { PropsWithChildren } from 'react';
import { Image, Text, View } from 'widget/Native';
import Touchable from 'widget/Native/Touchable';

type IProps = {
    id: string,
    title: string;
    from: string;
    to?: string;
    uri?: string;
    onPress: () => void;
};

const SubscriptionCard = (props: PropsWithChildren<IProps>) => {
    const { title, from, to, uri, onPress } = props;

    return (
        <Touchable noPadding onPress={onPress} marginB={10}>
            <View xsShadow row padding={10} border={10} marginB={10} color='secondary'>
                <View center><Image source={{ uri }} border={11} width={47} height={47} /></View>
                <View marginL={10} flex>
                    <Text size={15} marginT={3} marginB={5} bold hexColor='#1C1C1E'>{title}</Text>
                    {!!to && <Text size={12} hexColor='#4B4E5080'>{to}</Text>}
                </View>
            </View>
        </Touchable>
    );
};

export default SubscriptionCard;
