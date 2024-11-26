/* eslint-disable react-native/no-inline-styles */
import dayjs, { Dayjs } from 'dayjs';
import useAppNavigator from 'hooks/useAppNavigator';
import React, { useState } from 'react';
import TitleBackBtn from 'widget/Header/TitleBackBtn';
import { Button, Input, ScrollView, Text, TouchableOpacity, View } from 'widget/Native';
import BottomCalendar from 'widget/Modal/BottomCalendar';
import KeyboardAvoidingView from 'widget/Form/KeyboardAvoidingView';
import Toast from 'react-native-toast-message';
import routeName from 'routes/routeName';
import { useSelector } from 'react-redux';
import { rootState } from 'store/reducer';
import { ITravel } from 'store/slice/user/type';
import { UserService } from 'services/applicatif/user/userService';

const TravelDate = () => {
  const navigator = useAppNavigator();
  const { id: region, travel } = navigator.getParams<{ id: string, travel: ITravel }>();
  const {
    editTravel,
    newTravel,
    travelChooseDatesTitle,
    travelChooseDatesInput,
    dateFrom,
    dateTo,
    travelChooseLabelTitle,
    edit,
    save,
  } = useSelector((state: rootState) => state.userReducer.travelDatas.translation);

  const {
    confirmDates
  } = useSelector((state: rootState) => state.userReducer.serviceDatas.translation);

  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<Dayjs | null>(travel ? dayjs(travel.startAt, 'YYYY-MM-DD') : null);
  const [endDate, setEndDate] = useState<Dayjs | null>(travel ? dayjs(travel.endAt, 'YYYY-MM-DD') : null);
  const [travelName, setTravelName] = useState(travel?.title);

  const addTravel = async () => {
    if (startDate && endDate) {
      setLoading(true)
      const result = travel ? await UserService.updateTravel(travel.id, travelName, startDate.format('YYYY-MM-DD'), endDate.format('YYYY-MM-DD'), parseInt(region)) : await UserService.addTravel(travelName, startDate.format('YYYY-MM-DD'), endDate.format('YYYY-MM-DD'), parseInt(region))
      Toast.show({
        type: result.success ? 'success' : 'error',
        text2: result.message,
      });
      if (result.success) {
        navigator.navigateScreen(routeName.user.travel.home);
      }
      setLoading(false)
    }
  }

  const onSubmit = (start: Dayjs, end: Dayjs) => {
    setStartDate(start)
    setEndDate(end)
  }

  return (
    <View flex color='white'>
      <TitleBackBtn
        title={travel ? editTravel : newTravel}
      />
      <ScrollView paddingB={40} paddingH={20}>
        <KeyboardAvoidingView>
          <Text size={22} bold marginT={20}>{travelChooseDatesTitle}</Text>
          <View style={{ marginTop: 30 }}>
            <TouchableOpacity onPress={() => setModal(true)}
              noPadding>
              <Input
                placeholder={travelChooseDatesInput}
                calendar
                //customBG={colors.quartenary}
                value={startDate && endDate ? (
                  startDate.isSame(endDate)
                    ? startDate.format('D MMM')
                    : `${dateFrom} ${startDate.format('D MMM')} ${dateTo.toLowerCase()} ${endDate.format('D MMM')}`) : undefined
                }
              />
            </TouchableOpacity>
            <View paddingH={10}>
              <Text size={22} bold marginT={60} marginB={40}>{travelChooseLabelTitle}</Text>
              <Input
                placeholder=''
                //customBG={colors.quartenary}
                onChange={(value: string) => setTravelName(value)}
                value={travelName}
              />
            </View>
          </View>
        </KeyboardAvoidingView >
      </ScrollView>
      <View
        style={{
          paddingBottom: 20,
          paddingHorizontal: 20,
          backgroundColor: 'white',
        }}>
        <Button
          loading={loading}
          disabled={!travelName || !startDate || !endDate}
          text={travel ? edit : save}
          onPress={addTravel}
          md
        />
      </View>
      <BottomCalendar
        btnText={confirmDates}
        modal={modal}
        setModal={setModal}
        endDate={endDate}
        startDate={startDate}
        onSubmit={onSubmit}
      />
    </View>
  );
};

export default TravelDate;
