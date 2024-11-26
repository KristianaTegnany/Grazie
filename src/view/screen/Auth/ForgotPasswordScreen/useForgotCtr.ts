import useAppNavigator from "hooks/useAppNavigator";
import routeName from "routes/routeName";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {forgotSchemaValidation} from "services/utils/validators";
import {useState} from "react";
import {UserService} from "services/applicatif/user/userService";
import {useDispatch} from "react-redux";
import {setAuth, setUser} from "store/slice/user/userSlice";
import UserInfo from "services/applicatif/user/type";
import AuthInfo, {PasswordCredential} from "services/applicatif/auth/type";
import Toast from "react-native-toast-message";

export default function useForgotCtr() {
  const [loading, setLoading] = useState<boolean>(false);
  const navigator = useAppNavigator();
  const dispatch = useDispatch();

  const {
    handleSubmit,
    control,
    formState: {errors},
  } = useForm<PasswordCredential>({
    resolver: yupResolver(forgotSchemaValidation),
  });

  const onSubmit = async (data: PasswordCredential) => {
    setLoading(true);
    dispatch(setUser({email: data.email} as UserInfo));
    UserService.passwordRecovery(data.email).then(result => {
      Toast.show({
        type: result.success ? "success" : "error",
        text2: result.message,
      });
      if (result.success) {
        goToCode(data.email, result.uuid);
      }
    }).finally(() => setLoading(false));
  };

  const goToCode = (email: string, uuid: string) => {
    dispatch(setAuth({current_user: {uuid, name: email}} as AuthInfo));
    navigator.navigateScreen(routeName.auth.code);
  };

  return {
    handleSubmit,
    errors,
    control,
    loading,
    setLoading,
    onSubmit,
  };
}
