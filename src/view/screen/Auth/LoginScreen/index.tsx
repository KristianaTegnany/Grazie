import React from 'react';
import InputControl from 'widget/Form/InputControl';
import useLoginCtr from './useLoginCtr';
import OnlyBackBtn from 'widget/Header/OnlyBackBtn';
import AuthBackground from 'widget/Container/AuthBackground';
import useStatusBar from 'hooks/useStatusBar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import normalize from 'services/utils/normalize';
import { middleFadeIn } from 'services/utils/animations';
import Button from 'widget/Native/Button';
import AnimatedView from 'widget/Native/AnimatedView';
import { ScrollView, Text, TouchableOpacity, View } from 'widget/Native';
import { useSelector } from 'react-redux';
import { rootState } from 'store/reducer';
import KeyboardAvoidingView from 'widget/Form/KeyboardAvoidingView';

const LoginScreen = () => {
  const { bottom } = useSafeAreaInsets();
  useStatusBar('light-content');

  const {
    translation: {
      login,
      email,
      password,
      forgotPasswordQuestion,
      notRegisteredAsGigiYet,
      registerFormal
    }
  } = useSelector((state: rootState) => state.authReducer.authDatas);

  const { control, loading, createAccount, watch, goBack, goToForgotPassword, handleSubmit, onSubmit } = useLoginCtr();

  return (
    <AuthBackground>
      <OnlyBackBtn noBackground goBack={goBack} />
      {login && <>
        <View flex center>
          <Text size={34} rosha center color='white'>{login}</Text>
        </View>
        <View paddingH={20} flex={2}>
          <ScrollView flex paddingV={20}>
            <KeyboardAvoidingView>
            <AnimatedView animation={middleFadeIn} marginB={10}>
              <Text color='white'>{email}</Text>
            </AnimatedView>
            <InputControl
              placeholder={email}
              name="email"
              control={control}
              semiTransparent
              autoCapitalize="none"
            />
            <AnimatedView animation={middleFadeIn} delay={200} marginB={10}>
              <Text color='white'>{password}</Text>
            </AnimatedView>
            <InputControl
              placeholder={password}
              name="password"
              control={control}
              secure
              semiTransparent
            />
            <TouchableOpacity
              onPress={goToForgotPassword}>
              <Text center size={14} medium underlined color='white'>
                {forgotPasswordQuestion}
              </Text>
            </TouchableOpacity>
            </KeyboardAvoidingView>
          </ScrollView>
          <View
            marginT={50}
            marginB={bottom || normalize(20)}
          >
            <Button
              text={login}
              disabled={!watch('email') || !watch('password')}
              loading={loading}
              onPress={handleSubmit(onSubmit)}
              md
            />
            <View marginT={15}>
              <Text size={14} center color='white'>
                {notRegisteredAsGigiYet}
              </Text>
              <TouchableOpacity
                onPress={createAccount}>
                <Text center size={14} bold underlined color='primary'>
                  {registerFormal}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View></>}
    </AuthBackground>
  );
};

export default LoginScreen;
