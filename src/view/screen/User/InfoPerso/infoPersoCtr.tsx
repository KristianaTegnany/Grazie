import { useForm } from 'react-hook-form';
import { editProfilValidationSchema } from 'services/utils/validators';
import { useEffect, useState } from 'react';
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';
import { rootState } from 'store/reducer';
import ImagePicker from 'react-native-image-crop-picker';
import { setUser } from 'store/slice/user/userSlice';
import { UserPersonalInfo } from 'services/applicatif/auth/type';
import UserInfo from 'services/applicatif/user/type';
import Apollo from 'services/utils/apollo';
import dayjs from 'dayjs';
import useAppNavigator from 'hooks/useAppNavigator';
import { ICountry } from './BottomModalCountries';
import { yupResolver } from '@hookform/resolvers/yup';
import { UserService } from 'services/applicatif/user/userService';

export default function useInfoPersoCtr() {
    const {
        handleSubmit,
        control,
        formState: { errors },
        setValue,
    } = useForm<UserPersonalInfo>({
        resolver: yupResolver(editProfilValidationSchema),
    });
    const dispatch = useDispatch();
    const navigator = useAppNavigator();

    const user = useSelector((state: rootState) => state?.userReducer.userInfo);

    const {
        cancelDeleteAccountSaveButtonLabel,
        deleteAccountTitle,
        deleteAccountMessage,
        deleteAccountSaveButtonLabel,
        deleteMyAccountTitle,
        name,
        firstname,
        dateBirth,
        phoneNumber,
        email,
        password,
        editEmail,
        editPassword,
        changeProfilePicture,
        personnalInformation,
        cancel,
        save,
        validate,

        postalAddressInvoicing,
        addressStreetPlaceholder,
        addressCityPlaceholder,
        addressZipcodePlaceholder,
        addressCountryPlaceholder
    } = useSelector((state: rootState) => state?.userReducer.persoInfosDatas.translation);

    const { godfatherLabel, godfatherNotExist } = useSelector((state: rootState) => state.authReducer.authDatas.translation);

    const [loading, setLoading] = useState<boolean>(false);
    const [loadingConfirm, setLoadingConfirm] = useState<boolean>(false);
    const [loadingDelete, setLoadingDelete] = useState<boolean>(false);
    const [modalBottom, setModalBottom] = useState<boolean>(false);
    const [modalConfirm, setModalConfirm] = useState<boolean>(false);
    const [country, setCountry] = useState<ICountry>();
    const [countries, setCountries] = useState<ICountry[]>([]);
    const [modalCountry, setModalCountry] = useState<boolean>(false);

    const showPicker = () => setModalBottom(true)

    useEffect(() => {
        setValue('last_name', user?.lastName || '');
        setValue('email', user?.email || '');
        setValue('first_name', user?.firstName || '');
        setValue('birthday', (typeof user?.birthdate !== 'string' && user?.birthdate?.label) || '');
        setValue('mobile_phone', user?.phoneNumber || '');
        //setValue('godfather', user?.godfather?.email || '');
        //setValue('country_code', user?.addressCountryCode || '');
        setValue('zip_code', user?.addressZipcode || '');
        setValue('city', user?.addressCity || '');
        setValue('street', user?.addressStreet || '');
    }, [user, setValue]);

    useEffect(() => {
        if (navigator.isFocused) {
            Apollo.getAccount()
            Apollo.getCountries().then(data => {
                if (data.countries?.items)
                    setCountries(data.countries.items)
            })
        }
    }, [navigator.isFocused])

    useEffect(() => {
        if (user.addressCountryCode && !country && countries.length > 0) {
            setCountry(countries.filter(country => country.code === user.addressCountryCode)[0])
        }
    }, [user, country, countries.length])

    const onSubmit = async (data: UserPersonalInfo) => {
        setLoading(true);
        /*if (data.godfather) {
            const res = await UserService.findAccount({ email: data.godfather });
            if (!res.success) {
                Toast.show({ text2: godfatherNotExist, type: 'error' });
                setLoading(false);
                return;
            }
        }*/
        const userInfo = {
            firstName: data.first_name,
            lastName: data.last_name,
            phoneNumber: data.mobile_phone,
            birthdate: data.birthday ? dayjs(data.birthday, 'DD/MM/YYYY').format('YYYY-MM-DD') : undefined,
            addressZipcode: data.zip_code,
            addressCity: data.city,
            addressStreet: data.street,
            addressCountryCode: country?.code,
            //godfather_email: data.godfather
        }

        UserService.updateAccount(userInfo as UserInfo)
            .then(result => {
                Toast.show({
                    type: result.success ? 'success' : 'error',
                    text2: result.message,
                });
                if (result.success) {
                    dispatch(setUser({
                        ...userInfo, birthdate: {
                            label: userInfo.birthdate ? dayjs(userInfo.birthdate, 'YYYY-MM-DD').format('DD/MM/YYYY') : ''
                        }
                    } as UserInfo));
                }
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const updateProfilePicture = (result: any) => {
        setLoading(true)
        UserService.updateAccount({ profile_picture: `data:${result.mime};base64,${result.data}` } as UserInfo).then(async result => {
            Toast.show({
                type: result.success ? 'success' : 'error',
                text2: result.message,
            });
            if (result.success) {
                await Apollo.getAccount()
            }
            setLoading(false);
        }).catch(function () {
            setLoading(false);
        });
    }

    const pickImage = async () => {
        const result = await ImagePicker.openPicker({
            mediaType: 'photo',
            includeBase64: true,
            width: 400,
            height: 400,
            cropping: true
        });
        if (result?.data) {
            updateProfilePicture(result)
        }
        setModalBottom(false);
    };

    const openCamera = async () => {
        const result = await ImagePicker.openCamera({
            mediaType: 'photo',
            includeBase64: true,
            width: 400,
            height: 400,
            cropping: true
        });
        if (result?.data) {
            updateProfilePicture(result)
        }
        setModalBottom(false);
    };

    const cancelDeletingAccount = async () => {
        setLoadingDelete(true)
        const res = await UserService.cancelDeletingAccount(user?.email)
        dispatch(setUser({ isScheduledDeletion: false } as UserInfo))
        Toast.show({ text2: res.message })
        setLoadingDelete(false)
    }

    const deletingAccount = async () => {
        setLoadingConfirm(true)
        const res = await UserService.deleteAccount(user?.email)
        dispatch(setUser({ isScheduledDeletion: true } as UserInfo))
        Toast.show({ text2: res.message })
        setLoadingConfirm(false)
        setModalConfirm(false)
    }

    return {
        cancelDeleteAccountSaveButtonLabel,
        deleteAccountTitle,
        deleteAccountMessage,
        deleteAccountSaveButtonLabel,
        deleteMyAccountTitle,
        name,
        firstname,
        dateBirth,
        phoneNumber,
        email,
        password,
        editEmail,
        editPassword,
        changeProfilePicture,
        godfatherLabel,
        personnalInformation,
        myEmail: user?.email,
        cancel,
        isScheduledDeletion: user?.isScheduledDeletion,
        save,
        validate,

        postalAddressInvoicing,
        addressStreetPlaceholder,
        addressCityPlaceholder,
        addressZipcodePlaceholder,
        addressCountryPlaceholder,

        cancelDeletingAccount,
        deletingAccount,
        handleSubmit,
        control,
        country,
        countries,
        errors,
        image: user.profilePicture?.urlLq,
        onSubmit,
        loading,
        loadingConfirm,
        loadingDelete,
        modalBottom,
        modalConfirm,
        modalCountry,
        pickImage,
        setCountry,
        setModalBottom,
        setModalConfirm,
        setModalCountry,
        openCamera,
        setValue,
        showPicker,
    };
}
