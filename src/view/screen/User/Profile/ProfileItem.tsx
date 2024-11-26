import { BlurView } from "@react-native-community/blur";
import { images } from "assets/images";
import Icon from "react-native-vector-icons/Feather";
import colors from "themes/colors";
import defaultStyle from "themes/defaultStyle";
import { ImageBackground, Text, TouchableOpacity, View } from "widget/Native";

type IProps = {
    title: string;
    description?: string;
    disabled?: boolean;
    onPress: () => void;
}

const ProfileItem = (props: IProps) => {
    return (
        <TouchableOpacity disabled={props.disabled} onPress={props.onPress}>
            <ImageBackground width={360} height={88} border={15} padding={20} marginB={10} center ImageProps={{
                source: images.tab.card.CardProfileBGSm,
            }}>
                <BlurView blurType="dark" blurAmount={1} style={defaultStyle.absolute} />

                <View row between iCenter fullWidth>
                    <View flex>
                        <Text rosha size={22} color='white'>{props.title}</Text>
                        {!!props.description && <Text size={12} italic color='white' marginT={5} numberOfLines={1}>{props.description}</Text>}
                    </View>
                    <Icon name='chevron-right' color={colors.white} size={20} />
                </View>
            </ImageBackground>
        </TouchableOpacity>
    )
}

export default ProfileItem;