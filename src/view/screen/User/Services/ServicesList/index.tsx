import React from 'react';
import ServiceItem from './Widget/ServiceItem';
import { Text, View } from 'widget/Native';
import { useSelector } from 'react-redux';
import { rootState } from 'store/reducer';
import PageContainer from 'widget/Container/PageContainer';
import OrdersScreen from '../Orders';
import PermissionCard from 'screen/User/Notification/PermissionCard';

const ServicesList = () => {

  const {
    translation: { gigissimoServices, gigissimoServicesDescription, priceStartingAt,
      enableNotifications,
      servicesNotificationDescription,
      goToSettings,
    },
    serviceProducts: {
      title,
      items
    }
  } = useSelector((state: rootState) => state.userReducer.serviceDatas)

  return (
    <PageContainer title={gigissimoServices} hasShadow noPaddingH bottomContent={
      <View paddingB={20}>
        <PermissionCard title={enableNotifications} description={servicesNotificationDescription} btnText={goToSettings} />
      </View>
    }>
      <OrdersScreen />
      <View paddingH={20}>
        <Text size={25} rosha color='textField' lineHeight={30} marginB={20}>{title}</Text>
        <Text size={15} color='textField' lineHeight={22}>{gigissimoServicesDescription}</Text>
        {items?.filter(item => item.reference).map((service, i) =>
          <ServiceItem key={i} price={service.price.formatted} title={service.title} summary={service.summary} startingAt={service.isPriceStartingAt ? priceStartingAt : undefined} type={service.reference} uri={service.thumbnail?.urlLq} />
        )}
      </View>
    </PageContainer>
  );
};

export default ServicesList;
