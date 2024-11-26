import colors from "themes/colors"
import { View } from "widget/Native"

const Pagination = ({ datas, step }: { datas: any[], step: number }) => {
    return (
        <View row center>
            {Array.from(new Array(datas.length)).map((_, i) => (
                <View height={6} width={i === step ? 20 : 6} border={3} marginH={2}
                    style={{ backgroundColor: i === step ? colors.primaryDark : colors.tertiary }}
                    key={i}
                />
            ))}
        </View>
    )
}

export default Pagination