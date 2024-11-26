import React from 'react';
import routeName from '../routeName';

import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import InspirationScreen from 'screen/Tab/Inspiration';

const Stack = createSharedElementStackNavigator();

const InspirationStackScreen = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={routeName.tab.inspiration.home} component={InspirationScreen} />
        </Stack.Navigator>
    );
};

export default InspirationStackScreen;
