import SecureStorage from '@react-native-async-storage/async-storage';
import { PermissionsAndroid, Platform } from 'react-native';
import ReactNativeBlobUtil from 'react-native-blob-util'
import Share from 'react-native-share'
import { asyncStorage } from './constants';
import { isAndroid } from './device';

async function requestStoragePermission() {
  if(isAndroid){
    try {
       await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
      );
    } catch (err) {
      console.warn(err);
    }
  }
}

export const downloadFile = async ({fileName, source}: {fileName: string, source: string}) => {
  await requestStoragePermission()
  const dirs = ReactNativeBlobUtil.fs.dirs;
  const token = await SecureStorage.getItem(asyncStorage.app_token);
      
  ReactNativeBlobUtil.config({
    fileCache: true,
    appendExt: 'pdf',
    path: `${dirs.DocumentDir}/${fileName}`,
    addAndroidDownloads: {
      useDownloadManager: true,
      notification: true,
      title: fileName,
      mime: 'application/pdf',
    },
  })
    .fetch('GET', source, {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/pdf',
    })
    .then((res) => {
      // in iOS, we want to save our files by opening up the saveToFiles bottom sheet action.
      // whereas in android, the download manager is handling the download for us.
      if (Platform.OS === 'ios') {
        const filePath = res.path();
        let options = {
          type: 'application/pdf',
          url: filePath,
          saveToFiles: true,
        };
        Share.open(options)
          .then((resp) => console.log(resp))
          .catch((err) => console.log(err));
      }
    })
    .catch((err) => console.log('BLOB ERROR -> ', err));
};
