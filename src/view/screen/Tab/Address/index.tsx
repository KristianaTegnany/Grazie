import React from 'react'
import TabContainer from '../widget/TabContainer';
import { ActivityIndicator, Button, Image, ImageBackground, Text, TextHtml, TouchableOpacity, View } from 'widget/Native';
import SubscriptionItem from 'screen/User/Membership/widget/subscriptionItem';
import SubscriptionDetailModal from 'screen/User/Membership/SubscriptionDetailModal';
import NoSubscription from 'screen/User/Membership/widget/NoSubscription';
import useAddressCtr from './addressCtr';
import Carousel from 'widget/Carousel/SnapCarousel';
import { Dimensions } from 'react-native';
import Pagination from 'screen/User/Membership/widget/Pagination';
import { images } from 'assets/images';
import CenterModal from '../widget/CenterModal';

const { width } = Dimensions.get("window")

const AddressScreen = () => {

    const { _carousel, addressesTutoButtonLabel, addressesTutoTitle,
        myNotebooks,
        noNotebookLabel,
        noNotebookDescription,
        gigiNotebooks,
        allSecretsAddressesByDestination,
        exploreYourDestinationNotebooks,
        theNotebookOf,

        carnets,
        isAllRegions,

        product, isFirstAddress, step, subscriptionsBO, tutoDescription, tutoImage, closeDetail, closeTuto, goToDetail, navigateToDetail, setStep } = useAddressCtr()

    const renderItem = ({ item }: { item: any; }) => {
        return (
            <TouchableOpacity noPadding onPress={() => navigateToDetail(item.regionId, item.title, item.explore, item.filterAllUri)}>
                <ImageBackground ImageProps={{ source: { uri: item.uri } }} marginH={20} width={350} height={200} border={20}>
                    <View absolute top={0} left={0} right={0} bottom={0} borderT={20} borderB={20} hexColor="#00000055" />
                    <View flex center iCenter>
                        <Text center letterSpacing={5} thin size={15} marginB={10} marginH={40} color="white">{theNotebookOf.toUpperCase()}</Text>
                        <TextHtml center color="white" size={32} rosha>{item.title}</TextHtml>
                    </View>
                </ImageBackground>
            </TouchableOpacity>
        )
    }

    const headerBG = { uri: tutoImage?.urlLq }
    const hasCarnet = carnets?.length !== 0 || isAllRegions
    const datas: { regionId: string, title: string, explore: string, filterAllUri: string, uri: string }[] = carnets?.filter(carnet => carnet?.reference).map(carnet => ({ regionId: carnet?.regions[0]?.id, explore: carnet?.regionExploreNotebookLabel, title: carnet?.titleListItem, filterAllUri: carnet?.filterAllThumbnail?.urlHq, uri: carnet?.thumbnail?.urlHq })) || []

    return (
        <TabContainer title={myNotebooks}>
            {!hasCarnet && <View marginH={20}><NoSubscription title={noNotebookLabel} description={noNotebookDescription} /></View>}
            {hasCarnet &&
                <>
                    <View marginL={20} marginV={10}>
                        <Text size={22} bold color='black'>{exploreYourDestinationNotebooks}</Text>
                    </View>
                    {
                        (isAllRegions || (carnets && carnets.length > 5)) ?
                            <View>
                                <View paddingH={20} marginT={20} row wrap center>
                                    {(isAllRegions ? subscriptionsBO.filter(sub => !(sub.isAllRegions || sub.isMag || sub.isPro)) : carnets!).map((sub, i) => {
                                        return (
                                            <SubscriptionItem key={i} check={false} title={sub.title} onPress={() => navigateToDetail(sub.regions[0].id, sub.title, sub.regionExploreNotebookLabel, sub.filterAllThumbnail?.urlLq)} hasMarginR={i % 2 === 0} uri={sub.thumbnail?.urlHq} />
                                        )
                                    })}
                                </View>
                            </View> :
                            <View>
                                <Carousel
                                    ref={_carousel}
                                    vertical={false}
                                    data={datas}
                                    renderItem={renderItem}
                                    itemWidth={width}
                                    sliderWidth={width}
                                    activeSlideOffset={10}
                                    onSnapToItem={(index: number) => setStep(index)}
                                    inactiveSlideOpacity={1}
                                    inactiveSlideScale={1}
                                    lockScrollWhileSnapping={true}
                                    enableMomentum={false}
                                    decelerationRate={0.25}
                                />
                                <View marginT={20}>
                                    <Pagination datas={datas} step={step} />
                                </View>
                                <View marginT={20} color='secondary' height={10} />
                            </View>
                    }
                </>}
            {subscriptionsBO.length === 0 && <ActivityIndicator flex center iCenter />}
            {!isAllRegions && subscriptionsBO.length > 0 &&
                <>
                    <View paddingH={20}>
                        <Text size={25} rosha marginT={20} marginB={10}>{gigiNotebooks}</Text>
                        <Text marginR={10}>{allSecretsAddressesByDestination}</Text>
                    </View>
                    <View>
                        {!hasCarnet &&
                            <View absolute={-1} end left={-20} top={0} right={0}>
                                <Image source={images.tab.inspiration.MoonLeft} absolute={0} left={0} bottom={0} height={274} width={150} resizeMode='contain' />
                            </View>}
                        <View paddingH={20} marginT={30} marginB={30} row wrap center>
                            {subscriptionsBO.filter(sub => !(sub.isAllRegions || sub.isMag || sub.isPro) && !carnets?.map(sub => sub?.reference).includes(sub.reference)).map((sub, i) => {
                                return (
                                    <SubscriptionItem key={i} check={false} title={sub.title} onPress={() => goToDetail(sub)} hasMarginR={i % 2 === 0} uri={sub.thumbnail?.urlHq} />
                                )
                            })}
                        </View></View>
                </>}
            <CenterModal blur poster title={addressesTutoTitle} description={tutoDescription} headerBG={headerBG} modal={isFirstAddress} closeModal={closeTuto} bottom={<Button marginT={40} marginH={20} sm text={addressesTutoButtonLabel} onPress={closeTuto} />} />
            <SubscriptionDetailModal modal={product !== undefined} product={product} setModal={closeDetail} />
        </TabContainer >
    )
}

export default AddressScreen;