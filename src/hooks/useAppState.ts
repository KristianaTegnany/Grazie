import React from "react";
import {AppState, AppStateStatus} from "react-native";

export const useAppState = () => {
  const [appState, setAppState] = React.useState<AppStateStatus>("active");
  React.useEffect(() => {
    const subscription = AppState.addEventListener("change", nextAppState =>
      setAppState(nextAppState),
    );
    return () => {
      subscription.remove();
    };
  }, []);

  return {
    appState,
  };
};
