import React from 'react';
import { Text, View } from 'widget/Native';
import AppSwitch from 'widget/Form/AppSwitch';
import useNotificationCtr from './notificationCtr';
import PermissionCard from './PermissionCard';
import PageContainer from 'widget/Container/PageContainer';

const NotificationScreen = () => {

    const {
        manageNotifications,
        manageYourNotifications,
        notifyNewContentLabel,
        notifyOffersSubscriptionLabel,
        notifyInspirationsCommunityLabel,
        notifyNewsLabel,
        notifyOrderInfoLabel,

        notifyNewContent,
        notifyOffersSubscription,
        notifyInspirationsCommunity,
        notifyNews,
        notifyOrderInfo,

        updateNotifications,
    } = useNotificationCtr()

    const onChangeContent = () => updateNotifications('new_content', !notifyNewContent)
    const onChangeOffers = () => updateNotifications('offers_subscriptio', !notifyOffersSubscription)
    const onChangeInspirations = () => updateNotifications('inspirations_commu', !notifyInspirationsCommunity)
    const onChangeNews = () => updateNotifications('news', !notifyNews)
    const onChangeOrder = () => updateNotifications('order_info', !notifyOrderInfo)

    return (
        <PageContainer title={manageNotifications}>
            <View flex color='white' paddingT={30} paddingH={10}>
                <PermissionCard />
                <Text size={20} bold color='onSecondary'>
                    {manageYourNotifications}
                </Text>
                <View paddingT={20}>
                    <AppSwitch
                        title={notifyNewContentLabel}
                        value={notifyNewContent}
                        onChange={onChangeContent}
                    />
                    <AppSwitch
                        title={notifyOffersSubscriptionLabel}
                        value={notifyOffersSubscription}
                        onChange={onChangeOffers}
                    />
                    <AppSwitch
                        title={notifyInspirationsCommunityLabel}
                        value={notifyInspirationsCommunity}
                        onChange={onChangeInspirations}
                    />
                    <AppSwitch
                        title={notifyNewsLabel}
                        value={notifyNews}
                        onChange={onChangeNews}
                    />
                    <AppSwitch
                        title={notifyOrderInfoLabel}
                        value={notifyOrderInfo}
                        onChange={onChangeOrder}
                    />
                </View>
            </View>
        </PageContainer>
    );
};

export default NotificationScreen;
