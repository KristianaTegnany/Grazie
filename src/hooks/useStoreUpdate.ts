import { useSelector } from "react-redux";
import { rootState } from "store/reducer";
import shouldUpdate from "services/utils/updateModule";
import { openURL } from "screen/Others/whoGigi";
import { Platform } from "react-native";
import Apollo from "services/utils/apollo";
import { getSystemName, getVersion } from "react-native-device-info";
import { LoggerService } from "services/applicatif/auth/loggerService";

const  useStoreUpdate = () => {

  const id = useSelector(
    (state: rootState) => state.userReducer.authInfo.current_user?.uid,
  );

  const checkForStoreUpdate = async () => {
    const res = await Apollo.checkIfOutdated(getVersion(), getSystemName())
      if(res?.appInfos?.isOutDated){
        const {canUpdate, newVersion} = await shouldUpdate();
        if(newVersion){
              if(canUpdate){
                LoggerService.logger({
                  user_id: id,
                  action: "show_force_update",
                })
                return true
              }
              else{
                LoggerService.logger({
                  user_id: id,
                  action: "check_update",
                  error: "New version available but not compatible with the device"
                })
              }
        }
      }
    return false
  }

  const goToStore = () => {
    const iosStoreURL = 'https://apps.apple.com/fr/app/grazie-gigi-secrets-ditalie/id1659486956',
    androidStoreURL = 'https://play.google.com/store/apps/details?id=fr.grazie.gigi'

    openURL(Platform.OS === 'ios' ? iosStoreURL : androidStoreURL)
    LoggerService.logger({
      user_id: id,
      action: "redirect_store_update",
    })
  }
  
  return {
      checkForStoreUpdate,
      goToStore
  }
}

export default useStoreUpdate;