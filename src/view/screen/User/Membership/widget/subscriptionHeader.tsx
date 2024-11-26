import { Text, TextHtml, View } from "widget/Native"

type IProps = { title: string; displayPrice: string; displayFullPrice: string; }

const SubscriptionHeader = ({ title, displayFullPrice }: IProps) => {
    return (
        <View iCenter center>
            <Text size={20} bold marginB={10} color='white'>{title}</Text>
            <TextHtml center size={10} color='white'>{displayFullPrice}</TextHtml>
        </View>
    )
}

export default SubscriptionHeader;