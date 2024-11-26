import { useSafeAreaInsets } from "react-native-safe-area-context";
import { View } from "widget/Native"
import PrivateModalContent from "./PrivateModalContent";
import LinearGradient from "react-native-linear-gradient";

const PrivateLayer = ({ isAddress, isMag }: { isAddress?: boolean, isMag?: boolean }) => {
    const { bottom } = useSafeAreaInsets();

    return (
        <View fullWidth absolute={isAddress} marginT={-130} bottom={0}>
            <LinearGradient
                colors={[
                    'rgba(255,255,255, 0)',
                    'rgba(255,255,255, 1)'
                ]}
                locations={[0, 1]}>
                <View height={130} />
            </LinearGradient>
            <View color="white" fullWidth>
                <View color="secondary" border={10} padding={10} marginH={isAddress ? 10 : 0} marginB={bottom || 20}>
                    <PrivateModalContent isMag={isMag} />
                </View>
            </View>
        </View>
    )
}

export default PrivateLayer;    