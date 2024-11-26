/* eslint-disable react-native/no-inline-styles */
import { ScrollView, Text, TouchableOpacity, View } from 'widget/Native';
import React, { useState } from 'react';
import colors from 'themes/colors';
import useAppNavigator from 'hooks/useAppNavigator';
import routeName from 'routes/routeName';
import TitleBackBtn from 'widget/Header/TitleBackBtn';
import { useSelector } from 'react-redux';
import { rootState } from 'store/reducer';
import { ITravel } from 'store/slice/user/type';

type ItemProps = {
  pressed?: boolean;
  text: string;
  onPress: () => void;
  setPressed: (pressed: boolean) => void;
};

const TravelPlaceItem = (props: ItemProps) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      onPressIn={() => props.setPressed(true)}
      style={{
        backgroundColor: props.pressed
          ? colors.secondary
          : colors.quartenary,
        padding: 20,
        marginBottom: 10,
        borderRadius: 10,
      }}>
      <Text size={14} bold={props.pressed} color='onSecondaryDark'>
        {props?.text}
      </Text>
    </TouchableOpacity>
  );
};

const TravelPlace = () => {
  const navigator = useAppNavigator();
  const { travel } = navigator.getParams<{ travel: ITravel }>();
  const { regions } = useSelector((state: rootState) => state.addressReducer.addressDatas.taxonomy);
  const {
    editTravel,
    newTravel,
    travelChooseRegionTitle,
    travelChooseRegionText
  } = useSelector((state: rootState) => state.userReducer.travelDatas.translation);

  const [places, setPlaces] = useState<any[]>(travel ? regions.map(region => {
    return { ...region, active: region.id === travel.region.id };
  }) : regions)

  const togglePlaces = (index: number) => {
    setPlaces(
      places.map((item, i) => {
        return { ...item, active: i === index };
      }),
    );
  };

  return (
    <View flex color='white'>
      <TitleBackBtn title={travel ? editTravel : newTravel} />
      <ScrollView paddingH={20}>
        <Text size={22} bold marginT={20}>{travelChooseRegionTitle}</Text>
        <View style={{ marginTop: 30 }}>
          {places.map((item, i) => (
            <TravelPlaceItem
              key={i}
              text={item.label}
              pressed={item.active}
              onPress={() =>
                navigator.navigateScreen(routeName.user.travel.date, { id: item.id, travel })
              }
              setPressed={() => togglePlaces(i)}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default TravelPlace;
