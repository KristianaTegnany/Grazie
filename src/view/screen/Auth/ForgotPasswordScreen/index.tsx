import { images } from 'assets/images';
import useForgotCtr from './useForgotCtr';
import useStatusBar from 'hooks/useStatusBar';
import React from 'react';
import { Image, Text, View } from 'widget/Native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Button from 'widget/Native/Button';
import OnlyBackBtn from '../../../widget/Header/OnlyBackBtn';
import AppInput from '../../../widget/Form/InputControl';
import { fadeZoomIn } from 'services/utils/animations';
import AnimatedView from 'widget/Native/AnimatedView';
import { useSelector } from 'react-redux';
import { rootState } from 'store/reducer';
import KeyboardAvoidingView from 'widget/Form/KeyboardAvoidingView';

const ForgotPasswordScreen = () => {
  const { top, bottom } = useSafeAreaInsets();
  useStatusBar('dark-content');
  const ctr = useForgotCtr();

  const {
    translation: {
      forgotPassword,
      resetPasswordDescription,
      email,
      resetPassword
    }
  } = useSelector(
    (state: rootState) => state.authReducer.authDatas,
  );

  return (
    <View flex paddingT={top} color='secondary'>
      <OnlyBackBtn noBackground color="black" />
      <View flex marginT={'10%'} marginH={20}>
        <Text size={22} rosha center>{forgotPassword}</Text>
        <View paddingT={15} paddingH={20}>
          <Text center color='onPrimary'>
            {resetPasswordDescription}
          </Text>
        </View>
        <KeyboardAvoidingView>
          <AnimatedView animation={fadeZoomIn} delay={200}>
            <Image source={images.forgot.Lock} resizeMode='contain' height={127} marginV={40} />
          </AnimatedView>
          <View marginT={20}>
            {/*<Text style={forgotStyles.titleInput}>Email</Text>*/}
            <AppInput
              placeholder={email}
              name="email"
              error={ctr?.errors}
              noTextError
              control={ctr?.control}
            />
          </View>
        </KeyboardAvoidingView>
      </View>
      <View marginH={20} marginB={bottom || 20}>
        <Button
          text={resetPassword}
          onPress={ctr?.handleSubmit(ctr.onSubmit)}
          loading={ctr?.loading}
          md
        />
      </View>
    </View>
  );
};

export default ForgotPasswordScreen;
