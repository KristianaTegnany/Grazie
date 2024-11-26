import {NativeModules, Platform} from 'react-native';

export const localeScreenText: Record<string, Record<string, string>> = {
  fr: {
    title: 'Choisissez votre langue',
    fr: 'Français',
    it: 'Italien',
    validate: 'Valider',
  },
  en: {
    title: 'Choose your language',
    fr: 'French',
    it: 'Italian',
    validate: 'Confirm',
  },
  de: {
    title: 'Wählen Sie Ihre Sprache',
    fr: 'Französisch',
    it: 'Italienisch',
    validate: 'Bestätigen',
  },
  it: {
    title: 'Selezionare la vostra lingua',
    fr: 'Francese',
    it: 'Italiano',
    validate: 'Confermare',
  },
};

export const getDeviceLang = (): string => {
  return Platform.OS === 'ios'
    ? NativeModules.SettingsManager.settings.AppleLocale ||
        NativeModules.SettingsManager.settings.AppleLanguages[0] // iOS 13
    : NativeModules.I18nManager.localeIdentifier;
};
