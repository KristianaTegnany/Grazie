import { Platform } from 'react-native';
import * as DeviceInfo from 'react-native-device-info';
import shouldUpdate from 'services/utils/updateModule';
import * as fetchVersions from 'services/utils/updateModule/fetchVersions';

describe('test fetch store versions', () => {
  test('should get latest android versions', async () => {
    Platform.OS = 'android'
    const { appVersion, minOSVersion } = await fetchVersions.default()

    expect(appVersion).toBe("1.1.13")
    expect(minOSVersion).toBe("5.0")
  });

  test('should get latest ios versions', async () => {
    Platform.OS = 'ios'
    const { appVersion, minOSVersion } = await fetchVersions.default()
    expect(appVersion).toBe("1.3.1")
    expect(minOSVersion).toBe("13.4")
  });
})

describe('test should update', () => {
  test('should update true if new store version', async () => {
    Platform.OS = 'android'

    jest.spyOn(DeviceInfo, 'getVersion').mockReturnValue('1.1.11')
    jest.spyOn(DeviceInfo, 'getSystemVersion').mockReturnValue('11')

    jest.spyOn(fetchVersions, 'default').mockResolvedValue({
      appVersion: '1.1.12',
      minOSVersion: '11'
    })

    expect(await shouldUpdate()).toBeTruthy()
  });

  test('should update false if new store version but OS version < minOSVersion', async () => {
    Platform.OS = 'ios'

    jest.spyOn(DeviceInfo, 'getVersion').mockReturnValue('1.2.1')
    jest.spyOn(DeviceInfo, 'getSystemVersion').mockReturnValue('13')

    jest.spyOn(fetchVersions, 'default').mockResolvedValue({
      appVersion: '1.3.1',
      minOSVersion: '13.4'
    })

    expect(await shouldUpdate()).toBeFalsy()
  });
})
