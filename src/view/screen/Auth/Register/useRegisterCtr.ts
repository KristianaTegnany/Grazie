import useAppNavigator from "hooks/useAppNavigator";
import routeName from "routes/routeName";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {registerValidationSchema} from "services/utils/validators";
import {useState} from "react";
import {AuthService} from "services/applicatif/auth/authService";
import Toast from "react-native-toast-message";
import {useDispatch} from "react-redux";
import {setAuth, setUser} from "store/slice/user/userSlice";
import UserInfo from "services/applicatif/user/type";
import AuthInfo, {UserInfoRegister} from "services/applicatif/auth/type";

export default function useRegisterCtr() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [modalCode, setModalCode] = useState(false);
  const navigator = useAppNavigator();

  const {
    handleSubmit,
    watch,
    control,
    formState: {errors},
  } = useForm<UserInfoRegister>({
    resolver: yupResolver(registerValidationSchema),
  });

  const login = () => navigator.navigateScreen(routeName.auth.login);

  const onSubmit = async (data: UserInfoRegister) => {
    setLoading(true);

    AuthService.registerNew(
      data.email,
      data.password,
      data.notification,
      data.newsletter,
    )
      .then(async result => {
        //console.log(JSON.stringify(result));
        if (!result.codeError || result.codeError !== 10) {
          dispatch(
            setUser({email: data.email, password: data.password} as UserInfo),
          );
          setModalCode(true);
        }
        if (result.uuid) {
          dispatch(setAuth({current_user: {uuid: result.uuid}} as AuthInfo));
        }

        if (!result.success && result.codeError !== 25) {
          Toast.show({
            type: "error",
            text2: result.message,
          });
        }
        setLoading(false);
      })
      .catch(e => {
        Toast.show({
          type: "error",
          text2: e,
        });
        setLoading(false);
      });
  };

  return {
    login,
    handleSubmit,
    errors,
    onSubmit,
    watch,
    control,
    loading,
    navigator,
    modalCode,
    setModalCode,
  };
}
