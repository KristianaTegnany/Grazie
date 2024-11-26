import React from 'react';
import routeName from '../routeName';

import { createStackNavigator } from '@react-navigation/stack';
import ChangeEmailScreen from 'screen/User/InfoPerso/ChangeEmail';
import ChangePasswordScreen from 'screen/User/InfoPerso/ChangePassword';
import InfoPersoScreen from 'screen/User/InfoPerso';
import NotificationScreen from 'screen/User/Notification';
import ProfileScreen from 'screen/User/Profile';
import ProfileTagsScreen from 'screen/User/Profile/ProfileTags';
import TravelPlace from 'screen/User/Profile/TravelScreen/Step/TravelPlace';
import TravelDate from 'screen/User/Profile/TravelScreen/Step/TravelDate';
import TravelScreen from 'screen/User/Profile/TravelScreen';
import ServicesList from 'screen/User/Services/ServicesList';
import ServiceCondition from 'screen/User/Services/ServiceItem/Step/ServiceCondition';
import ServiceContact from 'screen/User/Services/ServiceItem/Step/ServiceContact';
import ServiceCreneau from 'screen/User/Services/ServiceItem/Step/ServiceCreneau';
import ServiceDate from 'screen/User/Services/ServiceItem/Step/ServiceDate';
import ServiceDuration from 'screen/User/Services/ServiceItem/Step/ServiceDuration';
import ServiceResume from 'screen/User/Services/ServiceItem/Step/ServiceResume';
import ServicePlace from 'screen/User/Services/ServiceItem/Step/ServicePlace';
import ServiceItem from 'screen/User/Services/ServiceItem';
import OrdersScreen from 'screen/User/Services/Orders';
import OrderDetailScreen from 'screen/User/Services/Orders/detail';
import SecretScreen from 'screen/User/Secret';
import MembershipScreen from 'screen/User/Membership';

const Stack = createStackNavigator();

const UserStackScreen = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={routeName.user.profile.home} component={ProfileScreen} />
            <Stack.Screen name={routeName.user.profile.info} component={InfoPersoScreen} />
            <Stack.Screen name={routeName.user.profile.tags} component={ProfileTagsScreen} />
            <Stack.Screen name={routeName.user.profile.changeEmail} component={ChangeEmailScreen} />
            <Stack.Screen name={routeName.user.profile.changePassword} component={ChangePasswordScreen} />
            <Stack.Screen name={routeName.user.notification} component={NotificationScreen} />
            <Stack.Screen name={routeName.user.secret} component={SecretScreen} />
            <Stack.Screen name={routeName.user.membership} component={MembershipScreen} />
            <Stack.Screen name={routeName.user.travel.home} component={TravelScreen} />
            <Stack.Screen name={routeName.user.travel.date} component={TravelDate} />
            <Stack.Screen name={routeName.user.travel.place} component={TravelPlace} />

            <Stack.Screen name={routeName.user.service.home} component={ServicesList} />
            <Stack.Screen name={routeName.user.service.orders} component={OrdersScreen} />
            <Stack.Screen name={routeName.user.service.orderDetail} component={OrderDetailScreen} />
            <Stack.Screen name={routeName.user.service.condition} component={ServiceCondition} />
            <Stack.Screen name={routeName.user.service.contact} component={ServiceContact} />
            <Stack.Screen name={routeName.user.service.creneau} component={ServiceCreneau} />
            <Stack.Screen name={routeName.user.service.date} component={ServiceDate} />
            <Stack.Screen name={routeName.user.service.duration} component={ServiceDuration} />
            <Stack.Screen name={routeName.user.service.item} component={ServiceItem} />
            <Stack.Screen name={routeName.user.service.place} component={ServicePlace} />
            <Stack.Screen name={routeName.user.service.resume} component={ServiceResume} />
        </Stack.Navigator>
    );
};

export default UserStackScreen;
