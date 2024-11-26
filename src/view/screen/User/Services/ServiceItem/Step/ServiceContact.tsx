/* eslint-disable react-native/no-inline-styles */
import useAppNavigator from 'hooks/useAppNavigator';
import React, { useCallback, useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, Button, Input } from 'widget/Native';
import routeName from 'routes/routeName';
import colors from 'themes/colors';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { stepStyles } from './styles';
import PageContainer from 'widget/Container/PageContainer';
import { useDispatch, useSelector } from 'react-redux';
import { rootState } from 'store/reducer';
import { service } from 'services/utils/constants';
import { setServiceSteps } from 'store/slice/user/userSlice';
import { ServiceSteps } from 'store/slice/user/type';

type IProps = {
  isModal?: boolean;
};

const ServiceContact = ({ isModal }: IProps) => {
  const appNavigator = useAppNavigator();
  const dispatch = useDispatch();

  const params: { title: string; type: string; } = appNavigator.getParams();

  const {
    orderContactMethodLabel,
    orderPhoneNumberLabel,
    next
  } = useSelector((state: rootState) => state.userReducer.serviceDatas.translation)

  const {
    contactType,
    phoneCode,
    phoneNumber,
  } = useSelector((state: rootState) => state.userReducer.serviceSteps);

  const phoneContactTypes = useSelector((state: rootState) => state.userReducer.serviceDatas.phoneContactTypes?.items)

  const [becalledBy, setBecalledBy] = useState(contactType);
  const [code, setCode] = useState(phoneCode);
  const [number, setNumber] = useState(phoneNumber);
  const [phoneError, setPhoneError] = useState(phoneNumber.length < (phoneNumber[0] === '0' ? 10 : 9));

  const saveNumber = (number: string) => {
    dispatch(setServiceSteps({
      phoneNumber: number
    } as ServiceSteps))
  }

  const onChangeNumber = (text: string) => {
    if (!text || (text.length < (text[0] === '0' ? 10 : 9))) {
      setPhoneError(true)
    }
    else {
      saveNumber(text)
      setPhoneError(false)
    }
    setNumber(text.replace(/^00/, "0"))
  }

  const onChangeCode = (code: string) => {
    setCode(code)
  }

  function saveContactType(contactType: { id: string, label: string }) {
    dispatch(setServiceSteps({
      contactType
    } as ServiceSteps))
  }

  useEffect(() => {
    if (phoneContactTypes.length === 1) {
      setBecalledBy(phoneContactTypes[0])
    }
  }, [phoneContactTypes])

  useEffect(() => {
    saveContactType(becalledBy)
  }, [becalledBy])

  useEffect(() => {
    dispatch(setServiceSteps({
      phoneCode: code
    } as ServiceSteps))
  }, [code])

  return (
    <PageContainer noHeader={isModal} title={params?.title} bottomContent={
      !isModal &&
      <Button
        disabled={phoneError}
        marginT={20}
        marginB={20}
        text={next}
        onPress={() => {
          if (!becalledBy.id && phoneContactTypes.length > 0) {
            saveContactType(phoneContactTypes[0]);
          }
          appNavigator.navigateScreen(
            params.type === service.SC
              ? routeName.user.service.duration
              : routeName.user.service.creneau,
            {
              title: params.title,
              type: params.type
            },
          )
        }}
      />
    }>
      <Text bold size={22} color='onSecondary' marginT={20}>{orderContactMethodLabel}</Text>
      <View marginT={30}>
        {phoneContactTypes?.map((contactType, i) =>
          <TouchableOpacity key={i} row iCenter color={becalledBy.id === contactType.id ? 'secondary' : 'quartenary'} padding={15} border={10} marginB={15}
            onPress={() => setBecalledBy(contactType)}>
            <FontAwesome5Icon
              name={i === 0 ? "whatsapp" : "mobile-alt"}
              size={25}
              style={stepStyles.callBtn}
              color={colors.black}
            />
            <Text size={14} color='onSecondaryDark' bold={becalledBy.id === contactType.id}>
              {contactType.label}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <View>
        <Text size={12} color='onSecondaryDark' marginT={10}>{orderPhoneNumberLabel}</Text>
        <View marginT={10} row>
          <Input
            name={''}
            codeValue={code}
            value={number}
            hasError={phoneError}
            onChange={onChangeNumber}
            onChangeCode={onChangeCode}
            //customBG={colors.quartenary}
            placeholder="Téléphone"
            keyboard='phone-pad'
            phone
          />
        </View>
      </View>
    </PageContainer>
  );
};

export default ServiceContact;
