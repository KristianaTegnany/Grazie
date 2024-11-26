import { useSelector } from "react-redux";
import { ScrollView as RNScrollView } from "react-native";
import { Button, Text, View } from "widget/Native";
import { rootState } from "store/reducer";
import CardLayout from "screen/Tab/widget/CardLayout";
import useAppNavigator from "hooks/useAppNavigator";
import routeName from "routes/routeName";

const ServicesCard = () => {
    const appNavigator = useAppNavigator();
    const {
        items
    } = useSelector((state: rootState) => state.userReducer.serviceDatas.serviceProducts)

    const {
        servicesIntroTitle,
        servicesIntroDescription,
        helpMeOrganiseMyTrip
    } = useSelector((state: rootState) => state.userReducer.serviceDatas.translation)

    // @ts-ignore
    const onPress = () => appNavigator.navigate(routeName.user.base, {
        screen: routeName.user.service.home
    })

    return (
        <View marginT={20} paddingT={20} paddingB={40} borderT={20} color='tertiary'>
            <Text rosha size={17} color='onSecondaryDark' marginH={20} marginB={20}>{servicesIntroTitle}</Text>
            <Text size={12} light color='onSecondaryDark' marginH={20} marginB={20}>{servicesIntroDescription}</Text>
            <RNScrollView horizontal showsHorizontalScrollIndicator={false}>
                {items.map((item, i) => (
                    <CardLayout
                        key={i}
                        dark
                        size='sm'
                        type='sqr'
                        marginL={i === 0 ? 20 : 10}
                        source={{ uri: item.thumbnail?.urlLq }}
                        poster
                        title={item.title}
                        onPress={() => {
                            appNavigator.navigateScreen(routeName.user.base, {
                                screen: routeName.user.service.item,
                                params: {
                                    type: item.reference
                                }
                            })
                        }}
                    />
                ))}
            </RNScrollView>
            <Button md text={helpMeOrganiseMyTrip} marginH={20} marginT={40} onPress={onPress} />
        </View>
    )
}

export default ServicesCard;