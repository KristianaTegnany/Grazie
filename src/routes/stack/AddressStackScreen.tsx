import React from 'react';
import routeName from '../routeName';

import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import AddressScreen from 'screen/Tab/Address';

const Stack = createSharedElementStackNavigator();

const AddressStackScreen = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={routeName.tab.inspiration.home} component={AddressScreen} />
        </Stack.Navigator>
    );
};

export default AddressStackScreen;
