import { Image, Text, TextHtml, TouchableOpacity, View } from 'widget/Native';
import React, { useEffect, useRef } from 'react';
import routeName from 'routes/routeName';
import useAppNavigator from 'hooks/useAppNavigator';
import { Button } from 'widget/Native';
import CardLayout from 'screen/Tab/widget/CardLayout';
import { ScrollView as RNScrollView } from 'react-native';
import PageContainer from 'widget/Container/PageContainer';
import { useDispatch, useSelector } from 'react-redux';
import { rootState } from 'store/reducer';
import { resetServiceSteps } from 'store/slice/user/userSlice';

const ServiceItem = () => {
  const ref = useRef<RNScrollView>(null)

  const appNavigator = useAppNavigator();
  const dispatch = useDispatch();

  const { type }: { type: string } = appNavigator.getParams();

  const {
    items
  } = useSelector((state: rootState) => state.userReducer.serviceDatas.serviceProducts)

  const {
    details,
    gigissimoServices,
    seeOthersServices,
    servicesIntroDescription,
    termsAndConditions,
  } = useSelector((state: rootState) => state.userReducer.serviceDatas.translation)

  const service = items?.filter(item => item.reference === type)[0];

  useEffect(() => {
    dispatch(resetServiceSteps())
  }, [])

  return (
    <PageContainer forwardRef={ref} hasBackground noPaddingB noPaddingH title={gigissimoServices}>
      <View paddingH={20}>
        <View flex row between iCenter marginT={20}>
          <Text flex bold size={34} marginR={20} color='onSecondaryDark'>{service?.title}</Text>
          <Text bold size={22} color='onSecondaryDark'>{service?.price.formatted}</Text>
        </View>
        <Text marginV={20} color='onSecondary'>{service.description}</Text>
        <View marginT={20} padding={20} border={20} color='tertiary'>
          <Text rosha size={17} color='onSecondaryDark' marginB={20}>{details}</Text>
          {service.details?.map((detail: any, i: number) =>
            <View key={i} flex row marginB={i === 0 ? 10 : 0}>
              <Image source={{ uri: detail.media?.urlLq }} height={20} width={20} resizeMode='contain' marginR={10} />
              <View flex><TextHtml size={12} color='onSecondary'>{detail.contentHtml}</TextHtml></View>
            </View>
          )}
        </View>
        <Text size={14} marginT={20} color='onSecondary'>{service.extraInfo}</Text>
        <TouchableOpacity
          onPress={() => {
            appNavigator.navigateScreen(routeName.user.service.condition, {
              title: service?.title,
              terms: service?.terms
            });
          }}>
          <Text size={14} medium underlined color='primary' marginV={20}>{termsAndConditions}</Text>
        </TouchableOpacity>
        <View>
          <Button
            text={service?.addToCartButtonLabel}
            onPress={() =>
              appNavigator.navigateScreen(routeName.user.service.place, {
                type,
                title: service?.title,
              })
            }
          />
        </View>
      </View>
      <View marginT={20} paddingT={20} paddingB={40} borderT={20} color='tertiary'>
        <Text rosha size={17} color='onSecondaryDark' marginH={20} marginB={20}>{seeOthersServices}</Text>
        <Text size={12} light color='onSecondaryDark' marginH={20} marginB={20}>{servicesIntroDescription}</Text>
        <RNScrollView horizontal showsHorizontalScrollIndicator={false}>
          {items
            .filter(item => item.reference !== type)
            .map((item, i) => (
              <CardLayout
                key={i}
                dark
                size='sm'
                type='sqr'
                marginL={i === 0 ? 20 : 10}
                source={{ uri: item.thumbnail?.urlLq }}
                poster
                title={item.title}
                onPress={() => {
                  ref.current?.scrollTo({ x: 0, animated: true });
                  appNavigator.navigateScreen(routeName.user.service.item, {
                    type: item.reference,
                  })
                }}
              />
            ))}
        </RNScrollView>
      </View>
    </PageContainer>
  );
};

export default ServiceItem;
