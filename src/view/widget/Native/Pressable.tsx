import Touchable from "./Touchable";
import View, { IViewProps } from "./View";

const Pressable = (props: IViewProps & { nestedTouch?: boolean; onPress?: () => void }) => {
    return props.onPress ? <Touchable noPadding={!props.padding} {...props} /> : <View {...props} />
}

export default Pressable;