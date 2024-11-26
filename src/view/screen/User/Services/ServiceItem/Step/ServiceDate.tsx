/* eslint-disable react-native/no-inline-styles */
import dayjs, { Dayjs } from 'dayjs';
import useAppNavigator from 'hooks/useAppNavigator';
import React, { useCallback, useEffect, useState } from 'react';
import { Button, Input, Text, TouchableOpacity, View } from 'widget/Native';
import routeName from 'routes/routeName';
import colors from 'themes/colors';
import defaultStyle from 'themes/defaultStyle';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { stepStyles } from './styles';
import BottomCalendar from 'widget/Modal/BottomCalendar';
import KeyboardAvoidingView from 'widget/Form/KeyboardAvoidingView';
import PageContainer from 'widget/Container/PageContainer';
import { useDispatch, useSelector } from 'react-redux';
import { rootState } from 'store/reducer';
import { service } from 'services/utils/constants';
import { setServiceSteps } from 'store/slice/user/userSlice';
import { ServiceSteps } from 'store/slice/user/type';
import debounce from 'services/utils/debounce';

type IProps = {
  isModal?: boolean;
  parentTitle: string;
  parentType: string;
};

const ServiceDate: any = ({ isModal, parentTitle, parentType }: IProps) => {
  const appNavigator = useAppNavigator();
  const dispatch = useDispatch();

  const params: { title: string; type: string; } = appNavigator.getParams();

  const {
    startDate: start,
    endDate: end,
    hasHotel,
    hotel,
    nbPers,
    priorities,
  } = useSelector((state: rootState) => state.userReducer.serviceSteps);

  const {
    dateTo,
    dontKnowTravelDates,
    chooseYourDates,
    confirmDates,
    knowTravelDates,
    haveAccommodation,
    howManyPeoplePlaceholder,
    howManyPeopleTravelling,
    nameAccommodationLabel,
    stayPrioritiesLabel,
    next,
    yes,
    no,
  } = useSelector((state: rootState) => state.userReducer.serviceDatas.translation)

  const travelPurposes = useSelector((state: rootState) => state.userReducer.serviceDatas.travelPurposes?.items)

  const [host, setHost] = useState<boolean>(hasHotel);
  const [hostName, setHostName] = useState<string>(hotel);
  const [modal, setModal] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<Dayjs | null>(start ? dayjs(start) : null);
  const [endDate, setEndDate] = useState<Dayjs | null>(end ? dayjs(end) : null);
  const [prio, setPrio] = useState(travelPurposes.map(purpose => { return { ...purpose, checked: priorities.length > 0 ? priorities.includes(purpose.id) : false } }));
  const [nbUsers, setNbUsers] = useState(nbPers);

  const type = params?.type || parentType,
    title = params?.title || parentTitle

  const togglePrio = (index: number) => {
    let newPrio = prio;
    if (
      prio.filter(item => item.checked).length === 2 &&
      !newPrio[index].checked
    ) {
      //Alert.alert('Attention', '2 maximum');
      return;
    }
    newPrio[index] = { ...newPrio[index], checked: !newPrio[index].checked };
    setPrio(Object.assign([], newPrio));
  };

  const onSubmit = (start: Dayjs, end: Dayjs) => {
    setStartDate(start)
    setEndDate(end)

    if (!isModal && type === service.SA) {
      appNavigator.navigateScreen(routeName.user.service.contact, {
        type: type,
        title: title
      });
    } else {
      setModal(false);
    }
  }

  const debounceNbUsers = useCallback(debounce((nbPers: number) => {
    dispatch(setServiceSteps({
      nbPers
    } as ServiceSteps))
  }), [])

  const onPlusUsers = () => {
    const newNumber = nbUsers + 1
    setNbUsers(newNumber)
    debounceNbUsers(newNumber)
  }

  const onMinusUsers = () => {
    const newNumber = nbUsers - 1 || 1
    setNbUsers(newNumber)
    debounceNbUsers(newNumber)
  }

  const debounceHotel = useCallback(debounce((hotel: string) => {
    dispatch(setServiceSteps({
      hotel
    } as ServiceSteps))
  }), [])

  const onChangeHostname = (hostname: string) => {
    setHostName(hostname)
    debounceHotel(hostname)
  }

  useEffect(() => {
    if (startDate)
      dispatch(setServiceSteps({
        startDate: startDate.format('YYYY-MM-DD')
      } as ServiceSteps))
  }, [startDate])

  useEffect(() => {
    if (endDate)
      dispatch(setServiceSteps({
        endDate: endDate.format('YYYY-MM-DD')
      } as ServiceSteps))
  }, [endDate])

  useEffect(() => {
    dispatch(setServiceSteps({
      hasHotel: host || false
    } as ServiceSteps))
  }, [host])

  useEffect(() => {
    dispatch(setServiceSteps({
      hotel: hostName
    } as ServiceSteps))
  }, [hostName])

  useEffect(() => {
    dispatch(setServiceSteps({
      priorities: prio.filter(item => item.checked).map(item => item.id)
    } as ServiceSteps))
  }, [...prio])

  return (
    <>
      <PageContainer noHeader={isModal} title={params?.title} bottomContent={
        !isModal &&
        <Button
          marginT={20}
          marginB={20}
          text={startDate ? next : dontKnowTravelDates}
          onPress={() =>
            appNavigator.navigateScreen(routeName.user.service.contact, {
              type: params.type,
              title: params.title
            })
          }
        />
      }>
        <Text bold size={22} marginT={20} color='onSecondary'>{knowTravelDates}</Text>
        <View marginT={30}>
          <Text size={12} marginV={10} marginL={10} color='onSecondaryDark'>{chooseYourDates}</Text>
          <TouchableOpacity noPadding onPress={() => setModal(true)}
          >
            <Input
              placeholder={chooseYourDates}
              iconName="calendar"
              name={'name'}
              //customBG={colors.quartenary}
              value={startDate && endDate ? (startDate.diff(endDate, "day") === 0
                ? startDate.format('D MMM')
                : startDate.format('D MMM') + ' ' + dateTo + ' ' + endDate.format('D MMM')) : undefined
              }
            />
          </TouchableOpacity>
        </View>
        {type === service.SP && (
          <View style={defaultStyle.container}>
            <Text size={12} marginT={30} marginB={10} color='onSecondary'>{howManyPeopleTravelling}</Text>
            <View>
              <Input
                readOnly
                name={''}
                value={howManyPeoplePlaceholder}
              />
              <View absolute={1} right={20} top={0} bottom={0} style={stepStyles.row}>
                <TouchableOpacity
                  onPress={onMinusUsers}><FontAwesome
                    name="minus-circle"
                    size={25}
                    style={stepStyles.minus}
                  />
                </TouchableOpacity>
                <Text>{nbUsers}</Text>
                <TouchableOpacity onPress={onPlusUsers}><FontAwesome
                  name="plus-circle"
                  size={25}
                  style={stepStyles.plus}
                /></TouchableOpacity>
              </View>
            </View>
          </View>
        )}
        {type !== service.SA && (
          <>
            <View style={defaultStyle.container}>
              <Text size={12} marginT={30} marginB={10} color='onSecondary'>{haveAccommodation}</Text>
              <TouchableOpacity
                style={[
                  stepStyles.pressable,
                  host && {
                    backgroundColor: colors.secondary,
                  },
                ]}
                onPress={() => setHost(true)}>
                <Text bold={host || false} size={14} color='onSecondaryDark'>{yes}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  stepStyles.pressable,
                  host === false && {
                    backgroundColor: colors.secondary,
                  },
                ]}
                onPress={() => setHost(false)}>
                <Text bold={host === false} size={14} color='onSecondaryDark'>{no}</Text>
              </TouchableOpacity>
            </View>
            {host && (
              <View style={defaultStyle.container}>
                <Text size={12} marginT={30} marginB={10} color='onSecondary'>{nameAccommodationLabel}</Text>
                <KeyboardAvoidingView>
                  <Input
                    //multiline
                    name={''}
                    //customBG={colors.quartenary}
                    onChange={onChangeHostname}
                    value={hostName}
                  />
                </KeyboardAvoidingView>
              </View>
            )}
          </>
        )}
        {type === service.SP && (
          <View style={defaultStyle.container}>
            <Text size={12} marginT={30} marginB={10} color='onSecondary'>{stayPrioritiesLabel}</Text>
            {prio.map((item, i) => (
              <TouchableOpacity
                key={i}
                style={[
                  stepStyles.pressable,
                  item.checked && {
                    backgroundColor: colors.tertiary
                  },
                ]}
                onPress={() => togglePrio(i)}>
                <Text size={14} bold={item.checked}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </PageContainer>
      <BottomCalendar
        modal={modal}
        setModal={setModal}
        endDate={endDate}
        startDate={startDate}
        insideModal={isModal}
        btnText={confirmDates}
        onSubmit={onSubmit}
      />
    </>
  );
};

export default ServiceDate;
