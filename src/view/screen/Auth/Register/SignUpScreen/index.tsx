import useRegisterCtr from '../useRegisterCtr';
import useStatusBar from 'hooks/useStatusBar';
import React, { useEffect } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { rootState } from 'store/reducer';
import OnlyBackBtn from 'widget/Header/OnlyBackBtn';
import CheckboxControl from 'widget/Form/CheckboxControl';
import BottomModal from 'widget/Modal/PositionnedModal';
import LineProgress from '../widget/LineProgress';
import AuthBackground from 'widget/Container/AuthBackground';
import CodeScreen from '../../ForgotPasswordScreen/CodeScreen';
import { middleFadeIn } from 'services/utils/animations';
import colors from 'themes/colors';
import KeyboardAvoiding from 'widget/Form/KeyboardAvoidingView';
import Button from 'widget/Native/Button';
import { AnimatedView, ScrollView, Text, TouchableOpacity, View } from 'widget/Native';
import InputControl from 'widget/Form/InputControl';
import { Container, Content, Label, Title } from '../widget';

const SignUpScreen = () => {
  const { bottom, top } = useSafeAreaInsets();
  useStatusBar('light-content');

  const {
    errors,
    control,
    loading,
    modalCode,
    login,
    onSubmit,
    watch,
    handleSubmit,
    setModalCode
  } = useRegisterCtr();

  const {
    translation: {
      createMyAccount,
      email,
      password,
      confirmPassword,
      notifyAllowAllLabel,
      notifyEmailLabel,
      register: registerText,
      alreadyRegisteredAsGigi,
      loginFormal,
    }
  } = useSelector((state: rootState) => state.authReducer.authDatas);

  useEffect(() => {
    return () => setModalCode(false)
  }, []);

  return (
    <AuthBackground>
      <OnlyBackBtn noBackground />
      <Container paddingT={top}>
        <Content>
          <Title>{createMyAccount}</Title>
          <LineProgress width={10} />
          <ScrollView paddingT={20} paddingB={10}>
            <KeyboardAvoiding>
              <AnimatedView animation={middleFadeIn}>
                <Label>{email}</Label>
              </AnimatedView>
              <InputControl
                placeholder={email}
                name="email"
                error={errors}
                noTextError
                control={control}
                keyboard={'email-address'}
                semiTransparent
                autoCapitalize='none'
              />
              <AnimatedView animation={middleFadeIn} delay={200}>
                <Label>{password}</Label>
              </AnimatedView>
              <InputControl
                placeholder={password}
                name="password"
                error={errors}
                noTextError
                control={control}
                secure
                semiTransparent
              />
              <AnimatedView animation={middleFadeIn} delay={400}>
                <Label>
                  {confirmPassword}
                </Label>
              </AnimatedView>
              <InputControl
                placeholder={confirmPassword}
                name="password_confirm"
                error={errors}
                noTextError
                control={control}
                secure
                semiTransparent
              />
              <CheckboxControl
                text={notifyEmailLabel}
                control={control}
                error={errors}
                name="newsletter"
                transparent
              />
              <CheckboxControl
                text={notifyAllowAllLabel}
                control={control}
                error={errors}
                name="notification"
                transparent
              />
            </KeyboardAvoiding>
          </ScrollView>
          <View
            fullWidth
            marginB={bottom || 20}
          >
            <Button
              text={registerText}
              onPress={handleSubmit(onSubmit)}
              loading={loading}
              disabled={!watch('email') || !watch('password')}
              md
            />
            <View marginT={15}>
              <Text size={14} center color='white'>
                {alreadyRegisteredAsGigi}
              </Text>
              <TouchableOpacity onPress={login}>
                <Text size={14} bold center underlined color='primary'>
                  {loginFormal}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Content>
      </Container>
      <BottomModal modal={modalCode} setModal={setModalCode} background={colors.secondary}>
        <CodeScreen isModal setModal={setModalCode} />
      </BottomModal>
    </AuthBackground>
  );
};

export default SignUpScreen;
