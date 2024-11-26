import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { rootState } from 'store/reducer';
import Apollo from 'services/utils/apollo';
import useAppNavigator from 'hooks/useAppNavigator';
import UserInfo from 'services/applicatif/user/type';
import Toast from 'react-native-toast-message';
import { UserService } from 'services/applicatif/user/userService';

export default function useNotificationCtr() {

    const navigator = useAppNavigator()

    const {
        translation: {
            manageNotifications,
            manageYourNotifications,
            notifyNewContentLabel,
            notifyOffersSubscriptionLabel,
            notifyInspirationsCommunityLabel,
            notifyNewsLabel,
            notifyOrderInfoLabel,
            getSecretsGigiTitle,
            getSecretsGigiEmailLabel
        }
    } = useSelector((state: rootState) => state?.appReducer.notificationDatas);

    const {
        notifyNewContent,
        notifyOffersSubscription,
        notifyInspirationsCommunity,
        notifyNews,
        notifyOrderInfo,
        notifyEmail
    } = useSelector((state: rootState) => state?.userReducer.userInfo);

    useEffect(() => {
        Apollo.getNoficationDatas()
    }, [])

    useEffect(() => {
        if (navigator.isFocused) {
            Apollo.getAccount()
        }
    }, [navigator.isFocused])


    const updateNotifications = (key: string, value: boolean) => {
        UserService.updateAccount({ notifications: { [key]: value } } as UserInfo).then(result => {

            Toast.show({
                type: result.success ? 'success' : 'error',
                text2: result.message,
            });
            if (result.success) {
                Apollo.getAccount()
            }
        })
    }

    return {
        manageNotifications,
        manageYourNotifications,
        notifyNewContentLabel,
        notifyOffersSubscriptionLabel,
        notifyInspirationsCommunityLabel,
        notifyNewsLabel,
        notifyOrderInfoLabel,
        getSecretsGigiTitle,
        getSecretsGigiEmailLabel,

        notifyNewContent,
        notifyOffersSubscription,
        notifyInspirationsCommunity,
        notifyNews,
        notifyOrderInfo,
        notifyEmail,

        updateNotifications,
    };
}
