import { images } from "assets/images";
import { StyleSheet } from "react-native";
import FastImage from "react-native-fast-image";
import normalize from "services/utils/normalize";
import { Button } from "widget/Native";
import Text from "widget/Native/Text";
import View from "widget/Native/View";

export enum ActionCardType {
    notification,
    invoice,
    service,
}

type IProps = {
    title: string;
    description: string;
    type: 'notification' | 'invoice' | 'service';
    btnText: string;
    onPress: () => void;
}

const ActionCard = (props: IProps) => {
    const { title, description, type, btnText } = props;

    return (
        <View color='secondary' border={12} padding={20} marginB={20}>
            <View row>
                <FastImage resizeMode='contain' style={styles.icon} source={type === 'notification' ? images.tab.card.CardNotif : (type === 'invoice' ? images.tab.card.CardAttach : images.tab.card.CardPdf)} />
                <Text marginL={10} children={title} size={17} bold />
            </View>
            <Text children={description} size={14} marginV={10} color='onSecondary' />
            <Button onPress={props.onPress} text={btnText} sm height={43} wrapContent paddingH={type === 'notification' ? 20 : 40} />
        </View>
    )
}

export default ActionCard;

const styles = StyleSheet.create({
    icon: {
        height: normalize(15),
        width: normalize(15),
    }
})