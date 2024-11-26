import { images } from "assets/images";
import TitleBackBtn from "widget/Header/TitleBackBtn";
import { Image, Text, View } from "widget/Native"

const NotFound = () => {
    return (
        <View flex iCenter color="white">
            <TitleBackBtn title="Page non trouvée" />
            <Image source={images.tab.SearchPlaceholder} width={100} height={100} marginT={40} />
            <Text center size={22} flex marginV={40} color="primary">
                Le contenu n'est plus accessible
            </Text>
        </View>
    )
}

export default NotFound;