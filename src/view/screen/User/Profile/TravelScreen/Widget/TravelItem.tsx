import dayjs from 'dayjs';
import useAppNavigator from 'hooks/useAppNavigator';
import React, { useState } from 'react';
import Toast from 'react-native-toast-message';
import { useSelector } from 'react-redux';
import routeName from 'routes/routeName';
import ConfirmDeleteModal from 'screen/Tab/widget/ConfirmDeleteModal';
import { UserService } from 'services/applicatif/user/userService';
import { rootState } from 'store/reducer';
import { ITravel } from 'store/slice/user/type';
import { Image, Text, View } from 'widget/Native';
import LinkText from 'widget/Text/LinkText';

const TravelItem = ({ data, afterDelete }: { data: ITravel, afterDelete: () => void }) => {
    const navigator = useAppNavigator()
    const {
        translation: {
            dateFrom,
            dateTo,
            edit,
            deleteTravel,
            deleteTravelSuccess,
            travelConfirmDeleteText
        }
    } = useSelector((state: rootState) => state.userReducer.travelDatas);

    const [loading, setLoading] = useState(false)
    const [modalDelete, setModalDelete] = useState(false)
    const goToEdit = () => navigator.navigateScreen(routeName.user.travel.place, { travel: data })
    const beforeDelete = () => {
        setModalDelete(true)

    }
    const onDelete = () => {
        setLoading(true)
        UserService.deleteTravel(data.id).then(async () => {
            await afterDelete()
            Toast.show({ text2: deleteTravelSuccess, type: "success" })
        }).catch((e) => console.log(e))
    }

    return (
        <View iCenter paddingH={10} paddingB={20} marginB={20} borderBW={1} borderC='onTertiary' row>
            <Image source={{ uri: data.region.media?.urlLq }} poster width={80} height={80} border={10} />
            <View marginL={10} flex>
                <Text size={14} bold>{data.title}</Text>
                <Text size={12} color='onSecondaryLight' marginV={2}>{`${dateFrom} ${dayjs(data.startAt, 'YYYY-MM-DD').format('D MMMM')} ${dateTo.toLowerCase()} ${dayjs(data.endAt, 'YYYY-MM-DD').format('D MMMM')}`}</Text>
                <Text size={12} color='onSecondaryLight' marginV={2}>{data.region?.label}</Text>
                <View row><LinkText marginR={10} text={edit} size={12} bold onPress={goToEdit} /><LinkText text={deleteTravel} size={12} bold onPress={beforeDelete} /></View>
            </View>
            <ConfirmDeleteModal loading={loading} title={travelConfirmDeleteText} modal={modalDelete} setModal={setModalDelete} onPress={onDelete} />
        </View>
    );
};

export default TravelItem;
