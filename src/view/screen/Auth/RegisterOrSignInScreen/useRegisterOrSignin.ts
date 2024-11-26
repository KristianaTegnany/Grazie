import useAppNavigator from 'hooks/useAppNavigator';
import routeName from 'routes/routeName';

export default function useRegisterOrSignin() {
  const navigator = useAppNavigator();
  
  const goToLogin = () => navigator.navigateScreen(routeName.auth.login);

  const goToRegister = () => navigator.navigateScreen(routeName.auth.signup);

  return {
    isFocused: navigator.isFocused,
    goToLogin,
    goToRegister,
  };
}
