/* eslint-disable react-native/no-inline-styles */
import useAppNavigator from 'hooks/useAppNavigator';
import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'widget/Native';
import routeName from 'routes/routeName';
import { Button } from 'widget/Native';
import Entypo from 'react-native-vector-icons/Entypo';
import colors from 'themes/colors';
import PageContainer from 'widget/Container/PageContainer';
import { useDispatch, useSelector } from 'react-redux';
import { rootState } from 'store/reducer';
import Apollo from 'services/utils/apollo';
import dayjs from 'dayjs';
import { setServiceSteps } from 'store/slice/user/userSlice';
import { ServiceSteps } from 'store/slice/user/type';

type IProps = {
  isModal?: boolean;
};

type ISelectProps = {
  callslots?: any[];
  label: string;
  isNew?: boolean;
  timestamp: number;
  selectedCallslot: { id: string; date: number; label: string; };
  setSelectedCallslot: (callslot: { id: string; date: number; label: string }) => void;
  alwaysOpen?: boolean;
};

const CreneauSelect = (props: ISelectProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(props?.alwaysOpen || false);
  //const label = dayjs(props.timestamp * 1000).format('dddd D MMM')

  useEffect(() => {
    setIsOpen(props?.alwaysOpen || false);
  }, [props?.alwaysOpen]);

  return (
    <View marginT={20} marginB={10}>
      <TouchableOpacity flex row between iCenter
        disabled={props?.alwaysOpen}
        padding={15}
        border={10}
        color='quartenary'
        onPress={() => setIsOpen(!isOpen)}>
        <Text light size={12}>{props.label}</Text>
        {!props?.alwaysOpen && (
          <Entypo
            name={isOpen ? 'chevron-thin-up' : 'chevron-thin-down'}
            color={colors?.onSecondaryLight}
            size={12}
          />
        )}
      </TouchableOpacity>
      {(isOpen || (props.isNew && props.timestamp === props.selectedCallslot.date)) && (
        <View flex row iCenter marginT={10}>
          {props?.callslots?.map((callslot, i) => {
            const selected = props.selectedCallslot.id === callslot.id && props.timestamp === props.selectedCallslot.date
            return (
              <TouchableOpacity
                key={i}
                padding={5}
                paddingH={10}
                border={5}
                marginR={10}
                disabled={selected && !props.isNew}
                color={selected ? 'primary' : 'quartenary'}
                onPress={() => props.setSelectedCallslot({
                  id: callslot.id,
                  date: props.timestamp,
                  label: callslot.label
                })}>
                <Text light size={12} color={selected ? 'white' : 'onSecondary'}>
                  {callslot.label}
                </Text>
              </TouchableOpacity>
            )
          })}
        </View>
      )}
    </View>
  );
};

const ServiceCreneau = ({ isModal }: IProps) => {
  const appNavigator = useAppNavigator();
  const dispatch = useDispatch();

  const params: { type: string; title: string; } = appNavigator.getParams();

  const {
    id,
    callslot,
  } = useSelector((state: rootState) => state.userReducer.serviceSteps);

  const {
    appointmentCallslotLabel,
    showMoreSlots,
    next
  } = useSelector((state: rootState) => state.userReducer.serviceDatas.translation)

  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(0)
  const [callslots, setCallslots] = useState<any[]>([])
  const [selectedCallslot, setSelectedCallslot] = useState<{ id: string; date: number; label: string }>(callslot);

  const dateMin = dayjs().add(3, 'day')

  const incrementPage = () => {
    setPage(page => page + 1)
  }

  useEffect(() => {
    if (page > 0) {
      setLoading(true)
      Apollo.getCallslots(dateMin.add(page * 10, "day").format("YYYY-MM-DD"), dateMin.add(page * 10 + 9, 'day').format("YYYY-MM-DD")).then(data => {
        if (data.callslotsAvailabilities?.items) {
          setCallslots([...callslots, ...data.callslotsAvailabilities.items])
        }
      }).finally(function () {
        setLoading(false);
      })
    }
  }, [page])

  useEffect(() => {
    if (appNavigator.isFocused) {
      setLoading(true)
      Apollo.getCallslots(dateMin.format("YYYY-MM-DD"), dateMin.add(9, 'day').format("YYYY-MM-DD")).then(data => {
        if (data.callslotsAvailabilities?.items) {
          setCallslots(data.callslotsAvailabilities.items)
        }
      }).finally(function () {
        setLoading(false);
      })
    }
    else setPage(0)
  }, [appNavigator.isFocused])

  useEffect(() => {
    dispatch(setServiceSteps({
      callslot: selectedCallslot
    } as ServiceSteps))
  }, [selectedCallslot.id, selectedCallslot.date])

  return (
    <PageContainer noHeader={isModal} title={params?.title} bottomContent={
      !isModal &&
      <Button
        disabled={!selectedCallslot.id}
        marginT={20}
        marginB={20}
        text={next}
        onPress={() =>
          appNavigator.navigateScreen(routeName.user.service.resume, {
            title: params.title,
            type: params.type
          })
        }
      />
    }>
      <Text bold size={22} marginT={20} color='onSecondary'>{appointmentCallslotLabel}</Text>
      <View style={{ marginTop: 20 }}>
        {
          !!id && callslot.id && <View row><View
            padding={5}
            paddingH={10}
            border={5}
            marginR={10}
            color='primary'
          >
            <Text light size={12} color='white'>
              {dayjs(callslot.date * 1000).format('dddd D MMM')}
            </Text>
          </View>
            <View
              padding={5}
              paddingH={10}
              border={5}
              marginR={10}
              color='primary'
            >
              <Text light size={12} color='white'>
                {callslot.label}
              </Text>
            </View></View>
        }
        {
          callslots.map((item, i) => <CreneauSelect key={i} isNew={!id} timestamp={item.date.timestamp} callslots={item.callslots} label={item.date.label} selectedCallslot={selectedCallslot} setSelectedCallslot={setSelectedCallslot} />)
        }
      </View>
      <Button sm outline underlined noBorder loading={loading} text={showMoreSlots} onPress={incrementPage} />
    </PageContainer>
  );
};

export default ServiceCreneau;
