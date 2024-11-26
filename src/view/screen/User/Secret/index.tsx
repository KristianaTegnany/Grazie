import React from 'react';
import { Text, View } from 'widget/Native';
import AppSwitch from 'widget/Form/AppSwitch';
import PageContainer from 'widget/Container/PageContainer';
import useNotificationCtr from '../Notification/notificationCtr';

const SecretScreen = () => {

    const {
        notifyEmail,
        getSecretsGigiTitle,
        getSecretsGigiEmailLabel,

        updateNotifications,
    } = useNotificationCtr()

    const onChange = () => updateNotifications('email', !notifyEmail)

    return (
        <PageContainer title={getSecretsGigiTitle}>
            <View flex color='white' paddingT={30} paddingH={10}>
                <Text size={20} bold color='onSecondary'>
                    {getSecretsGigiTitle}
                </Text>
                <View paddingT={20}>
                    <AppSwitch
                        title={getSecretsGigiEmailLabel}
                        value={notifyEmail}
                        onChange={onChange}
                    />
                </View>
            </View>
        </PageContainer>
    );
};

export default SecretScreen;
