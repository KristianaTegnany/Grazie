import { images } from "assets/images"
import { useSelector } from "react-redux";
import { rootState } from "store/reducer";
import colors from "themes/colors"
import { Button, Image, ImageBackground, Text, View } from "widget/Native"

const NoSubscription = ({ title, description, onPress }: { title: string, description?: string, onPress?: () => void }) => {
    const {
        seeSubscriptionsPlans
    } = useSelector((state: rootState) => state.appReducer.membershipDatas.translation);
    return (
        <ImageBackground ImageProps={{ source: images.FacePattern, style: { backgroundColor: colors.secondary, opacity: 0.5 } }} iCenter padding={20} border={20}>
            <Image source={images.subscription.Visage} width={60} height={60} />
            <Text center marginV={20} size={18} bold>{title}</Text>
            {!!description && <Text center size={15} light marginB={onPress? 20 : 0} color='onSecondary'>{description}</Text>}
            {onPress && <View fullWidth marginT={20} paddingH={20}><Button text={seeSubscriptionsPlans} md onPress={onPress} /></View>}
        </ImageBackground>
    )
}

export default NoSubscription
