import useAppNavigator from 'hooks/useAppNavigator';
import {useEffect, useState} from 'react';
import Toast from 'react-native-toast-message';
import { useDispatch } from 'react-redux';
import routeName from 'routes/routeName';
import Apollo from 'services/utils/apollo';
import {getDeviceLang, localeScreenText} from 'services/utils/defaultLocale';
import { updateIsLocale } from 'store/slice/app/appSlice';

type ILocal = 'fr' | 'it' | undefined;

export default function useLocaleCtr() {
  const navigator = useAppNavigator();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [lang, setLang] = useState<ILocal>();

  const [textWithLocale, setTextWithLocale] = useState(localeScreenText.fr);

  useEffect(() => {
    const newText = getTextTranslation(lang);
    setTextWithLocale(newText);
  }, [lang]);

  const setLangFr = () => {
    setLang('fr');
  };

  const setLangIt = () => {
    setLang('it');
  };

  const getTextTranslation = (l: ILocal) => {
    const local = l || getDeviceLang().substring(0, 2);
    if (localeScreenText.hasOwnProperty(local)) {
      return localeScreenText[local];
    }

    return localeScreenText.fr;
  };

  const onValidate = async () => {
    setLoading(true);
    Apollo.changeLang(lang === 'it');
    const error = await Apollo.getNoAuthDatas();
    if (error) {
      Toast.show({text2: error.message, type: 'error'});
    } else {
      dispatch(updateIsLocale(true));
      navigator.navigateScreen(routeName.onboarding.spash);
    }
    setLoading(false);
  };

  return {
    lang,
    textWithLocale,
    loading,
    setLangFr,
    setLangIt,
    onValidate,
  };
}
