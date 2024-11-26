/* eslint-disable react-native/no-inline-styles */
import { ScrollView, Text, TouchableOpacity, View } from 'widget/Native';
import React, { useState } from 'react';
import colors from 'themes/colors';
import useAppNavigator from 'hooks/useAppNavigator';
import routeName from 'routes/routeName';
import PageContainer from 'widget/Container/PageContainer';
import { useDispatch, useSelector } from 'react-redux';
import { rootState } from 'store/reducer';
import { setServiceSteps } from 'store/slice/user/userSlice';
import { ServiceSteps } from 'store/slice/user/type';

type ItemProps = {
  active?: boolean;
  id: string;
  isModal?: boolean;
  pressed: boolean;
  text: string;
  type: string;
  title: string;
  setPressed: (pressed: boolean) => void;
};

const ServicePlaceItem = (props: ItemProps) => {
  const appNavigator = useAppNavigator();
  const dispatch = useDispatch();

  return (
    <TouchableOpacity
      onPress={() => {
        dispatch(setServiceSteps({
          region: {
            id: props.id,
            label: props.text
          }
        } as ServiceSteps))
        if (!props.isModal)
          appNavigator.navigateScreen(routeName.user.service.date, {
            type: props.type,
            title: props.title,
          })
      }}
      onPressIn={() => props.setPressed(true)}
      style={{
        backgroundColor: props.pressed
          ? colors.secondary
          : colors.quartenary,
        padding: 20,
        marginBottom: 10,
        borderRadius: 10,
      }}>
      <Text size={14} bold={props.pressed} color={'onSecondaryDark'}>
        {props?.text}
      </Text>
    </TouchableOpacity>
  );
};

type IProps = {
  isModal?: boolean;
  parentTitle: string;
  parentType: string;
};

const ServicePlace: any = ({ isModal, parentTitle, parentType }: IProps) => {
  const appNavigator = useAppNavigator();
  const params: { type: string; title: string } = appNavigator.getParams();

  const type = params?.type || parentType,
    title = params?.title || parentTitle

  const {
    region,
  } = useSelector((state: rootState) => state.userReducer.serviceSteps);

  const {
    orderDestinationLabel,
    orderDestinationDescription
  } = useSelector((state: rootState) => state.userReducer.serviceDatas.translation)

  const { regions } = useSelector((state: rootState) => state.inspirationReducer.inspirationDatas.taxonomy);
  const [places, setPlaces] = useState(regions.map(region => { return { id: region.id, label: region.label, active: false } }));

  const togglePlaces = (index: number) => {
    setPlaces(
      places.map((item, i) => {
        return { ...item, active: i === index };
      }),
    );
  };

  return (
    <PageContainer noHeader={isModal} title={title}>
      <Text size={22} bold marginT={20} color='onSecondary'>{orderDestinationLabel}</Text>
      <Text size={12} marginT={10} color='onSecondaryDark'>{orderDestinationDescription}</Text>
      <View marginT={30}>
        {places.map((item, i) => (
          <ServicePlaceItem
            key={i}
            id={item.id}
            isModal={isModal}
            text={item.label}
            active={item.active}
            type={type}
            title={title}
            pressed={item.id === region.id || item.active}
            setPressed={() => togglePlaces(i)}
          />
        ))}
      </View>
    </PageContainer>
  );
};

export default ServicePlace;
