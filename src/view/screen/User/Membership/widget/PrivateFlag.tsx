import { useEffect } from "react";
import { useSelector } from "react-redux";
import Apollo from "services/utils/apollo";
import { rootState } from "store/reducer";
import { Text, View } from "widget/Native"

const PrivateFlag = ({ isMag }: { isMag?: boolean }) => {
    const {memberEdition, memberEdition2} = useSelector((state: rootState) => state.appReducer.membershipDatas.translation);

    useEffect(() => {
        if (!memberEdition2) {
            Apollo.getAllPreloadDatas()
        }
    }, [memberEdition2])

    return (
        <View sStart paddingV={5} paddingH={20} border={5} marginB={10} color="private">
            <Text center size={12} bold={!isMag} color='textColorBlack'>{isMag ? memberEdition2 : memberEdition}</Text>
        </View>
    )
}

export default PrivateFlag;    