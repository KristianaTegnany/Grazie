import { useSelector } from "react-redux";
import { rootState } from "store/reducer";
import { Text, TouchableOpacity, View } from "widget/Native"
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import BottomModal from "widget/Modal/PositionnedModal";
import ConfirmDeleteModal from "../widget/ConfirmDeleteModal";
import { FavoriteService } from "services/applicatif/favorite/favoriteService";
import Toast from "react-native-toast-message";
import ListsChoiceModal from "./ListsChoiceModal";
import useStatusBar from "hooks/useStatusBar";


type IProps = {
    id: string | undefined;
    listId: string;
    modal: boolean;
    callback: () => void;
    setModal: (value: boolean) => void;
}

const ListOptionsModal = ({ id, listId, modal, setModal, callback }: IProps) => {
    const { bottom } = useSafeAreaInsets()

    const {
        translation: {
            options,
            changeList,
            delete: deleteBtn,
            removeFavoriteConfirm,
            removeFromAllLists
        }
    } = useSelector((state: rootState) => state.favoriteReducer.favoriteDatas);

    const [loading, setLoading] = useState(false)
    const [modalDelete, setModalDelete] = useState(false)
    const [listsChoiceModal, setListsChoiceModal] = useState(false)

    const deleteFavorite = async (all?: boolean) => {
        setLoading(true)
        const res = await FavoriteService.removeFavorite(id!, all ? [] : [listId])
        if (res.success)
            await callback()
        setModalDelete(false)
        setModal(false)
        setLoading(false)
        Toast.show({ text2: res.message, type: res.success ? 'success' : 'error' })
    }

    const moveFavorite = async (to: string[]) => {
        setLoading(true)
        const res = await FavoriteService.moveFavorite(id!, listId, to)
        if (res.success)
            await callback()
        setListsChoiceModal(false)
        setModal(false)
        setLoading(false)
        Toast.show({ text2: res.message, type: res.success ? 'success' : 'error' })
    }

    const onDeletePress = () => setModalDelete(true)
    const onChangeListPress = () => setListsChoiceModal(true)

    return (
        <BottomModal modal={modal} setModal={setModal} wrapContent>
            <>
                <View marginB={bottom || 20} paddingH={20}>
                    <Text margin={5} size={15} bold>{options}</Text>
                    <TouchableOpacity onPress={onDeletePress}><Text size={15}>{deleteBtn}</Text></TouchableOpacity>
                    <TouchableOpacity onPress={onChangeListPress}><Text size={15}>{changeList}</Text></TouchableOpacity>
                </View>
                <ListsChoiceModal modal={listsChoiceModal} setModal={setListsChoiceModal} onPress={moveFavorite} dark />
                <ConfirmDeleteModal checkbox checkboxText={removeFromAllLists} loading={loading} title={removeFavoriteConfirm} modal={modalDelete} setModal={setModalDelete} onPress={deleteFavorite} />
            </>
        </BottomModal>
    )
}

export default ListOptionsModal