import React from 'react';
import {
    Button,
    Text, View
} from 'widget/Native';
import useSubscribeCtr from './subscribeModalCtr';
import PrivateFlag from 'screen/User/Membership/widget/PrivateFlag';
import BottomModal from 'widget/Modal/PositionnedModal';
import SubscribeItem from './widget/subscribeItem';

const SubscribeMagModal = ({ modal, afterClosedAuto, setModal, }: { modal: boolean, afterClosedAuto?: () => void, setModal: () => void }) => {
    const {
        becomeMemberToContinueReading,
        loading,
        offerings,
        subscribeToGigiMag,
        subscriptionsBO,
        closeModal,
        purchase,
    } = useSubscribeCtr(setModal, afterClosedAuto);

    return (
        <>
            <BottomModal wrapContent modal={modal} setModal={closeModal}>
                {/*subscriptionsBO.length === 0 && <ActivityIndicator flex center iCenter />*/}

                <View paddingH={15} marginB={20}>
                    <PrivateFlag isMag />
                    <Text marginB={20} bold>
                        {becomeMemberToContinueReading}
                    </Text>
                    {subscriptionsBO.filter(sub => sub.isMag && !sub.isPro).map((sub, i) => (<SubscribeItem key={i} title={sub.titleListItem.toUpperCase()} description={sub.shortDescription[0].contentHtml} price={sub.displayPrice} uri={sub.thumbnail?.urlHq} />))}
                    <Button lg disabled={!offerings} loading={loading} text={subscribeToGigiMag} marginT={5} onPress={async () => {
                        try {
                            purchase(offerings?.all?.mag.availablePackages[0])
                        } catch (e) { console.log(e) }
                    }} />
                </View>
            </BottomModal>
        </>
    );
};

export default SubscribeMagModal;
