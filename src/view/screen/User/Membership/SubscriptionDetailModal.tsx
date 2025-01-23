import React from 'react'
import { images } from "assets/images";
import { usePurchase } from "hooks/usePurchase";
import { useEffect, useRef, useState } from "react";
import { Dimensions } from "react-native";
import Purchases, { PurchasesPackage } from "react-native-purchases";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/AntDesign";
import FeatherIcon from "react-native-vector-icons/Feather";
import Carousel from "widget/Carousel/SnapCarousel";
import FullModal from "widget/Modal/FullModal";
import { ActivityIndicator, Button, Image, ImageBackground, Text, TextHtml, TouchableOpacity, View } from "widget/Native"
import Pagination from "./widget/Pagination";
import { BaseAddressCardScreen } from "screen/Tab/Address/card";
import { useDispatch, useSelector } from "react-redux";
import { resetParams, setParams } from "store/slice/app/appSlice";
import { rootState } from "store/reducer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { TabItem } from "screen/Tab/widget/TabCategories";
import ViewScroll from "widget/Native/ViewScroll";
import { IItem } from "store/slice/inspiration/type";
import SubscribeItem from "./widget/subscribeItem";
import SuggestionOffersModal from "./SuggestionOffersModal";
import colors from "themes/colors";
import Apollo from "services/utils/apollo";
import { useUser } from "hooks/useUser";
import MapHeader from "screen/Tab/Map/Widget/mapHeader";
import normalize from "services/utils/normalize";
import LinearGradient from "widget/Native/LinearGradient";

const { width } = Dimensions.get('window');

const SubscriptionDetailModal = ({ modal, product, setModal }: { modal: boolean, product?: any, setModal: () => void }) => {
    let _carousel = useRef<Carousel>(null);
    const dispatch = useDispatch()

    const { offerings } = usePurchase(true)
    const { carnets, isMagPack } = useUser()

    const { bottom, top } = useSafeAreaInsets();
    const appParams: any = useSelector((state: rootState) => state.appReducer.params);
    const { adresscategories } = useSelector((state: rootState) => state.addressReducer.addressDatas.taxonomy);
    const { addExpWithTheseOffers, allSecretsAddresses, theGeolocatedMap, theGeolocatedMapDescription, theNotebookOf, theNotebookOfPlural } = useSelector((state: rootState) => state.appReducer.membershipDatas.translation);
    const gigiGreen = useSelector((state: rootState) => state.magReducer.magDatas.translation.gigiGreen);

    const [loading, setLoading] = useState(false)
    const [detail, setDetail] = useState<any>()
    const [step, setStep] = useState(0)
    const [showSuggestionMagModal, setShowSuggestionMagModal] = useState(false)

    const close = () => {
        setShowSuggestionMagModal(false)
        setModal()
        setStep(0)
        setDetail(undefined)
    }

    const _renderItem = ({
        item }: {
            item: any
        }) => {
        const hasCard = ['intro', 'subscription_summary', 'addresses'].includes(item.theme.machineName)
        const isIntroAddresses = ['intro', 'addresses'].includes(item.theme.machineName)

        const isMedia = item.theme.machineName === 'media'
        const isIntro = item.theme.machineName === 'intro'
        const isAddresses = item.theme.machineName === 'addresses'
        const isGreen = item.theme.machineName === 'media_gigigreen'
        const isSummary = ['subscription_summary', 'addresses'].includes(item.theme.machineName)
        const isMap = item.theme.machineName === 'map'
        const isRegion = !(product.isMag || product.isPro)
        
        return (item.address?.id && appParams?.detail ? <GestureHandlerRootView><BaseAddressCardScreen /></GestureHandlerRootView> :
            <ViewScroll bounces={false} scroll={isSummary || (product.isAllRegions && isIntroAddresses)} flex color="secondary">
                {isSummary && !isRegion ? <View marginT={top + 60} paddingH={15}><SubscribeItem title={(isRegion ? product.title! : product.titleListItem).toUpperCase()} description={product.shortDescription[0].contentHtml} price={product.displayPrice} uri={product.thumbnail?.urlHq} onPress={() => { }} /></View> :
                    <ImageBackground shadow poster marginT={hasCard ? top + 60 : 0} marginH={hasCard ? 15 : 0} paddingH={20} ImageProps={{ style: { backgroundColor: isMap ? colors.tertiary : undefined }, source: { uri: isAddresses ? product.thumbnail?.urlHq : (item.media?.urlLq || item.thumbnail?.urlLq || product.thumbnail?.urlHq || product.uri) } }} height={hasCard ? 200 : undefined} border={hasCard ? 25 : 0} flex={!hasCard}>
                        {isIntroAddresses && <LinearGradient
                            colors={[
                                '#0000008C',
                                '#00000000',
                            ]}
                            locations={[0, 1]} />}
                        {(isMedia || isGreen) && <LinearGradient
                            colors={[
                                '#00000033',
                                '#000000CC'
                            ]}
                            locations={[0, 1]} />}
                        {hasCard ? <View flex center iCenter>
                            <Text center letterSpacing={isIntroAddresses && isRegion ? 5 : 0} thin={isIntroAddresses && isRegion} size={!isRegion ? 28 : 15} rosha={!isRegion} marginH={40} color="white">{(isRegion ? (product.isAllRegions ? theNotebookOfPlural : theNotebookOf) : product.titleListItem).toUpperCase()}</Text>
                            {isIntroAddresses && isRegion && <Text marginT={10} size={32} rosha color="white">{product.title}</Text>}
                        </View> : <View flex end={!isMap} marginT={isMap ? top + 40 : undefined} marginB={140}>
                            {isGreen && <View marginB={20} border={20} sStart row iCenter paddingH={20} paddingV={10} color="secondary">
                                <Image source={images.Green} width={12} height={12} marginR={5} />
                                <Text size={9} bold color='green'>
                                    {gigiGreen.toUpperCase()}
                                </Text>
                            </View>}
                            <View height={isMap? undefined: 73.2} marginB={15}>
                                <Text size={!isMap ? 32 : 30} rosha lineHeight={isMap? undefined : 36.6} color={!isMap ? "white" : 'textField'}>{item.title}</Text>
                            </View>
                            <View height={80}>
                                <TextHtml size={16} lineHeight={18} color="white">{item.contentHtml}</TextHtml>
                            </View>
                        </View>}
                    </ImageBackground>
                }
                {isSummary && !isRegion &&
                    <>
                        <Text marginV={20} marginL={25} marginR={15} size={22} bold>{item.title}</Text>
                        <View marginB={10} marginH={25}>
                            <TextHtml size={15} lineHeight={17.6}>{item.contentHtml}</TextHtml>
                        </View>
                    </>}
                {(isIntroAddresses || (isSummary && isRegion)) && <View paddingH={20} flex center iCenter>
                    <View flex paddingT={40} paddingB={20} iCenter between>
                        <View iCenter paddingB={product.isAllRegions? 140 : 0}>
                            {isIntro && <View marginB={20}>
                                {isRegion && <View absolute right={15} top={0} size={50} border={25} color="primary" />}
                                <Image source={isRegion ? images.tab.bottom.Carnet : images.subscription.Pepite} width={isRegion ? 45 : 64} height={isRegion ? 45 : 64} />
                            </View>}
                            {isIntroAddresses && <Text size={isAddresses ? 17 : 25} rosha={!isAddresses} bold={isAddresses} center marginB={20} marginH={isAddresses ? 20 : 40} color='textFieldTitle'>{isAddresses ? allSecretsAddresses : item.title}</Text>}
                            <TextHtml size={isSummary ? 17 : 15} medium={isSummary} lineHeight={isSummary ? 20 : 25} color={isSummary? 'textField' : 'textFieldLight'} center>{isSummary ? item.title : item.contentHtml}</TextHtml>
                            {isSummary && (
                                <>
                                    <View row wrap center marginT={20}>
                                        {adresscategories.map((categ: IItem, index: number) => (
                                            <View key={index} width={116}><TabItem big uri={categ.media?.urlLq} text={categ.label} /></View>
                                        ))}
                                    </View>
                                    <View marginT={20} marginB={140} border={20} color="white" padding={7} paddingB={15}>
                                        <Image poster source={{ uri: item.mediaMap?.urlLq }}
                                            height={150} width={350} border={10} marginB={10} />
                                        <Text marginV={10} bold color='textField'>{theGeolocatedMap}</Text>
                                        <Text marginB={10} size={12} lineHeight={14.06} color='textFieldGrey'>{theGeolocatedMapDescription}</Text>
                                        <View absolute top={20} left={20}><FeatherIcon name="menu" size={normalize(30)} color='black'/></View>
                                        <View absolute top={20} right={20}><MapHeader noTravel openFilter={() => {}} openTravel={() => {}}/></View>
                                    </View>
                                </>
                            )}
                        </View>
                    </View>
                </View>}
            </ViewScroll>
        )
    };

    const beforePress = () => {
        setShowSuggestionMagModal(true)
    }

    const closeSuggestionMagModal = (auto?: boolean) => {
        if (auto) {
            close()
        }
        else
            setShowSuggestionMagModal(false)
    }

    const onPress = async () => {
        if (offerings?.all) {
            setLoading(true)
            let pkg: PurchasesPackage = offerings.all.mag.availablePackages[0]
            if (detail?.reference.includes('pro')) {
                pkg = offerings?.all?.premium_offering?.availablePackages.filter(pkg => pkg.identifier === "$rc_pro_annual")[0]
            }
            else if (detail?.reference.includes('_12_months')) {
                pkg = offerings.all[detail?.reference.split('_12_months')[0]].availablePackages[0]
            }

            try {
                const { customerInfo } = await Purchases.purchasePackage(pkg);
                if (customerInfo) {
                    const res = await Apollo.getSubscription(true)
                    if (res) {
                        close()
                    }
                }
            } catch (e) {
                setLoading(false)
            }
            finally {
                setLoading(false)
            }
        }
    }

    useEffect(() => {
        if (product?.id) {
            Apollo.getSubscriptionDetail(product.id).then(data => {
                setDetail(data?.subscriptionProduct)
            })
        }
    }, [product?.id])

    useEffect(() => {
        if (!modal) {
            dispatch(resetParams())
        }
    }, [modal])

    return (
        <FullModal modal={modal} noPaddingTop>
            <View flex color="secondary">
                <View absolute={1} top={top} left={0}>
                    <TouchableOpacity onPress={close} paddingH={20}>
                        <Icon name='close' color='black' size={25} />
                    </TouchableOpacity>
                </View>
                {!detail && <ActivityIndicator flex center iCenter />}
                {detail && product && <>
                    <Carousel
                        ref={_carousel}
                        vertical={false}
                        data={detail.panels}
                        renderItem={_renderItem}
                        itemWidth={width}
                        sliderWidth={width}
                        activeSlideOffset={10}
                        onSnapToItem={(i: number) => {
                            //console.log(detail.panels[i].theme.machineName)
                            if (detail.panels[i].address) {
                                dispatch(setParams({ detail: detail.panels[i].address }))
                            }
                            setStep(i)
                        }}
                        inactiveSlideOpacity={1}
                        inactiveSlideScale={1}
                        lockScrollWhileSnapping={true}
                        enableMomentum={false}
                        decelerationRate={0.25}
                        bounces={false}
                    />
                    <View absolute left={0} right={0} bottom={0} paddingH={20}>
                        <View marginB={40}>
                            <Pagination datas={detail.panels} step={step} />
                        </View>
                        <View fullWidth paddingH={20} paddingB={bottom || 20}>
                            <Button
                                md
                                text={detail.price.label || ''}
                                disabled={!offerings || loading}
                                loading={loading}
                                onPress={!product.isAllRegions && !product.isPro && !product.isMag && !isMagPack && (carnets || []).length <= 2 && detail?.offers ? beforePress : onPress}
                            />
                        </View>
                    </View>
                </>}
            </View>
            <SuggestionOffersModal loading={loading} offers={detail?.offers} title={addExpWithTheseOffers} modal={showSuggestionMagModal} setModal={closeSuggestionMagModal} onPress={onPress} />
        </FullModal>
    )
}

export default SubscriptionDetailModal;