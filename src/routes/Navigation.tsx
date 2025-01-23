import { createNavigationContainerRef } from '@react-navigation/native';
import routeName from './routeName';
import store from 'store/store';
import { updateCarnet, updateMagSubscribe, updateSubscribe } from 'store/slice/app/appSlice';

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

export function navigateLink(link: string) {
    if (navigationRef.isReady()) {
        if(link.includes('/') && !['mag', 'notebook'].includes(link.split('/')[0])){
            let params: any = link.split('/')
            let path = params[0]
            const twoParams = params.length === 2
            const threeParams = params.length === 3
            if(link.includes('article/') && twoParams){
                params = { article : {id: params[1]}}
            }
            else if(link.includes('story/') && twoParams){
                params = {
                    id: parseInt(params[1]),
                    index: 0
                }
            }
            else if(link.includes('destination/') && twoParams){
                params = { detail: { id: params[1]}}
            }
            else if(link.includes('inspirations/') && threeParams){
                const secondPath = params[1]
                let index = 0
                switch(secondPath){
                    case 'envy':
                        index = 1;
                        break;
                    case 'duration':
                        index = 2;
                        break;
                    case 'region':
                        index = 3;
                        break;
                }
                params = { index, id: parseInt(params[2])}
                path = routeName.tab.inspiration.detail
            }
            // @ts-ignore
            navigationRef.navigate(path, params)
        }
        else {
            if(link.includes('membership')){
                // @ts-ignore
                navigationRef.navigate(routeName.user.base, {
                    screen: routeName.user.membership
                })
            }
            else if(link === 'subscribe'){
                store.dispatch(updateSubscribe(true))
            }
            else if(link.includes('mag/subscribe')){
                store.dispatch(updateMagSubscribe(true))
            }
            else if(link.includes('notebook/')){
                store.dispatch(updateCarnet(true))
            }
            else if(['travels', 'services'].includes(link)){
                // @ts-ignore
                navigationRef.navigate(routeName.user.base, {
                    screen: link
                })
            }
            else {
                navigationRef.navigate(link as never);
            }
        }
    }
}