import { Button, CheckBox, View } from "widget/Native";
import CenterModal from "./CenterModal"
import { rootState } from "store/reducer";
import { useSelector } from "react-redux";
import { useState } from "react";

type IProps = {
    checkbox?: boolean;
    checkboxText?: string;
    loading?: boolean;
    modal: boolean;
    title: string;
    onPress: (checkboxValue?: boolean) => void;
    setModal: (modal: boolean) => void;
}
const ConfirmDeleteModal = ({ checkbox, checkboxText, loading: isLoading, modal, title, onPress, setModal }: IProps) => {

    const {
        yes,
        no
    } = useSelector((state: rootState) => state.authReducer.noAuthDatas.translation);

    const [loading, setLoading] = useState(isLoading)
    const [checkboxValue, setCheckboxValue] = useState(false)

    const closeModal = () => {
        setModal(false)
    }

    const onChecked = () => {
        setCheckboxValue(prev => !prev)
    }

    const onValid = async () => {
        setLoading(true)
        await onPress(checkboxValue)
        closeModal()
        setLoading(false)
    }

    return (
        <CenterModal modal={modal} type='delete' closeModal={closeModal} title={title} bottom={<View fullWidth iCenter>
            {checkbox && <CheckBox text={checkboxText} value={checkboxValue} sm dark onChecked={onChecked} />}
            <View row between marginT={20}>
                <Button flex sm onPress={closeModal} text={no} outline />
                <Button flex sm onPress={onValid} text={yes} marginL={10} loading={loading} />
            </View>
        </View>} />
    )
}

export default ConfirmDeleteModal