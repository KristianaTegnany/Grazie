import useAppNavigator from 'hooks/useAppNavigator';
import React, { useEffect, useState } from 'react';
import routeName from 'routes/routeName';
import TravelItem from './Widget/TravelItem';
import { ActivityIndicator, Button, View } from 'widget/Native';
import TitleBackBtn from 'widget/Header/TitleBackBtn';
import Apollo from 'services/utils/apollo';
import { useSelector } from 'react-redux';
import { rootState } from 'store/reducer';
import useStatusBar from 'hooks/useStatusBar';
import AppLoading from 'widget/Loading/AppLoading';

const TravelScreen = () => {
  useStatusBar('dark-content');
  const navigator = useAppNavigator();

  const {
    travelDatas: {
      translation: {
        myTrips,
        travelAddButtonLabel,
      }
    },
    travels: {
      items
    }
  } = useSelector((state: rootState) => state.userReducer);

  const [loading, setLoading] = useState(false)

  const fetchTravels = async () => {
    setLoading(true)
    await Apollo.getTravels()
    setLoading(false)
  }

  useEffect(() => {
    Apollo.getTravelDatas()
  }, [])

  useEffect(() => {
    if (navigator.isFocused)
      fetchTravels()
  }, [navigator.isFocused])

  return (
    <>
      <TitleBackBtn title={myTrips} />
      <View paddingH={10} flex paddingT={20} color='white'>
        {loading && <ActivityIndicator absolute top={0} left={0} right={0} bottom={0} />}
        {
          items && items.map((travel, i) => <TravelItem key={i} data={travel} afterDelete={fetchTravels} />)
        }
        <View flex padding={20} end>
          {/*<Text style={myOrderStyle.bottomText}>
          Vous n'avez pas d'autres commandes en cours
        </Text>*/}
          <Button
            text={travelAddButtonLabel}
            onPress={() =>
              navigator.navigateScreen(routeName.user.travel.place)
            }
            md
          />
        </View>
      </View>
    </>
  );
};

export default TravelScreen;

