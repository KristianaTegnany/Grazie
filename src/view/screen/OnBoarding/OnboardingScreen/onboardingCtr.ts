import useAppNavigator from 'hooks/useAppNavigator';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import routeName from 'routes/routeName';
import {rootState} from 'store/reducer';
import { updateIsOnBoarding } from 'store/slice/app/appSlice';

export default function useOnboardingCtr() {
  const navigator = useAppNavigator();
  const dispatch = useDispatch();
  
  const {
    onboardingV2Slide1Title,
    onboardingV2Slide1Text,
    onboardingV2Slide2Title,
    onboardingV2Slide3Title,
    onboardingV2Slide3Text
  } = useSelector(
    (state: rootState) => state.authReducer.noAuthDatas.translation,
  );


  const {next, startBtn} = useSelector(
    (state: rootState) => state.authReducer.noAuthDatas.translation,
  );

  const [step, setStep] = useState<number>(0);

  const goToWelcome = () => {
    dispatch(updateIsOnBoarding(true));
    return navigator.navigateScreen(routeName.auth.welcome);
  };

  return {
    datas: [{title: onboardingV2Slide1Title, description: onboardingV2Slide1Text}, {title: onboardingV2Slide2Title}, {title: onboardingV2Slide3Title, description: onboardingV2Slide3Text}],
    buttons: {
      next,
      startBtn,
    },
    lastStep: 3,
    step,
    setStep,
    goToWelcome,
  };
}
