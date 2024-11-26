import useAppNavigator from 'hooks/useAppNavigator';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import routeName from 'routes/routeName';
import {rootState} from 'store/reducer';
import {updateMenuShown} from 'store/slice/app/appSlice';
import { logout } from 'store/slice/user/userSlice';

const useBackBtnCtr = () => {
  const dispatch = useDispatch();
  const navigator = useAppNavigator();

  const {menuShown} = useSelector((s: rootState) => s.appReducer.appDatas);

  const goBack = () => {
    if (menuShown === 1) {
      dispatch(updateMenuShown(true));
    }
    navigator.goBack();
  };

  const onLogout = () => {
    dispatch(logout());
    navigator.navigateScreen(routeName.auth.registerOrSignin);
  };

  useEffect(() => {
    if (menuShown === 1 && !navigator.isFocused) {
      dispatch(updateMenuShown(false));
    }
  }, [navigator.isFocused, menuShown]);

  return {
    canGoBack: navigator.canGoBack(),
    goBack,
    onLogout
  };
};

export default useBackBtnCtr;
