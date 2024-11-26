import React from 'react';
import { ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import TitleBackBtn from 'widget/Header/TitleBackBtn';
import normalize from 'services/utils/normalize';
import { Button, Text, View } from 'widget/Native';
import CodeScreen from 'screen/Auth/ForgotPasswordScreen/CodeScreen';
import BottomModal from 'widget/Modal/PositionnedModal';
import colors from 'themes/colors';
import useChangeEmailCtr from './changeEmailCtr';
import InputControl from 'widget/Form/InputControl';

const ChangeEmailScreen = () => {
  const { bottom: marginBottom } = useSafeAreaInsets()
  const {
    editMyEmail,
    newEmail,
    confirmNewEmail,
    saveNewEmail,

    loading,
    modalCode,

    setModalCode,

    errors,
    control,
    handleSubmit,
    onSubmit,
    watch
  } = useChangeEmailCtr()

  return (
    <View flex color='white'>
      <TitleBackBtn title={editMyEmail} />
      <ScrollView
        contentContainerStyle={{ paddingBottom: normalize(20) }}>
        <View flex padding={20}>
          <Text marginL={2} marginT={10} marginB={5}>{newEmail}</Text>
          <InputControl
            control={control}
            error={errors}
            noTextError
            placeholder='example@example.fr'
            name="email"
            semiTransparent
            autoCapitalize='none'
          />
          <Text marginL={2} marginT={10} marginB={5}>{confirmNewEmail}</Text>
          <InputControl
            control={control}
            error={errors}
            noTextError
            placeholder='example@example.fr'
            name="confirm_email"
            autoCapitalize='none'
            semiTransparent
          />
        </View>
      </ScrollView>
      <View marginB={marginBottom || 20} paddingH={20}>
        <Button
          md
          disabled={!watch('email') || !watch('confirm_email')}
          loading={loading}
          text={saveNewEmail}
          onPress={handleSubmit(onSubmit)}
        />
      </View>
      <BottomModal center modal={modalCode} setModal={setModalCode} wrapContent background={colors.secondary}>
        <CodeScreen isModal email setModal={setModalCode} />
      </BottomModal>
    </View>
  );
};

export default ChangeEmailScreen;
