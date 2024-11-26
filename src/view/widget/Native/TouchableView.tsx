import TouchableOpacity, { ITouchableProps } from "./TouchableOpacity";
import View from "./View";

const TouchableView = (props: ITouchableProps) => {
    return props.onPress ? <TouchableOpacity {...props} /> : <View {...props} />
}

export default TouchableView;