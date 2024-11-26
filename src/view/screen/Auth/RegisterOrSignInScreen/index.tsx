import { images } from 'assets/images';
import useStatusBar from 'hooks/useStatusBar';
import React, { useEffect, useState } from 'react';
import Button from 'widget/Native/Button';
import AuthBackground from 'widget/Container/AuthBackground';
import { AnimatedView, View } from 'widget/Native';
import useRegisterOrSignin from './useRegisterOrSignin';
import Image from 'widget/Native/Image';
import { useSelector } from 'react-redux';
import { rootState } from 'store/reducer';

const RegisterOrSignInScreen = () => {
  useStatusBar('light-content');
  const { isFocused, goToLogin, goToRegister } = useRegisterOrSignin();

  const [animation, setAnimation] = useState<string | undefined>(undefined);

  const {
    translation: {
      register,
      logIn
    }
  } = useSelector((state: rootState) => state.authReducer.authDatas);

  useEffect(() => {
    if (isFocused) {
      setAnimation('fadeInDown')
    }
    else setAnimation('fadeOut')
  }, [isFocused])

  return (
    <AuthBackground>
      {register && <>
        <AnimatedView animation={animation} flex={2} marginT={40} center iCenter >
          <Image
            source={images.LogoText}
            width={390}
            height={230}
            resizeMode='contain'
          />
        </AnimatedView>
        <View flex paddingH={20}>
          <View marginB={20}>
            <Button text={register}
              onPress={goToRegister} md />
          </View>
          <Button text={logIn}
            onPress={goToLogin} md white />
        </View>
      </>}
    </AuthBackground>
  );
};

export default RegisterOrSignInScreen;
