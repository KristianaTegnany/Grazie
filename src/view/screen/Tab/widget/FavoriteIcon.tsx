import { FavoriteService } from "services/applicatif/favorite/favoriteService";
import ListsChoiceModal from "../Favorite/ListsChoiceModal";
import ButtonIcon from "./ButtonIcon"
import { useState } from "react";
import Toast from "react-native-toast-message";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import { useSelector } from "react-redux";
import { rootState } from "store/reducer";

type IProps = {
    articleId?: string;
    dark?: boolean;
    isFavorite?: boolean;
    size?: 'xs' | 'md' | 'lg';
    callback?: (id: string) => void;
}

const FavoriteIcon = ({ dark, isFavorite, articleId, size, callback }: IProps) => {

    const [loading, setLoading] = useState(false)
    const [listsChoiceModal, setListsChoiceModal] = useState(false)
    const [modalDeleteFavorite, setModalDeleteFavorite] = useState(false)

    const {
        translation: { removeFromAllListsConfirm },
    } = useSelector((state: rootState) => state.favoriteReducer.favoriteDatas);

    const saveFavorite = (ids: string[]) => {
        setLoading(true)
        FavoriteService.addFavorite(articleId!, ids).then(async res => {
            if (res.success && callback) {
                await callback(articleId!)
            }
            setLoading(false)
            Toast.show({ text2: res.message, type: res.success ? 'success' : 'error' })
        }).catch(function () {
            setLoading(false);
        });
    }

    function onFavoritePress() {
        if (isFavorite) {
            setModalDeleteFavorite(true)
        }
        else {
            setListsChoiceModal(true)
        }
    }


    const onDeleteFavorite = () => {
        setModalDeleteFavorite(false)
        setLoading(true)
        FavoriteService.removeFavorite(articleId!).then(async res => {
            if (res.success && callback) {
                await callback(articleId!)
            }
            setLoading(false)
            Toast.show({ text2: res.message, type: res.success ? 'success' : 'error' })
        }).catch(function () {
            setLoading(false);
        })
    }

    return (
        <>
            <ButtonIcon loading={loading} size={size} type="favorite" onPress={onFavoritePress} isFavorite={isFavorite} />
            <ConfirmDeleteModal title={removeFromAllListsConfirm} modal={modalDeleteFavorite} setModal={setModalDeleteFavorite} onPress={onDeleteFavorite} />
            <ListsChoiceModal dark={dark} modal={listsChoiceModal} setModal={setListsChoiceModal} onPress={saveFavorite} />
        </>
    )
}

export default FavoriteIcon;