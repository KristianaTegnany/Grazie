import React from 'react';
import routeName from '../routeName';

import { createStackNavigator } from '@react-navigation/stack';
import FavoriteScreen from 'screen/Tab/Favorite';

const Stack = createStackNavigator();

const FavoriteStackScreen = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={routeName.tab.favorite.home} component={FavoriteScreen} />
        </Stack.Navigator>
    );
};

export default FavoriteStackScreen;
