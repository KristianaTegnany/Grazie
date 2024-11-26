import React from 'react';
import {
    ActivityIndicator,
    Image,
    ScrollView,
    Text, TouchableOpacity, View
} from 'widget/Native';
import useSubscribeCtr from './subscribeModalCtr';
import SubscriptionItem from './widget/subscriptionItem';
import SubscribeItem from './widget/subscribeItem';
import Icon from 'react-native-vector-icons/AntDesign';
import FullModal from 'widget/Modal/FullModal';
import SubscriptionDetailModal from './SubscriptionDetailModal';
import TabImageBackground from 'screen/Tab/widget/TabImageBackground';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { images } from 'assets/images';

const SubscribeModal = ({ modal, afterClosedAuto, callback, setModal, }: { modal: boolean, afterClosedAuto?: () => void, callback?: () => void, setModal: () => void }) => {
    const {
        gigiNotebooks,
        allSecretsAddressesByDestination,
        gigiSubscriptionsPlans,
        gigiSubscriptionsPlansDescription,
        or,
        headerBg,

        carnets,
        hasMag,
        isAllRegions,
        isPro,
        product,
        subscriptionsBO,
        closeDetail,
        closeModal,
        goToDetail,
    } = useSubscribeCtr(setModal, afterClosedAuto);

    const { top } = useSafeAreaInsets()

    return (
        <>
            <FullModal modal={modal} noPaddingTop>
                <ScrollView bounces={false}>
                    <View absolute={1} top={top} left={20} ><TouchableOpacity onPress={callback ? callback : closeModal}><Icon name={callback ? 'close' : 'arrowleft'} size={25} color='white' /></TouchableOpacity></View>
                    <TabImageBackground mini title={gigiSubscriptionsPlans} subtitle={gigiSubscriptionsPlansDescription} image={{ uri: headerBg?.urlLq }} />
                    {subscriptionsBO.length === 0 && <ActivityIndicator flex center iCenter />}
                    {subscriptionsBO.length > 0 &&
                        <View paddingH={20} color='secondary' paddingT={20} paddingB={20}>
                            <Text rosha marginT={20} marginB={10} size={28}>
                                {gigiNotebooks}
                            </Text>
                            <Text marginB={20}>
                                {allSecretsAddressesByDestination}
                            </Text>
                            <View>
                                <View marginT={10} marginB={30} row wrap center>
                                    {subscriptionsBO.filter(sub => !(sub.isAllRegions || sub.isMag || sub.isPro)).map((sub, i) => {
                                        return (
                                            <SubscriptionItem key={i} check={isAllRegions || carnets?.map(sub => sub?.reference).includes(sub.reference)} title={sub.title} onPress={() => goToDetail(sub)} hasMarginR={i % 2 === 0} uri={sub.thumbnail?.urlHq} />
                                        )
                                    })}
                                </View>
                                <Text center marginB={20} size={32} rosha>{or}</Text>
                                {subscriptionsBO.filter(sub => sub.isAllRegions).map((sub, i) => (<SubscriptionItem key={i} check={isAllRegions} big title={sub.title} onPress={() => goToDetail(sub)} uri={sub.thumbnail?.urlHq} />))}
                                <View absolute={-1} end left={-20} bottom={0} right={0}>
                                    <Image source={images.tab.inspiration.MoonLeft} absolute={0} left={0} bottom={0} height={224} width={110} resizeMode='contain' />
                                </View>
                            </View>
                            {subscriptionsBO.filter(sub => sub.isMag || sub.isPro).map((sub, i) => {
                                return (
                                    <SubscribeItem key={i} check={!sub.isPro && hasMag || sub.isPro && isPro} title={sub.titleListItem.toUpperCase()} description={sub.shortDescription[0].contentHtml} onPress={() => goToDetail(sub)} noPrice uri={sub.thumbnail?.urlHq} />
                                )
                            })}
                        </View>}
                    <SubscriptionDetailModal modal={product !== undefined} product={product} setModal={closeDetail} />
                </ScrollView>
            </FullModal>
        </>
    );
};

export default SubscribeModal;
