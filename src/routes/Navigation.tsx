import { createNavigationContainerRef } from '@react-navigation/native';
import routeName from './routeName';
import store from 'store/store';
import { resetRedirect, setRedirect, updateCarnet, updateMagSubscribe, updatePrivate, updateSubscribe } from 'store/slice/app/appSlice';

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

export function navigateLink(link: string, isRedirect?: boolean) {
    if (navigationRef.isReady()) {
        const subscriptions = store.getState().userReducer.userInfo.subscriptions
        const isMag = subscriptions?.filter(sub => sub.subscriptionProduct?.isMag || sub.subscriptionProduct?.type === "pack").length !== 0
        const isPro  = subscriptions?.filter(sub => sub.subscriptionProduct?.isPro).length !== 0
        const isPremium = subscriptions?.filter(sub => sub.subscriptionProduct?.version === "1").length !== 0
        const carnets = subscriptions?.filter(sub => !(sub.subscriptionProduct?.isMag || sub.subscriptionProduct?.isPro)).map(sub => {
            return sub.subscriptionProduct?.type === "pack" && sub.subscriptionProduct.packItems ? sub.subscriptionProduct?.packItems.filter(pack => !pack.isMag)[0] : sub.subscriptionProduct
          })
        const allowedRegions = carnets?.map(carnet => carnet?.regions.map(region => region.id)).flat(1)
        const hasMag = isMag || isPro || isPremium
        const hasAllRegions = subscriptions?.filter(sub => sub.subscriptionProduct?.isAllRegions).length !== 0 || isPro || isPremium

        let params: any = link.split('/')
        let path = params[0]
        const twoParams = params.length === 2
        const threeParams = params.length === 3
          
        if(link.includes('/') && !['mag', 'notebook', 'story'].includes(link.split('/')[0])){
            if(link.includes('article/') && twoParams){
                params = { article : {id: params[1]}}
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
            else if(link.includes('story/') && twoParams){
                params = {
                    id: parseInt(params[1]),
                    index: 0
                }
                if(!hasMag){
                    store.dispatch(setRedirect(link))
                    store.dispatch(updatePrivate(true))
                }
                else {
                    // @ts-ignore
                    navigationRef.navigate(path, params)
                }
            }
            else if(link === 'subscribe'){
                store.dispatch(updateSubscribe(true))
            }
            else if(link.includes('mag/subscribe')){
                store.dispatch(updateMagSubscribe(true))
            }
            else if(link.includes('notebook/')){
                const id = link.split('/')[1]
                const subscriptionBO = store.getState().appReducer.subscriptionsBO
                const product = subscriptionBO.find(sub => sub.id == id)
                if(product){
                    if(!link.includes('subscribe')){
                        if(hasAllRegions || allowedRegions?.includes(product.id)){
                            //@ts-ignore
                            navigationRef.navigate(routeName.tab.address.detail, {
                                id: product.regions[0].id,
                                title: product.title,
                                explore: product.regionExploreNotebookLabel,
                                filterAllUri: product.filterAllThumbnail?.urlLq,
                            })
                        }
                        else {
                            navigateLink(link + '/subscribe')
                            store.dispatch(setRedirect(link))
                        }
                    }
                    else
                        store.dispatch(updateCarnet(product))
                }
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
    if(isRedirect){
        store.dispatch(resetRedirect())
    }
}