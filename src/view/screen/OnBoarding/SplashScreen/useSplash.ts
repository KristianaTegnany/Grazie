import {useCallback, useEffect, useState} from 'react';
import useAppNavigator from 'hooks/useAppNavigator';
import routeName from 'routes/routeName';
import { updateIsSplash } from 'store/slice/app/appSlice';
import { useDispatch } from 'react-redux';

export default function useSplash() {
  const [duration, setDuration] = useState<number>(0);

  const navigator = useAppNavigator();
  const dispatch = useDispatch();

  const goToNextScreen = useCallback(() => {
    dispatch(updateIsSplash(true));
    return navigator.navigateScreen(routeName.onboarding.screen1);
  }, [navigator]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (duration > 0 && navigator.isFocused) {
      timer = setTimeout(goToNextScreen, duration);
    }
    return () => clearTimeout(timer);
  }, [duration, navigator, goToNextScreen]);

  return {
    goToNextScreen,
    setDuration,
  };
}
