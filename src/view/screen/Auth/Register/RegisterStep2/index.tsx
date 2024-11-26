//import {AppContext} from 'context/AppContext';
import { useIsFocused, useRoute } from '@react-navigation/native';
import useRegisterInfoCtr from '../useRegisterInfoCtr';
import useStatusBar from 'hooks/useStatusBar';
import React, { useState } from 'react';
import { Text, View } from 'widget/Native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { rootState } from 'store/reducer';
import OnlyBackBtn from 'widget/Header/OnlyBackBtn';
import LineProgress from '../widget/LineProgress';
import AuthBackground from 'widget/Container/AuthBackground';
import Button from 'widget/Native/Button';
import { Container, Content, Title } from '../widget';
import AnySizeDragSortable, { IOrderItem } from 'widget/Drag/DragSortableView';

const RegisterStep2 = () => {
  const { bottom, top } = useSafeAreaInsets();
  useStatusBar('light-content');
  const ctr = useRegisterInfoCtr();
  const isFocused = useIsFocused();
  const { params } = useRoute<any>();

  const {
    translation: {
      createMyAccount,
      youWouldRather,
      youWouldRatherDescription,
      next: btnNext
    },
    taxonomy: {
      user: {
        profiles
      }
    }
  } = useSelector((state: rootState) => state.authReducer.authDatas);

  const [orderedItems, setOrderedItems] = useState<IOrderItem[]>(
    profiles.map(profile => {
      return { ...profile, isMoved: false };
    })
  );

  const next = () => {
    ctr?.goToStep3({
      ...params,
      profileTypes: orderedItems.map(item => item.id),
    });
  };

  const onDataChange = (data: any[], callback: any) => {
    if (isFocused) {
      setOrderedItems(Object.assign([], data));
      callback();
    }
  }

  return (
    <AuthBackground>
      <OnlyBackBtn noBackground />
      <Container paddingT={top}>
        <Content>
          <Title>{createMyAccount}</Title>
          <LineProgress width={75} />
          <View>
            <Text size={20} bold color='white' marginT={20}>
              {youWouldRather}
            </Text>
            <Text marginT={15} color='white'>
              {youWouldRatherDescription}
            </Text>
          </View>
          <View flex row wrap marginT={20}>
            <AnySizeDragSortable data={orderedItems}
              onDataChange={onDataChange} />
          </View>
          <View fullWidth marginB={bottom || 20}>
            <Button
              text={btnNext}
              onPress={next}
              md
            />
          </View>
        </Content>
      </Container>
    </AuthBackground>
  );
};

export default RegisterStep2;
