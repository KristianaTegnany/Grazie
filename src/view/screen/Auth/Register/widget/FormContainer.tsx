import { PropsWithChildren } from "react"
import { View } from "widget/Native";

const FormContainer = ({ children }: PropsWithChildren) => {
    return (
        <View flex paddingV={20} paddingB={10}>{children}</View>
    )
}

export default FormContainer;