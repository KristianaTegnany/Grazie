import Toast from "react-native-toast-message";
import useAppNavigator from "hooks/useAppNavigator";
import routeName from "routes/routeName";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {newpasswordSchemaValidation} from "services/utils/validators";
import {NewPasswordInfo} from "services/applicatif/auth/type";
import {useState} from "react";
import {UserService} from "services/applicatif/user/userService";
import {useSelector} from "react-redux";
import {rootState} from "store/reducer";

export default function useNewCtr() {
  const [loading, setLoading] = useState<boolean>(false);
  const navigator = useAppNavigator();
  const {code} = navigator.getParams<{code: string}>();

  const {
    handleSubmit,
    control,
    formState: {errors},
  } = useForm<NewPasswordInfo>({
    resolver: yupResolver(newpasswordSchemaValidation),
  });

  const uuid = useSelector(
    (state: rootState) => state.userReducer.authInfo.current_user?.uuid,
  );

  const onSubmit = async (data: NewPasswordInfo) => {
    setLoading(true);
    UserService.passwordSet(data.password, code, uuid!)
      .then(result => {
        Toast.show({
          type: result.success ? "success" : "error",
          text2: result.message,
        });
        if (result.success) {
          goToLogin();
        }
      })
      .catch(e => {
        Toast.show({
          type: "error",
          text2: e,
        });
      }).finally(() => setLoading(false));
  };

  const goToLogin = () => {
    navigator.navigateScreen(routeName.auth.login);
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
