import { getSystemVersion, getVersion } from "react-native-device-info"
import fetchVersions from "./fetchVersions"
import isOlder from "./isOlder"

const shouldUpdate = async () => {
    const {minOSVersion, appVersion} = await fetchVersions()  
    //const {minOSVersion, appVersion} = {minOSVersion: '5.0', appVersion: '1.3.7'}
    return {
        newVersion: isOlder(getVersion(), appVersion) && appVersion,
        canUpdate: !isOlder(getSystemVersion(), minOSVersion)
    }
}

export default shouldUpdate