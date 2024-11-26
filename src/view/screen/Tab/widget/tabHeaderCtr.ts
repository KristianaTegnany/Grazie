import useAppNavigator from "hooks/useAppNavigator";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {rootState} from "store/reducer";
import {updateMenuShown} from "store/slice/app/appSlice";

const useTabHeaderCtr = (withBackBtn?: boolean) => {
  const dispatch = useDispatch();
  const navigator = useAppNavigator();

  const {menuShown} = useSelector((s: rootState) => s.appReducer.appDatas);

  const goBack = () => {
    if (withBackBtn) {
      if (menuShown === 1) {
        dispatch(updateMenuShown(true));
      }
    }
    navigator.goBack();
  };

  useEffect(() => {
    if (withBackBtn && menuShown === 1 && !navigator.isFocused) {
      dispatch(updateMenuShown(false));
    }
  }, [navigator.isFocused, menuShown]);

  return {
    goBack,
  };
};

export default useTabHeaderCtr;
