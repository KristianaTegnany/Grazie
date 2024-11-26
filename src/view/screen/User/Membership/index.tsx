import useStatusBar from 'hooks/useStatusBar';
import React, { useEffect, useState } from 'react';
import {
    Text, View
} from 'widget/Native';
import SubscriptionCard from 'screen/User/Membership/widget/SubscriptionCard';
import SubscribeModal from './SubscribeModal';
import { useUser } from 'hooks/useUser';
import TabContainer from 'screen/Tab/widget/TabContainer';
import NoSubscription from './widget/NoSubscription';
import useAppNavigator from 'hooks/useAppNavigator';
import { useSelector } from 'react-redux';
import { rootState } from 'store/reducer';

const MembershipScreen = () => {
    useStatusBar('dark-content');

    const { subscriptions, fetchSubscriptions } = useUser()
    const { isFocused } = useAppNavigator()
    //const subscription = useSelector((state: rootState) => state.userReducer.userInfo.subscription);

    const { myCurrentSubscriptionsPlans, mySubscriptionsPlans, needMoreContent, noSubscriptionPlanLabel, noSubscriptionPlanDescription } = useSelector((state: rootState) => state.appReducer.membershipDatas.translation);

    const [subscribeModal, setSubscribeModal] = useState(false);
    const closeSubscribeModal = () => {
        fetchSubscriptions()
        setSubscribeModal(false);
    }

    const showSubscribeModal = () => {
        setSubscribeModal(true)
    }

    useEffect(() => {
        if (isFocused) {
            fetchSubscriptions()
        }
    }, [isFocused])

    return (
        <TabContainer title={mySubscriptionsPlans} backBtn>
            <View paddingH={15}>
                <Text marginV={20} size={20} bold>{myCurrentSubscriptionsPlans}</Text>
                {subscriptions?.length === 0 && <NoSubscription title={noSubscriptionPlanLabel} description={noSubscriptionPlanDescription} onPress={showSubscribeModal} />}
                {subscriptions?.length !== 0 &&
                    <>
                        {subscriptions?.map((sub, i) => {
                            const isPack = sub.subscriptionProduct?.type === "pack"
                            return (
                                <SubscriptionCard key={i} id={sub.subscriptionProduct?.id} title={isPack ? sub.subscriptionProduct?.title : sub.subscriptionProduct?.titleListItem} from={sub.dates.start.label} to={sub.endAtLabel} uri={isPack ? sub.subscriptionProduct?.packItems?.filter(pack => pack.isMag)[0].thumbnail?.urlHq : sub.subscriptionProduct?.thumbnail?.urlHq} onPress={() => { }} />
                            )
                        })}
                        <View marginV={20}>
                            <NoSubscription title={needMoreContent} onPress={showSubscribeModal} />
                        </View>
                    </>
                }
            </View>
            <SubscribeModal modal={subscribeModal} setModal={closeSubscribeModal} />
        </TabContainer>
    );
};

export default MembershipScreen;
