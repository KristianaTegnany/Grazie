import { TouchableOpacity, View } from "widget/Native"
import PrivateModalContent from "./PrivateModalContent";
import BottomModal from "widget/Modal/PositionnedModal";
import Icon from "react-native-vector-icons/AntDesign";

const PrivateModal = ({ modal, closeModal, callback }: { modal: boolean, closeModal: (auto?: boolean) => void, callback?: () => void}) => {
    const afterClosedAuto = () => {
        closeModal(true)
        if(callback)
            callback()
    }
    const close = () => closeModal()
    return (
        <BottomModal wrapContent modal={modal} nonDismissible setModal={close}>
            <View absolute={1} top={20} right={20} ><TouchableOpacity onPress={close}><Icon name='close' size={20} /></TouchableOpacity></View>
            <PrivateModalContent hasFlag afterClosedAuto={afterClosedAuto} />
        </BottomModal>
    )
}

export default PrivateModal;