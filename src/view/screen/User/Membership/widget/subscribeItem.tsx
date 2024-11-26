import { Source } from "react-native-fast-image";
import Icon from "react-native-vector-icons/Feather";
import { ActivityIndicator, ImageBackground, Text, TextHtml, TouchableOpacity, View } from "widget/Native"
import LinearGradient from "widget/Native/LinearGradient";
import TouchableView from "widget/Native/TouchableView";

type IProps = { title: string; description?: string; check?: boolean, hasBorder?: boolean, loading?: boolean, mini?: boolean, price?: string, noPrice?: boolean, oldPrice?: string, uri?: string, image?: Source, onPress?: () => void }

const SubscribeItem = ({ title, description, check, hasBorder, loading, mini, price, oldPrice, noPrice, uri, image, onPress }: IProps) => {
    return (
        <View>
            <TouchableView disabled={loading} opacity={loading ? 0.3 : 1} noPadding marginT={mini ? 20 : 0} marginB={mini ? 0 : 20} onPress={check ? undefined : onPress}>
                {!!oldPrice && <View absolute={1} right={20} top={-7} paddingV={2} paddingH={5} border={15} color='primary'><Text bold size={15} through color='white'>{oldPrice}</Text></View>}
                <ImageBackground dark={hasBorder} ImageProps={{ source: image ? image : { uri } }} padding={mini && !!price ? 20 : (!!description ? 60 : 40)} height={!!description? 290 : undefined} borderC="primary" borderW={hasBorder ? 3 : 0} iCenter center border={hasBorder? 20 : 25}>
                    {!hasBorder && <LinearGradient
                    colors={[
                        '#000000A6',
                        '#00000000',
                    ]}
                    locations={[0, 1]} />}
                    <Text rosha size={20} center color='white' marginH={mini ? 10 : 20}>{title}</Text>
                    {!!description && <View marginH={10} marginT={20}><TextHtml light color='white' center size={15} opacity={0.8}>{description}</TextHtml></View>}
                    {check ? <View padding={5} marginT={20} border={15} color='primary'><Icon name='check' color='white' /></View> : !!price && <View marginT={20} paddingV={5} paddingH={15} border={20} hexColor='#00000088'><Text bold size={15} color='white'>{price}</Text></View>}
                    {noPrice && !check && <View marginT={20} size={30} border={15} center iCenter hexColor='#000000CC'><Icon name="plus" size={17} color='white' /></View>}
                </ImageBackground>
            </TouchableView>
            {loading && <View absolute top={0} left={0} right={0} bottom={0} center><ActivityIndicator /></View>}
        </View>
    )
}

export default SubscribeItem;