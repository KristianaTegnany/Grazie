/* eslint-disable react-native/no-inline-styles */
import useAppNavigator from 'hooks/useAppNavigator';
import React, { useEffect, useState } from 'react';
import ServiceContact from './ServiceContact';
import ServiceCreneau from './ServiceCreneau';
import ServiceDate from './ServiceDate';
import ServicePlace from './ServicePlace';
import { stepStyles } from './styles';
import { Button, Text, View } from 'widget/Native';
import BottomModal from 'widget/Modal/PositionnedModal';
import PageContainer from 'widget/Container/PageContainer';
import { IAddOrder, UserService } from 'services/applicatif/user/userService';
import { useDispatch, useSelector } from 'react-redux';
import { rootState } from 'store/reducer';
import dayjs from 'dayjs';
import Toast from 'react-native-toast-message';
import { resetServiceSteps, setServiceSteps } from 'store/slice/user/userSlice';
import routeName from 'routes/routeName';
import { CommonActions } from '@react-navigation/native';
import { service } from 'services/utils/constants';
import ServiceDuration from './ServiceDuration';
import { initPaymentSheet, presentPaymentSheet } from '@stripe/stripe-react-native';
import { ServiceSteps } from 'store/slice/user/type';

const ServiceResume = () => {
  const appNavigator = useAppNavigator();
  const dispatch = useDispatch();

  const params: { title: string; type: string; } = appNavigator.getParams();

  const isSC = params.type === service.SC
  const isSP = params.type === service.SP

  const {
    id,
    callslot,
    startDate,
    endDate,
    region,
    hasHotel,
    hotel,
    nbPers,
    priorities,
    contactType,
    phoneCode,
    phoneNumber,
    quantity,
    travel: {
      start,
      end
    }
  } = useSelector((state: rootState) => state.userReducer.serviceSteps);

  const {
    dateFrom,
    dateTo,
    destination,
    dontKnowTravelDates,
    edit,
    orderSummaryLabel,
    toBeContacted,
    travelDates,
    yourRequest,
    yourSlot,
    yourTravelDetails,
    day,
    days,
    orderThankYouSuccessMessage,
    person,
    people,
  } = useSelector((state: rootState) => state.userReducer.serviceDatas.translation);

  const [loading, setLoading] = useState(true);
  const [buttonText, setButtonText] = useState('');
  const [modalPlace, setModalPlace] = useState(false);
  const [modalDate, setModalDate] = useState(false);
  const [modalContact, setModalContact] = useState(false);
  const [modalCreneau, setModalCreneau] = useState(false);
  const [modalDuration, setModalDuration] = useState(false);

  const addOrder = async () => {
    setLoading(true)
    if (buttonText) {
      const { error } = await presentPaymentSheet();

      if (error) {
        if (error.code !== "Canceled")
          Toast.show({ text1: error.code, text2: error.message, type: 'error' })
      } else {
        Toast.show({ text1: 'Succès', text2: orderThankYouSuccessMessage.replace('@product', params.title), type: 'success' })
        appNavigator.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: routeName.user.service.orders }],
          })
        );
        await new Promise(resolve => setTimeout(resolve, 5000))
        appNavigator.navigateScreen(routeName.user.base, routeName.user.service.orders)
        dispatch(resetServiceSteps())
      }
      setLoading(false)
    }
    else
      UserService.addOrder(hotel, parseInt(callslot.id), contactType.id, params.type === service.SC ? dayjs(start * 1000).format('YYYY-MM-DD') : dayjs(callslot.date * 1000).format('YYYY-MM-DD'), hasHotel, quantity, phoneCode + '' + phoneNumber, params.type, region.id, priorities, nbPers, startDate ? startDate + ',' + endDate : undefined).then(async (data: IAddOrder) => {
        Toast.show({ text2: data.message, type: data.success ? 'success' : 'error' })
        if (data.success) {
          setButtonText(data.price?.label)
          dispatch(setServiceSteps({ id: data.order_id } as ServiceSteps))
          await initPaymentSheet({
            merchantDisplayName: "Grazie Gigi",
            customerId: data.payment_intent.customer_id,
            customerEphemeralKeySecret: data.payment_intent.ephemeral_key,
            paymentIntentClientSecret: data.payment_intent.payment_intent?.client_secret,
          })
        }
        setLoading(false)
      }).catch(function () {
        setLoading(false);
      })
  }

  const updateOrder = () => {
    if (id) {
      setLoading(true)
      UserService.updateOrder(id, {
        accommodation_name: hotel,
        callslot: parseInt(callslot.id),
        contact_method: contactType.id,
        date: params.type === service.SC ? dayjs(start * 1000).format('YYYY-MM-DD') : dayjs(callslot.date * 1000).format('YYYY-MM-DD'),
        is_hosted: hasHotel,
        quantity,
        phone_number: phoneCode + '' + phoneNumber,
        product_ref: params.type,
        region: region.id,
        travel_purposes: priorities,
        travelers_number: nbPers,
        travel_dates: startDate ? startDate + ',' + endDate : undefined
      }).then(async (data: IAddOrder) => {
        Toast.show({ text2: data.message, type: data.success ? 'success' : 'error' })
        if (data.price?.label) {
          setButtonText(data.price.label)
          await initPaymentSheet({
            merchantDisplayName: "Grazie Gigi",
            customerId: data.payment_intent.customer_id,
            customerEphemeralKeySecret: data.payment_intent.ephemeral_key,
            paymentIntentClientSecret: data.payment_intent.payment_intent?.client_secret,
          })
        }
      }).finally(function () {
        setLoading(false);
      })
    }
  }

  useEffect(() => {
    if (id === undefined)
      addOrder()
  }, [id])

  useEffect(() => {
    if (appNavigator.isFocused) {
      updateOrder()
    }
  }, [appNavigator.isFocused && hotel, callslot.id, contactType.id, callslot.date, hasHotel, quantity, phoneCode, phoneNumber, region.id, priorities.length, nbPers, start, end, startDate, endDate])

  return (
    <>
      <PageContainer title={params.title} bottomContent={
        (loading || buttonText) && <Button
          loading={loading || !buttonText}
          marginT={20}
          marginB={20}
          text={buttonText}
          onPress={addOrder}
        />
      }>
        <Text bold size={22} marginT={20} color='onSecondary'>{orderSummaryLabel}</Text>
        <View marginT={40}>
          <View style={stepStyles.item}>
            <View style={stepStyles.leftItem}>
              <Text bold size={17} marginB={10} color='onSecondary'>{destination}</Text>
              <Text size={15} color='onPrimary'>{region.label}</Text>
            </View>
            <View style={stepStyles.rightItem}>
              <Button
                outline
                wrapContent
                text={edit}
                onPress={() => setModalPlace(true)}
              />
            </View>
          </View>
          <View style={stepStyles.item}>
            <View style={stepStyles.leftItem}>
              <Text bold size={17} marginB={10} color='onSecondary'>{isSP ? yourTravelDetails : travelDates}</Text>
              <Text size={15} color='onPrimary'>{startDate ? (dayjs(startDate).isSame(dayjs(endDate), 'day') ? dayjs(endDate).format('DD MMMM YYYY') : `${dateFrom} ${dayjs(startDate).format('DD')} ${dateTo} ${dayjs(endDate).format('DD MMMM YYYY')}`) : dontKnowTravelDates}</Text>
              {isSP &&
                <>
                  <Text size={15} color='onPrimary'>{nbPers} {nbPers > 1 ? people : person}</Text>
                  <Text size={15} color='onPrimary'>{hotel}</Text>
                </>}
            </View>
            <View style={stepStyles.rightItem}>
              <Button
                outline
                wrapContent
                text={edit}
                onPress={() => setModalDate(true)}
              />
            </View>
          </View>
          <View style={stepStyles.item}>
            <View style={stepStyles.leftItem}>
              <Text bold size={17} marginB={10} color='onSecondary'>{toBeContacted}</Text>
              <Text size={15} color='onPrimary'>{contactType.label}</Text>
              <Text size={15} color='onPrimary'>{phoneCode + '' + phoneNumber}</Text>
            </View>
            <View style={stepStyles.rightItem}>
              <Button
                outline
                wrapContent
                text={edit}
                onPress={() => setModalContact(true)}
              />
            </View>
          </View>
          <View style={stepStyles.item}>
            <View style={stepStyles.leftItem}>
              <Text bold size={17} marginB={10} color='onSecondary'>{isSC ? yourRequest : yourSlot}</Text>
              {isSC && <Text size={15} color='onPrimary'>{quantity} {quantity > 1 ? days : day} : {dayjs(start * 1000).format('dddd DD MMMM YYYY')} - {dayjs(end * 1000).format('dddd DD MMMM YYYY')}</Text>}
              {!isSC && <Text size={15} color='onPrimary'>{dayjs(callslot.date * 1000).format('dddd DD MMMM YYYY')} - {callslot.label?.replace(':', 'h')}</Text>}
            </View>
            <View style={stepStyles.rightItem}>
              <Button
                outline
                wrapContent
                text={edit}
                onPress={() => isSC ? setModalDuration(true) : setModalCreneau(true)}
              />
            </View>
          </View>
        </View>
      </PageContainer>
      <BottomModal modal={modalPlace} setModal={setModalPlace}>
        <ServicePlace isModal parentTitle={params.title} parentType={params.type} />
      </BottomModal>
      <BottomModal modal={modalDate} setModal={setModalDate}>
        <ServiceDate isModal parentTitle={params.title} parentType={params.type} />
      </BottomModal>
      <BottomModal modal={modalContact} setModal={setModalContact}>
        <ServiceContact isModal />
      </BottomModal>
      <BottomModal modal={modalCreneau} setModal={setModalCreneau}>
        <ServiceCreneau isModal />
      </BottomModal>
      <BottomModal modal={modalDuration} setModal={setModalDuration}>
        <ServiceDuration isModal />
      </BottomModal>
    </>
  );
};

export default ServiceResume;
