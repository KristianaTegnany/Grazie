import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { changePasswordSchemaValidation } from 'services/utils/validators';
import { useState } from 'react';
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';
import { rootState } from 'store/reducer';
import { LoggerService } from 'services/applicatif/auth/loggerService';
import { useNavigation } from '@react-navigation/native';

type IChangePassword = {
    old_password: string;
    password: string;
    confirm_password: string;
}

export default function useChangePasswordCtr() {
    const {
        handleSubmit,
        control,
        formState: { errors },
        watch,
    } = useForm<IChangePassword>({
        resolver: yupResolver(changePasswordSchemaValidation),
    });
    const navigator = useNavigation();

    const [loading, setLoading] = useState<boolean>(false);

    const {
        translation: {
            editMyPassword,
            oldPassword,
            newPassword,
            confirmNewPassword,
            save
        }
    } = useSelector((state: rootState) => state?.userReducer?.persoInfosDatas);

    const onSubmit = async (data: IChangePassword) => {
        setLoading(true);
        UserService.changePassword(data.old_password, data.password)
            .then(result => {
                Toast.show({
                    type: result.success ? 'success' : 'error',
                    text2: result.message,
                });
                if (result.success) {
                    navigator.goBack()
                }
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return {
        editMyPassword,
        oldPassword,
        newPassword,
        confirmNewPassword,
        save,

        loading,

        handleSubmit,
        control,
        errors,
        onSubmit,
        watch,
    };
}
