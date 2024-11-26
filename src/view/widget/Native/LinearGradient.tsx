import defaultStyle from "themes/defaultStyle";
import Touchable from "./Touchable";
import View, { IViewProps } from "./View";
import LinearGradientRN from 'react-native-linear-gradient';

const LinearGradient = (props: { colors: `#${string}`[], locations: number[];}) => {
    return (
        <LinearGradientRN
            style={defaultStyle.absolute}
            colors={props.colors}
            locations={props.locations} />
    )
}

export default LinearGradient;