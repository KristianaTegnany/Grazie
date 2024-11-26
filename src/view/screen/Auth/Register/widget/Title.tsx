import { PropsWithChildren } from "react"
import { Text } from "widget/Native"

const Title = ({ children }: PropsWithChildren) => {
    return (
        <Text size={34} center rosha color='white' marginT={80}>{children}</Text>
    )
}

export default Title;