import { images } from "assets/images";
import { Image, Text, TextHtml, View } from "widget/Native"

type IProps = {
    eye?: boolean;
    title: string;
    titleCenter?: boolean;
    description: string;
}

const EyeCard = ({ eye, title, titleCenter, description }: IProps) => {
    return (
        <View paddingT={50} marginB={38} iCenter>
            <Image source={eye ? images.tab.EyeCard : images.tab.FriendsCard} absolute={1} height={95} width={88} resizeMode="contain" />
            <View fullWidth border={9} color="secondary" paddingT={45} paddingB={20} paddingH={20}>
                <Text size={28} center={titleCenter} rosha marginV={20}>{title}</Text>
                <TextHtml>{description}</TextHtml>
            </View>
        </View>
    )
}

export default EyeCard;