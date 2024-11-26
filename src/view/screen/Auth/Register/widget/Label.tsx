import { PropsWithChildren } from "react"
import { Text } from "widget/Native"

const Label = ({ children }: PropsWithChildren) => {
    return (
        <Text color='white' marginL={5} marginB={10}>{children}</Text>
    )
}

export default Label;