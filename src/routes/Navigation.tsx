import { StackActions, createNavigationContainerRef } from '@react-navigation/native';
import routeName from './routeName';

export const navigationRef = createNavigationContainerRef()

export function resetTabNavigation() {
    if (navigationRef.isReady()) {
        navigationRef.reset({
            index: 0,
            routes: [{ name: routeName.tab.mag.home }],
        })
        navigate(routeName.tab.mag.home)
    }
}

export function navigate(name: string, params?: any) {
    if (navigationRef.isReady()) {
        // @ts-ignore
        navigationRef.navigate(name, params)
    }
}