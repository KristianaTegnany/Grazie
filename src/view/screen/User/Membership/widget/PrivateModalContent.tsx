import React from 'react'
import { Button, Image, Text, View } from "widget/Native"
import PrivateFlag from "./PrivateFlag";
import { images } from "assets/images";
import { useSelector } from "react-redux";
import { rootState } from "store/reducer";
import { useState } from "react";
import SubscribeModal from "screen/User/Membership/SubscribeModal";
import SubscribeMagModal from "../SubscribeMagModal";

const PrivateModalContent = ({ hasFlag, isAddress, isArticle, isInline, isMag, afterClosedAuto }: { hasFlag?: boolean, isAddress?: boolean, isArticle?: boolean, isInline?: boolean, isMag?: boolean, afterClosedAuto?: () => void }) => {
    const { becomeMember, becomeMemberToAccessAllGigisExclusiveContent, becomeMemberToContinueReading, becomeMemberToDiscoverOurAddresses } = useSelector((state: rootState) => state.appReducer.membershipDatas.translation);

    const [subscribeModal, setSubscribeModal] = useState(false);
    const closeSubscribeModal = () => setSubscribeModal(false);

    const [subscribeMagModal, setSubscribeMagModal] = useState(false);
    const closeSubscribeMagModal = () => setSubscribeMagModal(false);

    const showSubscribeModal = () => {
        isMag ? setSubscribeMagModal(true) : setSubscribeModal(true)
    }

    return (
        <>
            <View paddingH={40} color={isInline ? "secondary" : undefined} border={isInline ? 10 : undefined}>
                <View iCenter><Image source={images.tab.SearchPlaceholder} height={100} width={100} marginV={20} /></View>
                {hasFlag && <View sCenter><PrivateFlag /></View>}
                <Text center marginB={20} size={15} bold>{isArticle ? becomeMemberToContinueReading : (isAddress ? becomeMemberToDiscoverOurAddresses : becomeMemberToAccessAllGigisExclusiveContent)}</Text>
                <Button md text={becomeMember} marginB={20} onPress={showSubscribeModal} />
            </View>
            <SubscribeModal modal={subscribeModal} setModal={closeSubscribeModal} afterClosedAuto={afterClosedAuto} />
            <SubscribeMagModal modal={subscribeMagModal} setModal={closeSubscribeMagModal} afterClosedAuto={afterClosedAuto} />
        </>
    )
}

export default PrivateModalContent;    