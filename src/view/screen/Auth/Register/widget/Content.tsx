import { PropsWithChildren } from "react"
import { View } from "widget/Native";

const Content = ({ children }: PropsWithChildren) => {
    return (
        <View flex fullWidth border={20} paddingH={20}>{children}</View>
    )
}

export default Content;