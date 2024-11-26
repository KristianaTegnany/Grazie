import useNewCtr from './useNewCtr';
import useStatusBar from 'hooks/useStatusBar';
import React from 'react';
import { Text, View } from 'widget/Native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Button from 'widget/Native/Button';
import OnlyBackBtn from '../../../widget/Header/OnlyBackBtn';
import AppInput from '../../../widget/Form/InputControl';
import { middleFadeIn } from 'services/utils/animations';
import AnimatedView from 'widget/Native/AnimatedView';
import { useSelector } from 'react-redux';
import { rootState } from 'store/reducer';

const NewPasswordScreen = () => {
  const { top, bottom } = useSafeAreaInsets();
  useStatusBar('dark-content');
  const ctr = useNewCtr();

  const {
    translation: {
      enterNewPassword,
      newPassword,
      confirmNewPassword,
      savePassword
    }
  } = useSelector(
    (state: rootState) => state.authReducer.authDatas,
  );

  return (
    <View flex paddingT={top} color='secondary'>
      <OnlyBackBtn noBackground color="black" />
      <View flex marginT={'10%'} marginH={20}>
        <Text size={22} rosha center>
          {enterNewPassword}
        </Text>
        <View marginT={80}>
          <AnimatedView animation={middleFadeIn}>
            <Text size={12} marginB={10} color='onSecondary'>{newPassword}</Text>
          </AnimatedView>
          <AppInput
            name="password"
            secure
            error={ctr?.errors}
            control={ctr?.control}
            shadow
          />
          <AnimatedView animation={middleFadeIn} delay={200}>
            <Text size={12} marginB={10} color='onSecondary'>
              {confirmNewPassword}
            </Text>
          </AnimatedView>
          <AppInput
            name="confirm_password"
            secure
            error={ctr?.errors}
            control={ctr?.control}
            shadow
          />
        </View>
      </View>
      <View marginH={20} marginB={bottom || 20}>
        <Button
          text={savePassword}
          onPress={ctr?.handleSubmit(ctr.onSubmit)}
          loading={ctr?.loading}
          md
        />
      </View>
    </View>
  );
};

export default NewPasswordScreen;
