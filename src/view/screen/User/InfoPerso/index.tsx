import React, { useState } from 'react';
import defaultStyle from 'themes/defaultStyle';
import { images } from 'assets/images';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import colors from 'themes/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import useAppNavigator from 'hooks/useAppNavigator';
import routeName from 'routes/routeName';
import useInfoPersoCtr from './infoPersoCtr';
import { Button, Image, Input, ScrollView, Text, TouchableOpacity, View } from 'widget/Native';
import TitleBackBtn from 'widget/Header/TitleBackBtn';
import BottomProfilModalEdit from './BottomModalEdit';
import LinkText from 'widget/Text/LinkText';
import InputControl from 'widget/Form/InputControl';
import DateTimePicker from 'react-native-modal-datetime-picker';
import dayjs from 'dayjs';
import CenterModal from 'screen/Tab/widget/CenterModal';
import KeyboardAvoidingView from 'widget/Form/KeyboardAvoidingView';
import BottomModalCountries from './BottomModalCountries';
import useStatusBar from 'hooks/useStatusBar';

const InfoPersoScreen = () => {
  useStatusBar('dark-content');
  const { bottom: marginBottom } = useSafeAreaInsets()

  const {
    control,
    country,
    countries,
    errors,
    image,
    loading,
    loadingConfirm,
    loadingDelete,
    modalBottom,
    modalConfirm,
    modalCountry,

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
    myEmail,
    cancel,
    isScheduledDeletion,
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
    openCamera,
    onSubmit,
    pickImage,
    setCountry,
    setModalBottom,
    setModalConfirm,
    setModalCountry,
    setValue,
    showPicker,
  } = useInfoPersoCtr();
  const navigation = useAppNavigator();

  const goToEmail = () => navigation.navigateScreen(routeName.user.profile.changeEmail)
  const goToPassword = () => navigation.navigateScreen(routeName.user.profile.changePassword)

  const [showDatepicker, setShowDatepicker] = useState(false)

  const onDatepicker = () => {
    setShowDatepicker(true)
  }

  const openModalConfirm = () => setModalConfirm(true)
  const closeModalConfirm = () => setModalConfirm(false)

  const openModalCountry = () => setModalCountry(true)

  return (
    <View flex color='white'>
      <TitleBackBtn title={personnalInformation} />
      <ScrollView
        style={defaultStyle.container}>
        <KeyboardAvoidingView>
          <View flex padding={10}>
            <TouchableOpacity
              onPress={showPicker}
              row iCenter
            >
              <View border={100} size={80} borderW={2} borderC='onTertiary' padding={3} color='white'>
                <Image
                  source={image ? { uri: image } : images.Logo}
                  width={'100%'} height={'100%'} border={100}
                />
                <View color='quartenary' size={30} center iCenter border={15} absolute={3} bottom={0} right={0} borderC='onTertiary' borderW={2} padding={3}>
                  <MaterialIcons
                    name="photo-camera"
                    size={20}
                    color={colors?.onSecondaryDark}
                  />
                </View>
              </View>
              <LinkText marginL={10} color='onPrimary' text={changeProfilePicture} />
            </TouchableOpacity>
            <Text marginL={2} marginT={10} marginB={5}>{name}</Text>
            <InputControl
              //noIcon
              control={control}
              error={errors}
              name="last_name"
            />
            <Text marginL={2} marginT={10} marginB={5}>{firstname}</Text>
            <InputControl
              //noIcon
              control={control}
              error={errors}
              name="first_name"
            />
            <Text marginL={2} marginT={10} marginB={5}>{dateBirth}</Text>
            <TouchableOpacity onPress={onDatepicker} noPadding>
              <InputControl
                //noIcon
                control={control}
                error={errors}
                name="birthday"
              />
            </TouchableOpacity>
            <Text marginL={2} marginT={10} marginB={5}>{phoneNumber}</Text>
            <InputControl
              //noIcon
              control={control}
              error={errors}
              keyboard="phone-pad"
              name="mobile_phone"
            />
            {/*<Text marginL={2} marginT={10} marginB={5}>{godfatherLabel}</Text>
            <InputControl
              //noIcon
              control={control}
              error={errors}
              name="godfather"
              autoCapitalize='none'
            />*/}
            <Text marginT={20} marginB={10}><Text bold>{email}: </Text>{myEmail}</Text>
            <Button outline text={editEmail} md onPress={goToEmail} />
            <Text marginT={20} marginB={10} bold>{password}</Text>
            <Button outline text={editPassword} md marginB={20} onPress={goToPassword} />
            <Text marginT={20} marginB={10} bold>{postalAddressInvoicing}</Text>
            <Text marginL={2} marginT={10} marginB={5}>{addressStreetPlaceholder}</Text>
            <InputControl
              //noIcon
              control={control}
              error={errors}
              name="street"
            //placeholder={addressStreetPlaceholder}
            />
            <Text marginL={2} marginT={10} marginB={5}>{addressZipcodePlaceholder}</Text>
            <InputControl
              //noIcon
              control={control}
              error={errors}
              name="zip_code"
              keyboard='numeric'
            //placeholder={addressZipcodePlaceholder}
            />
            <Text marginL={2} marginT={10} marginB={5}>{addressCityPlaceholder}</Text>
            <InputControl
              //noIcon
              control={control}
              error={errors}
              name="city"
            //placeholder={addressCityPlaceholder}
            />
            <Text marginL={2} marginT={10} marginB={5}>{addressCountryPlaceholder}</Text>
            <TouchableOpacity noPadding onPress={openModalCountry}>
              <Input activity readOnly
                value={country ? country.name : ''}
              //noIcon
              //placeholder={addressCountryPlaceholder}
              />
            </TouchableOpacity>
            {/*<AppInputLabel
              label={'Mail'}
              noIcon
              error={errors}
              control={control}
              name="email"
            />*/}
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
      <View marginT={20} marginB={marginBottom || 20} paddingH={20}>
        <Button
          md
          outline
          loading={loadingDelete}
          text={isScheduledDeletion ? cancelDeleteAccountSaveButtonLabel : deleteMyAccountTitle}
          onPress={isScheduledDeletion ? cancelDeletingAccount : openModalConfirm}
          marginB={10}
        />
        <Button
          md
          text={save}
          onPress={handleSubmit(onSubmit)}
          loading={loading}
        />
      </View>
      <CenterModal modal={modalConfirm} title={deleteAccountTitle} closeModal={closeModalConfirm} bottom={
        <View>
          <Text center>{deleteAccountMessage}</Text>
          <Button
            md
            outline
            text={cancel}
            onPress={closeModalConfirm}
            marginT={40}
            marginB={10}
          />
          <Button
            md
            text={deleteAccountSaveButtonLabel}
            onPress={deletingAccount}
            loading={loadingConfirm}
          />
        </View>
      } />
      <BottomModalCountries
        title={addressCountryPlaceholder}
        country={country}
        countries={countries}
        modal={modalCountry}
        setCountry={setCountry}
        setModal={setModalCountry}
      />
      <BottomProfilModalEdit
        modal={modalBottom}
        setModal={setModalBottom}
        onGalerie={pickImage}
        onCamera={openCamera}
      />
      <DateTimePicker
        locale='fr_FR'
        onConfirm={date => {
          setValue('birthday', dayjs(date).format('DD/MM/YYYY'));
          setShowDatepicker(false);
        }}
        cancelTextIOS={cancel}
        confirmTextIOS={validate}
        onCancel={() => setShowDatepicker(false)}
        isVisible={showDatepicker}
      />
    </View>
  );
};

export default InfoPersoScreen;
