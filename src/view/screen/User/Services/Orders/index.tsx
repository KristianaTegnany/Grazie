import useAppNavigator from 'hooks/useAppNavigator';
import React, { useEffect, useState } from 'react';
import OrderItem from './Widget/OrderItem';
import { ActivityIndicator, Text, View } from 'widget/Native';
import { useSelector } from 'react-redux';
import { rootState } from 'store/reducer';
import Apollo from 'services/utils/apollo';
import NoSubscription from 'screen/User/Membership/widget/NoSubscription';

const OrdersScreen = () => {
  const navigator = useAppNavigator();

  const {
    myOrders,
    noOrderYet,
  } = useSelector((state: rootState) => state.userReducer.serviceDatas.translation)

  const [loading, setLoading] = useState(false)
  const [orders, setOrders] = useState<any[]>([])

  useEffect(() => {
    if (navigator.isFocused) {
      setLoading(true)
      Apollo.getServiceOrders().then(data => {
        if (data.myOrders?.items)
          setOrders(data.myOrders.items)
      }).finally(function () {
        setLoading(false);
      })
    }
  }, [navigator.isFocused])

  return (
    <View flex marginT={10} paddingB={20}>
      {loading && <ActivityIndicator flex center paddingB={20} />}
      {orders.length > 0 && <Text marginH={20} size={22} bold marginB={20}>{myOrders}</Text>}
      {
        orders.map((order, i) => <OrderItem key={i} data={order} isLast={i == orders.length - 1} />)
      }
      {orders.length > 0 && <View height={10} color='secondary' />}
      {!loading && orders.length === 0 && <View paddingH={22}><NoSubscription title={noOrderYet} /></View>}
    </View>
  );
};

export default OrdersScreen;

