import useAppNavigator from 'hooks/useAppNavigator';
import React, { useEffect, useState } from 'react';
import OrderItem from './Widget/OrderItem';
import { ActivityIndicator, Button, Text, View } from 'widget/Native';
import PageContainer from 'widget/Container/PageContainer';
import { useDispatch, useSelector } from 'react-redux';
import { rootState } from 'store/reducer';
//import ActionCard from 'widget/Card/ActionCard';
import BottomModal from 'widget/Modal/PositionnedModal';
import ServiceCreneau from '../ServiceItem/Step/ServiceCreneau';
import { service } from 'services/utils/constants';
import Apollo from 'services/utils/apollo';
import { IAddOrder, UserService } from 'services/applicatif/user/userService';
import dayjs from 'dayjs';
import Toast from 'react-native-toast-message';
import { setServiceSteps } from 'store/slice/user/userSlice';
import { ServiceSteps } from 'store/slice/user/type';
import routeName from 'routes/routeName';
import ActionCard from 'widget/Card/ActionCard';
import { downloadFile } from 'services/utils/download';

const OrderDetailScreen = () => {
  const navigator = useAppNavigator();
  const { id }: { id: number } = navigator.getParams();
  const dispatch = useDispatch();

  const {
    download,
    editAppointment,
    modifyMyOrder,
    showInvoice
  } = useSelector((state: rootState) => state.userReducer.serviceDatas.translation)

  const {
    callslot,
  } = useSelector((state: rootState) => state.userReducer.serviceSteps);

  //const [loading, setLoading] = useState(false)
  const [order, setOrder] = useState<any>()
  const [modalCreneau, setModalCreneau] = useState(false)

  const onPress = () => {
    downloadFile({ fileName: order.attachedFile.title, source: order.attachedFile.url })
  }

  const onEditPress = () => {

    if (order?.status.machineName === "awaiting_payment") {
      dispatch(setServiceSteps({
        id: order.id,
        region: {
          id: order.region.id,
          label: order.region.label,
        },
        startDate: order.travelDates.start.html,
        endDate: order.travelDates.end.html,
        contactType: {
          id: order.contactMethod.machineName,
          label: order.contactMethod.label,
        },
        quantity: order.quantity,
        nbPers: order.travelersNumber,
        hasHotel: order.isHosted,
        hotel: order.accommodationName,
        phoneCode: "+" + order.phone?.countryCode,
        phoneNumber: order.phone?.number,
        priorities: order.travelPurposes?.map((item: any) => item.machineName),
        callslot: { id: order.appointment?.callslot.id, label: order.appointment?.callslot.label, date: order.appointment?.date.timestamp },
        travel: {
          start: order.conciergeDate?.timestamp,
          end: order.conciergeDate?.timestamp ? dayjs(order.conciergeDate?.timestamp * 1000).add(order.quantity || 0, "day").unix() : null
        }
      } as ServiceSteps))
      navigator.navigateScreen(routeName.user.service.place, {
        type: order.product.reference,
        title: order.product.title
      })
    }
    else {
      dispatch(setServiceSteps({
        callslot: { id: order?.appointment?.callslot.id, label: order.appointment?.callslot.label, date: order?.appointment?.date.timestamp }
      } as ServiceSteps))
      setModalCreneau(true)
    }
  }

  const updateCreneauOrder = () => {
    //setLoading(true)
    if (order?.status.machineName === "awaiting_payment") {
      UserService.updateOrder(order.id, {
        callslot: parseInt(callslot.id),
        date: dayjs(callslot.date * 1000).format('YYYY-MM-DD'),
      }).then((data: IAddOrder) => {
        Toast.show({ text2: data.message, type: data.success ? 'success' : 'error' })
        //setLoading(false)
      })
    } else {
      UserService.postponeOrder(order.appointment?.id, {
        callslot: parseInt(callslot.id),
        date: dayjs(callslot.date * 1000).format('YYYY-MM-DD'),
      }).then((data: IAddOrder) => {
        if (data.success) {
          dispatch(setServiceSteps({
            callslot: {}
          } as ServiceSteps))
          getOrder(order.id)
        }
        Toast.show({ text2: data.message, type: data.success ? 'success' : 'error' })
        //setLoading(false)
      })
    }
  }

  function getOrder(id: number) {
    Apollo.getServiceOrder(id).then(data => {
      setOrder(data?.order)
    })
  }

  useEffect(() => {
    if (modalCreneau && order?.id && callslot.id && (order.appointment?.callslot.id !== callslot.id || order.appointment?.date.timestamp !== callslot.date)) {
      updateCreneauOrder()
    }
  }, [modalCreneau, callslot.id, callslot.date])

  useEffect(() => {
    if (id) {
      getOrder(id)
    }
  }, [id])

  return (
    <>
      <PageContainer hasBackground title={order?.status.machineName === "awaiting_payment" ? editAppointment : modifyMyOrder} bottomContent={
        order?.attachedFile && <View>
          <ActionCard type='service' title={order?.product?.title} description={order?.attachedFile?.title} btnText={download} onPress={onPress} />
          {/*<ActionCard type='invoice' title={showInvoice} description={'Commande n° 035678792 - Effectué le 26 décembre à 12h30'} btnText={download} onPress={onPress} />*/}
        </View>
      }>
        {!order?.id && <ActivityIndicator padding={20} />}
        {order?.id &&
          <>
            <View flex paddingT={20} color='white'>
              <OrderItem data={order} />
            </View>
            <Text size={15}>{order.description?.replaceAll("\\n", "\n")}</Text>
            {
              order.product?.reference !== service.PC && order.status.machineName !== "finished" && (order.product?.reference !== service.SC || order.status.machineName === "awaiting_payment") && <Button
                text={order.status.machineName === "awaiting_payment" ? editAppointment : modifyMyOrder}
                onPress={onEditPress}
                outline
                md
                marginT={40}
              />
            }
          </>}
      </PageContainer >
      <BottomModal modal={modalCreneau} setModal={setModalCreneau}>
        <ServiceCreneau isModal />
      </BottomModal>
    </>
  );
};

export default OrderDetailScreen;

