import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import { useSelector } from "react-redux";
import CenterModal from "screen/Tab/widget/CenterModal"
import { FavoriteService } from "services/applicatif/favorite/favoriteService";
import { rootState } from "store/reducer";
import { Button, Input, View } from "widget/Native";
import { List } from "../favoriteCtr";

type IProps = {
    id?: string
    name?: string
    modal: boolean
    callback?: () => void
    close: () => void
    setLists?: (lists: List[]) => void
}

const AddOrEditList = ({ id, name, modal, callback, close }: IProps) => {
    const {
        save,
        nameYourList,
    } = useSelector((state: rootState) => state.favoriteReducer.favoriteDatas.translation);

    const [listName, setListName] = useState('')
    const [loading, setLoading] = useState(false)

    const onSaveList = async () => {
        setLoading(true)
        let res: any

        if (id) {
            res = await FavoriteService.renameList(id, listName)
        }
        else {
            res = await FavoriteService.addList(listName)
        }

        if (res.success && callback) {
            callback()
        }

        Toast.show({ text2: res.message, type: res.success ? 'success' : 'error' })
        beforeClosing()
        setLoading(false)
    }

    const onListNameChange = (value: string) => {
        setListName(value)
    }

    const beforeClosing = () => {
        setListName('')
        close()
    }

    useEffect(() => {
        if (name) setListName(name)
    }, [name])

    return (
        <CenterModal modal={modal} closeModal={beforeClosing} title={nameYourList} bottom={<View>
            <Input onChange={onListNameChange} value={listName} />
            <Button sm disabled={!listName} onPress={onSaveList} text={save} marginT={20} paddingH={20} loading={loading} />
        </View>} />
    )
}

export default AddOrEditList;