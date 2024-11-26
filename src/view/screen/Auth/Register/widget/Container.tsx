import { PropsWithChildren } from "react"
import { View } from "widget/Native";

type IProps = PropsWithChildren & {
    paddingT: number;
}

const Container = ({ children, paddingT }: IProps) => {
    return (
        <View flex center iCenter paddingT={paddingT}>{children}</View>
    )
}

export default Container;