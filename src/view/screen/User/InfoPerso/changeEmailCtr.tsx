import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { changeEmailSchemaValidation } from 'services/utils/validators';
import { useState } from 'react';
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';
import { rootState } from 'store/reducer';
import { LoggerService } from 'services/applicatif/auth/loggerService';
import { setAuth, setUser } from 'store/slice/user/userSlice';
import AuthInfo from 'services/applicatif/auth/type';
import UserInfo from 'services/applicatif/user/type';

type IChangeEmail = {
    email: string;
    confirm_email: string;
}

export default function useChangeEmailCtr() {
    const {
        handleSubmit,
        control,
        formState: { errors },
        watch,
    } = useForm<IChangeEmail>({
        resolver: yupResolver(changeEmailSchemaValidation),
    });
    const dispatch = useDispatch();

    const [loading, setLoading] = useState<boolean>(false);
    const [modalCode, setModalCode] = useState(false)

    const {
        translation: {
            editMyEmail,
            newEmail,
            confirmNewEmail,
            saveNewEmail
        }
    } = useSelector((state: rootState) => state?.userReducer?.persoInfosDatas);

    const onSubmit = async (data: IChangeEmail) => {
        setLoading(true);
        UserService.changeEmail(data.email)
            .then(result => {
                if (!result.success)
                    Toast.show({
                        type: result.success ? 'success' : 'error',
                        text2: result.message,
                    });
                else {
                    //console.log(result)
                    dispatch(setUser({ temp_email: data.email } as UserInfo));
                    dispatch(setAuth({ current_user: { uuid: result.uuid } } as AuthInfo));
                    setModalCode(true)
                }
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return {
        editMyEmail,
        newEmail,
        confirmNewEmail,
        saveNewEmail,

        loading,
        modalCode,

        setModalCode,

        handleSubmit,
        control,
        errors,
        onSubmit,
        watch,
    };
}
