import React from 'react';
import { ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import normalize from 'services/utils/normalize';
import useAppNavigator from 'hooks/useAppNavigator';
import { Button, Text, View } from 'widget/Native';
import TitleBackBtn from 'widget/Header/TitleBackBtn';
import useChangePasswordCtr from './changePasswordCtr';
import InputControl from 'widget/Form/InputControl';

const ChangePasswordScreen = () => {
  const { bottom: marginBottom } = useSafeAreaInsets()
  const navigator = useAppNavigator()

  const {
    editMyPassword,
    oldPassword,
    newPassword,
    confirmNewPassword,
    save,

    loading,

    control,
    errors,
    handleSubmit,
    onSubmit,
    watch
  } = useChangePasswordCtr()

  const onPress = () => navigator.goBack()

  return (
    <View flex color='white'>
      <TitleBackBtn title={editMyPassword} />
      <ScrollView
        contentContainerStyle={{ flex: 1, paddingBottom: normalize(20) }}>
        <View flex padding={20}>
          <Text marginL={2} marginT={10} marginB={5}>{oldPassword}</Text>
          <InputControl
            control={control}
            error={errors}
            noTextError
            placeholder='123Azerty'
            name="old_password"
            semiTransparent
            secure
          />
          <Text marginL={2} marginT={10} marginB={5}>{newPassword}</Text>
          <InputControl
            control={control}
            error={errors}
            noTextError
            placeholder='123Qwerty'
            name="password"
            secure
            semiTransparent
          />
          <Text marginL={2} marginT={10} marginB={5}>{confirmNewPassword}</Text>
          <InputControl
            control={control}
            error={errors}
            noTextError
            placeholder='123Qwerty'
            name="confirm_password"
            secure
            semiTransparent
          />
        </View>
      </ScrollView>
      <View marginB={marginBottom || 20} paddingH={20}>
        <Button
          md
          loading={loading}
          disabled={!watch('old_password') || !watch('password') || !watch('confirm_password')}
          text={save}
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </View>
  );
};

export default ChangePasswordScreen;
