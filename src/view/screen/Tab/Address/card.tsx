import React from 'react'
import { AnimatedView, Image, ScrollView, Text, TextHtml, TouchableOpacity, View } from "widget/Native"
import useCardCtr from "./cardCtr"
import ActivityIndicator from "widget/Native/ActivityIndicator"
import FavoriteIcon from "../widget/FavoriteIcon"
import defaultStyle from "themes/defaultStyle"
import Carousel from "widget/Carousel/SnapCarousel/carousel/Carousel"
import { ReactElement, useEffect, useRef, useState } from "react"
import DotProgress from "widget/Carousel/DotProgress"
import { Dimensions } from "react-native"
import { ReactNativeZoomableView } from '@openspacelabs/react-native-zoomable-view'
import { Divider } from "../widget/TabFilter"
import ContactCard from "../widget/ContactCard"
import EyeCard from "../widget/EyeCard"
import CardRectLayout from "../widget/CardRectLayout"
import { useSelector } from "react-redux"
import { rootState } from "store/reducer"
import Apollo from "services/utils/apollo"
import Toast from "react-native-toast-message"
import { parse } from "graphql"
import ServicesCard from "widget/Card/ServicesCard"
import Icon from "react-native-vector-icons/Feather"
import colors from "themes/colors"
import BaseTabContainer from "../widget/BaseTabContainer"

const { width } = Dimensions.get("window")

const Medias = ({ data }: { data: any }) => {
    const nb = data.length

    const _carousel = useRef<Carousel>(null);
    const [step, setStep] = useState(0);

    const swipeLeft = () => {
        const index = Math.min(step + 1, nb - 1)
        _carousel.current?.snapToItem(index)
        setStep(index)
    }

    const swipeRight = () => {
        const index = Math.max(step - 1, 0)
        _carousel.current?.snapToItem(index)
        setStep(index)
    }

    const _renderItem = ({
        item }: {
            item: any;
        }) => (
        <ReactNativeZoomableView
            maxZoom={5}
            minZoom={1}
            bindToBorders={true} disablePanOnInitialZoom >
            <Image source={{ uri: item.urlLq }} poster height={236} width={'100%'} />
        </ReactNativeZoomableView>
    );

    return (
        <>
            {
                step > 0 &&
                <View absolute={1} top={0} bottom={0} left={0} center>
                    <TouchableOpacity onPress={swipeRight} padding={20}>
                        <Icon name="chevron-left" color={colors.whiteTransparent} size={50} />
                    </TouchableOpacity>
                </View>
            }

            <View>
                <Carousel
                    ref={_carousel}
                    vertical={false}
                    loop={true}
                    layout="default"
                    data={data}
                    renderItem={_renderItem}
                    itemWidth={width}
                    sliderWidth={width}
                    activeSlideOffset={10}
                    scrollEnabled={false}
                    useScrollView
                />
                <View paddingT={10}>
                    <DotProgress active={step} count={nb} />
                </View>
            </View>
            {
                step < nb - 1 &&
                <View absolute={1} top={0} bottom={0} right={0} center>
                    <TouchableOpacity onPress={swipeLeft} padding={20}>
                        <Icon name="chevron-right" color={colors.whiteTransparent} size={50} />
                    </TouchableOpacity>
                </View>
            }
        </>
    )
}

const Suggestions = ({ addressesSuggestionsSubTitle, addressesSuggestionsTitle, cardId, regionId, navigateToAddress }: { addressesSuggestionsSubTitle: string, addressesSuggestionsTitle: string, cardId: string, regionId: string, navigateToAddress: (item: any) => void }) => {

    const [suggestions, setSuggestions] = useState<any[] | undefined>();

    const { adresscategories } = useSelector(
        (state: rootState) => state.addressReducer.addressDatas.taxonomy,
    );

    const refreshSuggestions = () => {
        if (adresscategories.length > 0) {
            let q = "{";
            for (let i = 0; i < adresscategories.length; i++) {
                q += `address${adresscategories[i].id}: addresses(regions:[${regionId}], aroundAddress: {
                id: ${cardId}
              }, categories: [${adresscategories[i].id}], limit: 1){
              items{
                id
                category {
                  label
                }
                thumbnail {
                  urlHq
                  urlLq
                }
                title
                description
                isFavorite
              }
            }`;
            }

            q += "}";
            const query = parse(q);
            Apollo.query(query).then(response => {
                if (response?.error) {
                    Toast.show({ text2: response.error.message, type: "error" });
                } else if (response?.data) {
                    const res = Object.keys(response.data)
                        .map(key => {
                            return { ...response.data[key].items[0] };
                        })
                        .filter(item => Object.keys(item).length > 0);
                    setSuggestions(res);
                }
            });
        }
    };

    const renderSuggestion = (item: any, i: number) => (
        <CardRectLayout
            key={i}
            size='md'
            poster
            marginR={10}
            //sharedId={`address.${item.id}.photo`}
            source={{ uri: item.thumbnail?.urlLq }}
            id={item.id}
            isFavorite={item.isFavorite}
            title={item.title}
            subtitle={item.description}
            category={item.category?.label}
            favoriteCallback={refreshSuggestions}
            onPress={() => navigateToAddress(item)}
        />
    )

    useEffect(() => {
        refreshSuggestions();
    }, [adresscategories?.length, cardId]);

    return !suggestions ? <ActivityIndicator padding={20} /> : <>
        {
            suggestions.length > 0 &&
            <View marginB={38}>
                <Divider marginH={15} marginT={0} marginB={38} />
                <Text marginH={15} rosha size={25}>{addressesSuggestionsTitle}</Text>
                <Text marginH={15} marginT={10} light>{addressesSuggestionsSubTitle}</Text>
                <ScrollView horizontal row paddingL={15} paddingR={5} paddingT={38}>
                    {suggestions.map(renderSuggestion)}
                </ScrollView>
            </View>
        }
    </>

}

export const BaseAddressCardScreen = ({ renderServices, renderSuggestions }: {
    renderServices?: ReactElement<any, any>;
    renderSuggestions?: (addressesSuggestionsTitle: string, addressesSuggestionsSubTitle: string, card: any, navigateToAddress: (item: any) => void) => void
}) => {

    const {
        card,
        detail,
        isPro,
        isReadOnly,
        ref,
        details,
        addressesSuggestionsTitle,
        addressesSuggestionsSubTitle,

        favoriteCallback,
        navigateToAddress,
    } = useCardCtr()

    const renderContent = (content: any, i: number) => {
        return content.type === 'media' ?
            <Image key={i} source={{ uri: content.media?.urlLq }} height={265} marginB={38} />
            :
            <View key={i} paddingH={content.type === 'media_multiple' ? 0 : 20} marginB={content.type === 'gigi_wink' ? 0 : 38}>
                {content.type === 'title_text' &&
                    <>
                        {i === 0 &&
                            <Divider marginB={38} />}
                        <Text size={22} rosha marginB={20}>{content.title}</Text>
                        <TextHtml children={content.contentHtml} />
                        {i === 0 &&
                            <Divider marginT={38} />}
                    </>
                }
                {
                    content.type === 'media_multiple' &&
                    <Medias data={content.medias} />
                }
                {content.type === 'gigi_wink' &&
                    <>
                        <EyeCard title={content.title} titleCenter description={content.contentHtml} />
                        <Divider marginB={38} />
                    </>
                }
                {content.type === 'details_contact' &&
                    <ContactCard
                        title={details}
                        place={content.address}
                        mail={typeof content.emailAddresses === 'string' ? content.emailAddresses : content.emailAddresses?.join(', ')}
                        phone={typeof content.phoneNumbers === 'string' ? content.phoneNumbers : content.phoneNumbers?.join(', ')}
                        web={content.website}
                        room={content.rooms}
                        amenities={content.amenities?.join(", ")}
                    />
                }
            </View>
    }

    const image = { uri: detail.thumbnail?.urlLq }

    return (
        <BaseTabContainer forwardRef={ref} title={detail.title} sharedId={`address.${detail.id}.photo`}
            image={image} backBtn={!isReadOnly}>
            <AnimatedView
                duration={500}
                animation={'slideInUp'}
                pointerEvents={isReadOnly ? "none" : undefined}
            >
                {card && <View paddingH={15} marginB={38}>
                    <View iStart>
                        {card.partnerTypes?.length > 0 && <View color="primary" paddingV={10} paddingH={30} border={25}>
                            <Text size={15} color="white">
                                {card.partnerTypes[0]?.label}
                            </Text>
                        </View>}
                    </View>
                    <Text size={25} rosha marginT={38}>
                        {(card.title || '').toUpperCase()}
                    </Text>
                    {card.enseigne &&
                        <Text marginT={5} color="onSecondaryLight">
                            {card.enseigne}
                        </Text>
                    }
                    {card.summary &&
                        <Text marginT={20}>
                            {card.summary}
                        </Text>
                    }
                    {card.region &&
                        <View row iCenter marginT={20}>
                            <Text size={15}>{(card.region?.label || '').toUpperCase()} {card.sector ? `- ${card.sector.charAt(0).toUpperCase() + card.sector.slice(1)}` : ''}</Text>
                        </View>
                    }
                    <AnimatedView
                        animation={'zoomIn'}
                        style={[defaultStyle.favorite, { top: 0 }]}>
                        <FavoriteIcon size='md' articleId={card.id} isFavorite={card.isFavorite} callback={favoriteCallback} />
                    </AnimatedView>
                </View>}
                {
                    !card &&
                    <ActivityIndicator flex marginT={20} />
                }
                {
                    card && card.content?.map(renderContent)
                }
                {card && renderSuggestions && renderSuggestions(addressesSuggestionsTitle, addressesSuggestionsSubTitle, card, navigateToAddress)}
                {card && !isPro && renderServices}
            </AnimatedView>
        </BaseTabContainer>
    )
}

const AddressCardScreen = () => {

    const renderSuggestion = (
        addressesSuggestionsTitle: string,
        addressesSuggestionsSubTitle: string,
        card: any,
        navigateToAddress: (item: any) => void) => {
        return (
            <Suggestions addressesSuggestionsSubTitle={addressesSuggestionsSubTitle} addressesSuggestionsTitle={addressesSuggestionsTitle} cardId={card.id} regionId={card.region?.id} navigateToAddress={navigateToAddress} />
        )
    }

    return (
        <BaseAddressCardScreen renderSuggestions={renderSuggestion} renderServices={<ServicesCard />} />
    )
}

export default AddressCardScreen