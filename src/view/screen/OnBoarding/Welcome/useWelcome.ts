import {useCallback, useEffect} from 'react';
import useAppNavigator from 'hooks/useAppNavigator';
import routeName from 'routes/routeName';
import Apollo from 'services/utils/apollo';
import { useDispatch } from 'react-redux';
import { updateIsWelcome } from 'store/slice/app/appSlice';

export default function useWelcome() {
  const navigator = useAppNavigator();
  const dispatch = useDispatch();

  useEffect(() => {
    Apollo.getAuthDatas();

    Apollo.getCgvDatas();
    Apollo.getPrivacyDatas();
    //Apollo.getCookiesDatas();
  }, []);

  const goToRegisterOrSignin = () => {
    dispatch(updateIsWelcome(true));
    navigator.navigateScreen(routeName.auth.registerOrSignin);
  }

  const goToCgv = () => navigator.navigateScreen(routeName.auth.cgv);
  const goToPrivacy = () => navigator.navigateScreen(routeName.auth.privacy);

  return {
    goToCgv,
    goToRegisterOrSignin,
    goToPrivacy,
  };
}
