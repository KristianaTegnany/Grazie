import React from 'react';
import MagScreen from 'screen/Tab/Mag';
import routeName from '../routeName';

import { createSharedElementStackNavigator } from 'react-navigation-shared-element';

const Stack = createSharedElementStackNavigator();

const MagStackScreen = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={routeName.tab.mag.home} component={MagScreen} />
        </Stack.Navigator>
    );
};

export default MagStackScreen;
