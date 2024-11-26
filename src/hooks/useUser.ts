import { useSelector } from "react-redux";
import { rootState } from "store/reducer";
import Apollo from "services/utils/apollo";

export const useUser = () => {
  const subscriptions = useSelector(
    (state: rootState) => state.userReducer.userInfo.subscriptions,
  );

  const fetchSubscriptions = () => {
    return Apollo.getSubscription()
  }

  const isMag = subscriptions?.filter(sub => sub.subscriptionProduct?.isMag || sub.subscriptionProduct?.type === "pack").length !== 0
  const isPro  = subscriptions?.filter(sub => sub.subscriptionProduct?.isPro).length !== 0
  const isPremium = subscriptions?.filter(sub => sub.subscriptionProduct?.version === "1").length !== 0
  const isMagPack = isMag || subscriptions.filter(sub => sub.subscriptionProduct?.type === "pack").length !== 0
  
  const carnets = subscriptions?.filter(sub => !(sub.subscriptionProduct?.isMag || sub.subscriptionProduct?.isPro)).map(sub => {
    return sub.subscriptionProduct?.type === "pack" && sub.subscriptionProduct.packItems ? sub.subscriptionProduct?.packItems.filter(pack => !pack.isMag)[0] : sub.subscriptionProduct
  })
  const allowedRegions = carnets?.map(carnet => carnet?.regions.map(region => region.id)).flat(1)
  
  return {
    allowedRegions,
    carnets,
    hasMag: isMag || isPro || isPremium,
    hasPro: isPro || isPremium,
    isAllRegions: subscriptions?.filter(sub => sub.subscriptionProduct?.isAllRegions).length !== 0 || isPro || isPremium,
    isSubscribed: subscriptions?.length !== 0,
    isMag,
    isMagPack,
    isMap: carnets?.length !== 0 || isPro || isPremium,
    isPro,
    subscriptions,
    fetchSubscriptions
  };
};
