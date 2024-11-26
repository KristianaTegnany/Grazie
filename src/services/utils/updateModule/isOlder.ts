function isOlder(currentVersion?: string, storeVersion?: string){
    const  current = currentVersion?.split('.')  || ['0', '0', '0'],
            store  = storeVersion?.split('.') || ['0', '0', '0'],
            cMajor = parseInt(current[0]),
            sMajor = parseInt(store[0])
  
    if(cMajor < sMajor){
      return true
    } else if(cMajor === sMajor) {
      const cMinor = current.length > 1 ? parseInt(current[1]) : 0,
      sMinor = store.length > 1 ? parseInt(store[1]) : 0
      if(cMinor < sMinor){
        return true
      } else if(cMinor === sMinor) {
        const cPatch = current.length > 2 ? parseInt(current[2]) : 0,
              sPatch = store.length > 2 ? parseInt(store[2]) : 0
        return cPatch < sPatch
      }
    }
    return false
}

export default isOlder