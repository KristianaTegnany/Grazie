import ActionCard from "widget/Card/ActionCard"
import usePermission from "./usePermission";

const PermissionCard = ({ title, description, btnText }: { title?: string, description?: string, btnText?: string }) => {

    const {
        authorized,
        enableNotifications,
        enableNotificationsDescription,
        goToSettings,
        openPermissionSettings
    } = usePermission();

    return !authorized && <ActionCard type='notification' title={title || enableNotifications} description={description || enableNotificationsDescription} btnText={btnText || goToSettings} onPress={openPermissionSettings} />

}

export default PermissionCard;