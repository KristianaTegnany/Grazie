import React from 'react';
import routeName from './routeName';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MagStackScreen from './stack/MagStackScreen';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import BottomTabs from 'screen/Tab/widget/BottomTabs';
import ArticleScreen from 'screen/Tab/Mag/article';
import StoryScreen from 'screen/Tab/Mag/story';
import ChatScreen from 'screen/User/Chat';
import FavoriteStackScreen from './stack/FavoriteStackScreen';
import UserStackScreen from './stack/UserStackScreen';
import WhoGigiScreen from 'screen/Others/whoGigi';
import InspirationStackScreen from './stack/InspirationStackScreen';
import InspirationDetailScreen from 'screen/Tab/Inspiration/detail';
import InspirationDestinationScreen from 'screen/Tab/Inspiration/destination';
import FavoriteDetailScreen from 'screen/Tab/Favorite/detail';
import AddressCardScreen from 'screen/Tab/Address/card';
import AddressDetailScreen from 'screen/Tab/Address/detail';
import AddressStackScreen from './stack/AddressStackScreen';
import MapScreen from 'screen/Tab/Map';
import CgvScreen from 'screen/Others/cgv';
import PrivacyScreen from 'screen/Others/privacy';

const UserStack = createBottomTabNavigator();
const NormalStack = createSharedElementStackNavigator();

const TabNavigatorRoute = () => {
    return (
        <UserStack.Navigator
            tabBar={props => <BottomTabs {...props} />}
            screenOptions={{ headerShown: false, lazy: true }}>
            <UserStack.Screen name={routeName.tab.mag.base} component={MagStackScreen} />
            <UserStack.Screen
                name={routeName.tab.inspiration.base}
                component={InspirationStackScreen}
            />
            <UserStack.Screen
                name={routeName.tab.address.base}
                component={AddressStackScreen}
            />
            <UserStack.Screen
                name={routeName.tab.map.home}
                component={MapScreen}
            />
            <UserStack.Screen
                name={routeName.tab.favorite.base}
                component={FavoriteStackScreen}
            />
        </UserStack.Navigator>
    );
};

export default function TabRoute() {
    return (
        <NormalStack.Navigator
            screenOptions={{ headerShown: false }}>
            <NormalStack.Screen
                name={routeName.tab.base}
                component={TabNavigatorRoute}
            />
            <NormalStack.Screen
                name={routeName.tab.mag.article}
                component={ArticleScreen}
                sharedElements={route => {
                    const { article } = route.params;
                    return [`article.${article.id}.photo`];
                }}
            />
            <NormalStack.Screen name={routeName.tab.inspiration.detail} component={InspirationDetailScreen} />
            <NormalStack.Screen name={routeName.tab.inspiration.destination} component={InspirationDestinationScreen} sharedElements={route => {
                const { detail } = route.params;
                return [`inspiration.${detail.id}.photo`];
            }} />
            <NormalStack.Screen name={routeName.tab.address.detail} component={AddressDetailScreen} />
            <NormalStack.Screen name={routeName.tab.address.card} component={AddressCardScreen} sharedElements={route => {
                const { detail } = route.params;
                return [`address.${detail.id}.photo`];
            }} />
            <NormalStack.Screen name={routeName.tab.favorite.detail} component={FavoriteDetailScreen} />
            <NormalStack.Screen
                name={routeName.tab.mag.story}
                component={StoryScreen}
            />
            <NormalStack.Screen
                name={routeName.user.chat}
                component={ChatScreen}
            />
            <NormalStack.Screen
                name={routeName.user.base}
                component={UserStackScreen}
            />
            <NormalStack.Screen
                name={routeName.others.whoGigi}
                component={WhoGigiScreen}
            />
            <NormalStack.Screen
                name={routeName.others.cgv}
                component={CgvScreen}
            />
            <NormalStack.Screen
                name={routeName.others.privacy}
                component={PrivacyScreen}
            />
        </NormalStack.Navigator>
    );
}
