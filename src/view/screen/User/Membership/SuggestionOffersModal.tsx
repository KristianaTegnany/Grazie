import { Button, Text, TouchableOpacity, View } from "widget/Native"
import SubscribeItem from "screen/User/Membership/widget/subscribeItem";
import BottomModal from "widget/Modal/PositionnedModal";
import Icon from "react-native-vector-icons/AntDesign";
import { usePurchase } from "hooks/usePurchase";
import { useState } from "react";
import Purchases, { PurchasesPackage } from "react-native-purchases";
import Apollo from "services/utils/apollo";

const SuggestionOffersModal = ({ loading, offers, title, modal, onPress, setModal }: { loading?: boolean, offers?: any, title: string, modal: boolean, onPress: () => void, setModal: (auto?: boolean) => void }) => {

    const [loadingOffer, setLoadingOffer] = useState('')
    const { offerings } = usePurchase(true)

    const close = () => {
        setModal()
    }

    const onPressOffer = async (sku: string) => {
        if (offerings?.all) {
            setLoadingOffer(sku)
            let pkg: PurchasesPackage = offerings.all[sku.split('_12_months')[0]].availablePackages[0]
            try {
                const { customerInfo } = await Purchases.purchasePackage(pkg);
                if (customerInfo) {
                    const res = await Apollo.getSubscription(true)
                    if (res) {
                        setModal(true)
                    }
                }
            } catch (e) {
                setLoadingOffer('')
            }
            finally {
                setLoadingOffer('')
            }
        }
    }

    return (
        <BottomModal wrapContent modal={modal} setModal={close}>
            <View absolute={1} top={20} right={20} ><TouchableOpacity onPress={close}><Icon name='close' size={20} /></TouchableOpacity></View>
            <View paddingH={20} paddingT={20}>
                <Text marginB={20} marginR={40} bold>{title}</Text>
                {offers?.items.map((offer: any, i: number) => (
                    <SubscribeItem key={i} loading={loadingOffer === offer.price.sku} hasBorder mini title={offer.title} price={offer.price.formatted} oldPrice={offer.displayOldPrice} uri={offer.type === "pack" ? offer.packItems?.filter((pack: any) => pack.isMag)[0].thumbnail?.urlLq : offer.thumbnail?.urlLq} onPress={() => onPressOffer(offer.price.sku)} />
                ))}
                <Button loading={loading} disabled={loading} marginT={40} md text={offers?.cta?.label} marginB={20} onPress={onPress} />
            </View>
        </BottomModal>
    )
}

export default SuggestionOffersModal;