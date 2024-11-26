import React, { useState } from 'react';
import { Text, View } from 'widget/Native';
import OnlyBackBtn from 'widget/Header/OnlyBackBtn';
import NoAuthGradient from 'widget/Container/AuthBackground';
import useStatusBar from 'hooks/useStatusBar';
import LineProgress from '../widget/LineProgress';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { rootState } from 'store/reducer';
import useRegisterInfoCtr from '../useRegisterInfoCtr';
import { useIsFocused, useRoute } from '@react-navigation/native';
import Button from 'widget/Native/Button';
import { Container, Content, Title } from '../widget';
import AnySizeDragSortable, { IOrderItem } from 'widget/Drag/DragSortableView';

const RegisterStep3 = () => {
  const { bottom, top } = useSafeAreaInsets();
  useStatusBar('light-content');
  const ctr = useRegisterInfoCtr();
  const isFocused = useIsFocused();

  const { params } = useRoute<any>();

  const {
    translation: {
      createMyAccount,
      whatDoYouLike,
      whatDoYouLikeDescription,
      finish
    },
    taxonomy: {
      user: {
        whishes
      }
    }
  } = useSelector((state: rootState) => state.authReducer.authDatas);

  const [orderedItems, setOrderedItems] = useState<IOrderItem[]>(
    whishes.map(whish => {
      return { ...whish, isMoved: false };
    })
  );

  const next = () => {
    ctr?.goToHome({
      ...params,
      whishes: orderedItems.map(item => item.id),
    });
  };

  const onDataChange = (data: any[], callback: any) => {
    if (isFocused) {
      setOrderedItems(Object.assign([], data));
      callback();
    }
  }

  return (
    <NoAuthGradient blurRadius={10}>
      <OnlyBackBtn noBackground />
      <Container paddingT={top}>
        <Content>
          <Title>{createMyAccount}</Title>
          <LineProgress width={100} />
          <View>
            <Text size={20} bold color='white' marginT={20}>
              {whatDoYouLike}
            </Text>
            <Text marginT={15} color='white'>
              {whatDoYouLikeDescription}
            </Text>
          </View>
          <View flex row wrap marginT={20}>
            <AnySizeDragSortable data={orderedItems}
              onDataChange={onDataChange} />
          </View>
          <View fullWidth marginB={bottom || 20}>
            <Button
              loading={ctr?.loading}
              text={finish}
              onPress={next}
              md
            />
          </View>
        </Content>
      </Container>
    </NoAuthGradient>
  );
};

export default RegisterStep3;
