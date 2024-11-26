import useAppNavigator from "hooks/useAppNavigator";
import { useSelector } from "react-redux";
import routeName from "routes/routeName";
import { rootState } from "store/reducer";
import { ImageBackground, Text, TouchableOpacity, View } from "widget/Native";

type IProps = {
    id: string;
    type: string;
    description: string;
    uri: string;
}

const LinkCard = (props: IProps) => {
    const { id, type, description, uri } = props;
    const navigator = useAppNavigator();

    const theMag = useSelector((state: rootState) => state.magReducer.magDatas.translation.theMag);
    const inspiration = useSelector((state: rootState) => state.inspirationReducer.inspirationDatas.translation.inspiration);
    const addressesListTitle = useSelector((state: rootState) => state.addressReducer.addressDatas.translation.addressesListTitle);

    const goToLink = async () => {
        const item = {
            id,
            title: description,
            thumbnail: { urlLq: uri, urlHq: uri }
        }

        navigator.navigateScreen(
            type === "fiche_destination"
                ? routeName.tab.inspiration.destination
                : type === "fiche_partenaires"
                    ? routeName.tab.address.card
                    : routeName.tab.mag.article,
            {
                article: item,
                detail: item,
            },
        );
    }

    const fiche = (type === "fiche_destination" ? inspiration : (type === "fiche_partenaires" ? addressesListTitle : theMag)).toUpperCase()
    return (
        <TouchableOpacity onPress={goToLink} >
            <View color='secondary' border={10} marginT={2}>
                <ImageBackground ImageProps={{
                    source: { uri },
                    resizeMode: 'cover'
                }} height={108} fullWidth minWidth={190} borderT={10} />
                <View padding={10}>
                    <Text children={fiche} size={8} bold marginV={10} />
                    <Text children={description} size={13} rosha />
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default LinkCard;