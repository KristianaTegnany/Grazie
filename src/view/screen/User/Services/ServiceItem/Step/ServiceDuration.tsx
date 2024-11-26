/* eslint-disable react-native/no-inline-styles */
import useAppNavigator from 'hooks/useAppNavigator';
import React, { useCallback, useState } from 'react';
import { Text, TouchableOpacity, View } from 'widget/Native';
import routeName from 'routes/routeName';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { stepStyles } from './styles';
import { Button, Input } from 'widget/Native';
import PageContainer from 'widget/Container/PageContainer';
import debounce from 'services/utils/debounce';
import { useDispatch, useSelector } from 'react-redux';
import { setServiceSteps } from 'store/slice/user/userSlice';
import { ServiceSteps } from 'store/slice/user/type';
import { rootState } from 'store/reducer';
import dayjs, { Dayjs } from 'dayjs';
import BottomCalendar from 'widget/Modal/BottomCalendar';

type IProps = {
  isModal?: boolean;
};

const ServiceDuration = ({ isModal }: IProps) => {
  const appNavigator = useAppNavigator();
  const dispatch = useDispatch();
  const params: { title: string; type: string; } = appNavigator.getParams();

  const {
    chooseYourDates,
    conciergeServiceCorrespondingDateLabel,
    conciergeServiceDurationLabel,
    conciergeServiceDurationPlaceholder,
    conciergeServiceDurationReachMaxDescription,
    confirmDates,
    dateTo,
    next
  } = useSelector((state: rootState) => state.userReducer.serviceDatas.translation)

  const {
    quantity,
    travel: {
      start,
      end
    }
  } = useSelector((state: rootState) => state.userReducer.serviceSteps);

  const [modal, setModal] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<Dayjs | null>(start ? dayjs(start * 1000) : dayjs());
  const [endDate, setEndDate] = useState<Dayjs | null>(end ? dayjs(end * 1000) : dayjs());

  const [nbDays, setNbDays] = useState(quantity || 1);

  const debounceNbDays = useCallback(debounce((quantity: number) => {
    dispatch(setServiceSteps({
      quantity
    } as ServiceSteps))
  }), [])

  const onPlusDays = () => {
    const newNumber = nbDays < 15 ? nbDays + 1 : nbDays
    setNbDays(newNumber)
    if (startDate) {
      setEndDate(startDate.add(newNumber - 1, 'day'))
    }
    debounceNbDays(newNumber)
  }

  const onMinusDays = () => {
    const newNumber = nbDays - 1 || 1
    setNbDays(newNumber)
    if (startDate) {
      setEndDate(startDate.add(newNumber - 1, 'day'))
    }
    debounceNbDays(newNumber)
  }

  const onSubmit = (start: Dayjs, end: Dayjs) => {
    setStartDate(start)
    setEndDate(end)
    setNbDays(end.diff(start, 'day') + 1)
    dispatch(setServiceSteps({
      travel: {
        start: start.unix(),
        end: end.unix()
      }
    } as ServiceSteps))
  }

  const onPress = () =>
    appNavigator.navigateScreen(routeName.user.service.resume, {
      type: params.type,
      title: params.title
    })

  const openModal = () => setModal(true)

  return (
    <>
      <PageContainer noHeader={isModal} title={params?.title} bottomContent={
        !isModal &&
        <Button
          disabled={!startDate}
          marginT={20}
          marginB={20}
          text={next}
          onPress={onPress}
        />
      }>
        <View flex>
          <Text bold size={22} marginT={20} marginB={10} color='onSecondary'>{conciergeServiceDurationLabel}</Text>
          <View>
            <Input
              readOnly
              name={''}
              //customBG={colors.quartenary}
              value={conciergeServiceDurationPlaceholder}
            //customIcon={nbDaysView()}
            />
            <View absolute={1} right={20} top={0} bottom={0} style={stepStyles.row}>
              <TouchableOpacity
                onPress={onMinusDays}><FontAwesome
                  name="minus-circle"
                  size={25}
                  style={stepStyles.minus}
                /></TouchableOpacity>
              <Text>{nbDays}</Text>
              <TouchableOpacity onPress={onPlusDays}><FontAwesome
                name="plus-circle"
                size={25}
                style={stepStyles.plus}
              /></TouchableOpacity>
            </View>
          </View>
        </View>
        <Text size={15} marginV={20} color='onSecondaryLight'>{conciergeServiceDurationReachMaxDescription}</Text>
        <Text marginT={20} marginB={10} color='onSecondary'>{conciergeServiceCorrespondingDateLabel}</Text>
        <TouchableOpacity noPadding onPress={openModal}
        >
          <Input
            placeholder={chooseYourDates}
            iconName="calendar"
            name={'name'}
            //customBG={colors.quartenary}
            value={startDate && endDate ?
              (startDate.diff(endDate, "day") === 0
                ? startDate.format('D MMM')
                : startDate.format('D MMM') + ' ' + dateTo + ' ' + endDate.format('D MMM')) : undefined
            }
          />
        </TouchableOpacity>
      </PageContainer>
      <BottomCalendar
        modal={modal}
        scError={conciergeServiceDurationReachMaxDescription}
        setModal={setModal}
        endDate={endDate || dayjs()}
        startDate={startDate || dayjs()}
        insideModal={isModal}
        btnText={confirmDates}
        onSubmit={onSubmit}
      />
    </>
  );
};

export default ServiceDuration;
