import { images } from 'assets/images';
import useCodeCtr from './useCodeCtr';
import useStatusBar from 'hooks/useStatusBar';
import React, { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'widget/Native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Button from 'widget/Native/Button';
import AppCode from 'widget/Form/AppCode';
import OnlyBackBtn from '../../../widget/Header/OnlyBackBtn';
import { useSelector } from 'react-redux';
import { rootState } from 'store/reducer';
import KeyboardAvoidingView from 'widget/Form/KeyboardAvoidingView';

type IProps = {
  email?: boolean;
  isModal?: boolean;
  setModal?: (isModal: boolean) => void;
};

const CodeScreen = ({ email, isModal, setModal }: IProps) => {
  const { top, bottom } = useSafeAreaInsets();

  useStatusBar('dark-content');
  const ctr = useCodeCtr();

  const {
    translation: {
      enterYourCode,
      codeSentEmailProvided,
      didntGetCode,
      resendCode,
      next
    }
  } = useSelector(
    (state: rootState) => state.authReducer.authDatas,
  );


  const [code, setCode] = useState<string>('');

  const onValidate = (code: string) => ctr?.onValidate(code, setModal, isModal, email)
  const onResendCode = () => ctr?.resendCode(isModal)
  const goToNewpassword = () => ctr?.goToNewpassword(code);

  const paddingT = !isModal ? top : undefined,
    marginB = isModal ? 0 : 40,
    marginT = isModal ? 0 : 20;

  return (
    <View flex={!isModal} paddingT={paddingT} color='secondary'>
      {!isModal && <OnlyBackBtn noBackground color="black" />}
      <View flex={!isModal} marginT={isModal ? 0 : '10%'} marginH={20}>
        <Text size={22} rosha center>{enterYourCode}</Text>
        <View paddingT={15} paddingH={20}>
          <Text center color='onPrimary'>
            {codeSentEmailProvided}
          </Text>
        </View>
        <Image source={images.forgot.Pass} resizeMode='contain' height={127} marginT={40} marginB={marginB} />
        <View marginT={marginT} opacity={ctr.loading ? 0.3 : 1} pointerEvents={ctr.loading ? 'none' : undefined}>
          <KeyboardAvoidingView>
            <AppCode
              value={code}
              setValue={setCode}
              onValidate={onValidate}
            />
          </KeyboardAvoidingView>
          <View row center iCenter marginT={20} marginB={40}>
            <Text size={12} color='onPrimary'>{didntGetCode}</Text>
            <TouchableOpacity onPress={onResendCode}>
              <Text size={12} bold underlined color='primary'>{resendCode}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {!isModal && (
        <View marginH={20} marginB={bottom || 20}>
          <Button
            text={next}
            onPress={goToNewpassword}
            disabled={code.length < 6}
            md
          />
        </View>
      )}
    </View>
  );
};

export default CodeScreen;
