import { Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { Text, TouchableOpacity, View } from "widget/Native";
import FeatherIcon from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/AntDesign';
import colors from "themes/colors";
import { rootState } from "store/reducer";

const MapHeader = ({noTravel, openFilter, openTravel, } : {noTravel: boolean, openFilter: () => void, openTravel: () => void }) => {
    
    const { filters } = useSelector((state: rootState) => state.mapReducer.mapDatas.translation);
    const { top } = useSafeAreaInsets();
    const styles = Platform.select({
        ios: {
            padding: 10,
        },
        android: {
            padding: 5,
        }
    })

    return(
        <View row>
            <TouchableOpacity onPress={openTravel} marginR={10} padding={styles?.padding} color='white' border={35} center iCenter>
                {noTravel && <View absolute={1} top={-2.5} right={-2.5} size={15} border={7.5} color='primary' />}
                <FeatherIcon name='calendar' size={20} color={colors.onSecondary} />
            </TouchableOpacity>
            <TouchableOpacity onPress={openFilter} padding={styles?.padding} paddingL={20} paddingR={10} color='white' border={20} row center iCenter>
                <Text size={16} medium marginR={10}>{filters}</Text>
                <Icon name='right' size={15} />
            </TouchableOpacity>
        </View>
    )
}

export default MapHeader