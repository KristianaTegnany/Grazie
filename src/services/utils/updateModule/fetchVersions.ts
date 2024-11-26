import { Platform } from "react-native";

const fetchVersions = async () => {
    const isOS = Platform.OS === 'ios'
    const response = await fetch(isOS? 'https://apps.apple.com/fr/app/grazie-gigi-secrets-ditalie/id1659486956' : 'https://play.google.com/store/apps/details?id=fr.grazie.gigi&hl=en&gl=us').then((r) => {
      if (r.status === 200) {
        return r.text();
      }
      throw new Error('storeURL is invalid.');
    })
  
    const minOSVersion = (isOS? response.match(/minimumOSVersion\\":\\"((\d+\.)+\d+)\\"/) : response.match(/\[\[\[\d+,"((\d+\.)+\d+)"\]\]\]/))?.at(1);
    const appVersion = (isOS? response.match(/\{\\"versionDisplay\\":\\"((\d+\.)+\d+)\\"/) : response.match(/\[\[\[['"]((\d+\.)+\d+)['"]\]\]/))?.at(1);
  
    return {
      minOSVersion,
      appVersion
    }
}

export default fetchVersions