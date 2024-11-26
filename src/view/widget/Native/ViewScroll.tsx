import ScrollView, { IScrollProps } from "./ScrollView";
import View from "./View";

const ViewScroll = (props: IScrollProps & { scroll?: boolean }) => {
    return props.scroll ? <ScrollView {...props} /> : <View {...props} />
}

export default ViewScroll;