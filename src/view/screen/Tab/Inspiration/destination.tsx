import { AnimatedView, Image, ScrollView, Text, TextHtml, View } from "widget/Native"
import TabContainer from "../widget/TabContainer"
import useDestinationCtr from "./destinationCtr"
import ActivityIndicator from "widget/Native/ActivityIndicator"
import FavoriteIcon from "../widget/FavoriteIcon"
import defaultStyle from "themes/defaultStyle"
import { images } from "assets/images"
import Carousel from "widget/Carousel/SnapCarousel/carousel/Carousel"
import { useEffect, useRef, useState } from "react"
import DotProgress from "widget/Carousel/DotProgress"
import { Dimensions } from "react-native"
import GestureRecognizer from "react-native-swipe-gestures"
import { Divider } from "../widget/TabFilter"
import Pub from "../widget/Pub"
import CardRectLayout from "../widget/CardRectLayout"
import { useSelector } from "react-redux"
import { rootState } from "store/reducer"
import Apollo from "services/utils/apollo"
import Toast from "react-native-toast-message"
import { parse } from "graphql"
import useAppNavigator from "hooks/useAppNavigator"
import routeName from "routes/routeName"
import ServicesCard from "widget/Card/ServicesCard"
import PrivateLayer from "../../User/Membership/widget/PrivateLayer"
import { useUser } from "hooks/useUser"

const { width } = Dimensions.get("window")

const Programme = ({ data }: { data: any }) => {
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
        <View paddingV={20} paddingH={20} marginT={20}>
            <Text bold size={22} marginB={40}>{item?.title}</Text>
            <TextHtml opacity={0.67}>{item?.textHtml}</TextHtml>
        </View>
    );

    return (
        <GestureRecognizer
            onSwipeLeft={swipeLeft}
            onSwipeRight={swipeRight}>
            <View flex marginH={10} paddingH={20} paddingV={20} overflow="hidden" iCenter color='secondary' border={9} >
                <Image source={images.contact.MoonRight} absolute={1} top={20} right={0} width={63} height={100} />
                <Carousel
                    ref={_carousel}
                    vertical={false}
                    loop={true}
                    layout="default"
                    data={data}
                    renderItem={_renderItem}
                    itemWidth={width - 50}
                    sliderWidth={width - 50}
                    activeSlideOffset={10}
                    scrollEnabled={false}
                    useScrollView
                />
            </View>

            <View center iCenter marginT={25}>
                <DotProgress active={step} count={nb} />
            </View>
        </GestureRecognizer>
    )
}

const Suggestions = ({ regionId, suggestionDescription, suggestionsTitle }: { regionId: string, suggestionDescription: string, suggestionsTitle: string }) => {
    const navigator = useAppNavigator();

    const [suggestions, setSuggestions] = useState<any[] | undefined>();

    const { adresscategories } = useSelector(
        (state: rootState) => state.addressReducer.addressDatas.taxonomy,
    );

    const refreshSuggestions = () => {
        if (adresscategories.length > 0) {
            let q = "{";
            for (let i = 0; i < adresscategories.length; i++) {
                q += `address${adresscategories[i].id}: addresses(regions:[${regionId}], categories: [${adresscategories[i].id}], limit: 1){
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
                if (response.error) {
                    Toast.show({ text2: response.error.message, type: "error" });
                } else if (response.data) {
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


    const navigateToAddress = (item: any) => {
        navigator.navigateScreen(routeName.tab.address.card, {
            detail: item,
        });
    };

    const renderSuggestion = (item: any, i: number) => (
        <CardRectLayout
            key={i}
            size='md'
            poster
            marginR={10}
            sharedId={`address.${item.id}.photo`}
            source={{ uri: item.thumbnail?.urlLq }}
            isFavorite={item.isFavorite}
            id={item.id}
            title={item.title}
            subtitle={item.description}
            category={item.category?.label}
            favoriteCallback={refreshSuggestions}
            onPress={() => navigateToAddress(item)}
        />
    )

    useEffect(() => {
        refreshSuggestions();
    }, [adresscategories?.length]);

    return !suggestions ? <ActivityIndicator padding={20} /> : <>
        {
            suggestions.length > 0 &&
            <View marginB={38}>
                <Divider marginH={15} marginB={38} />
                <Text marginH={15} rosha size={25}>{suggestionsTitle}</Text>
                <Text marginH={15} marginT={20} light>{suggestionDescription}</Text>
                <ScrollView horizontal row paddingL={15} paddingR={5} paddingT={38}>
                    {suggestions.map(renderSuggestion)}
                </ScrollView>
            </View>
        }
    </>

}

const InspirationDestinationScreen = () => {
    const {
        destination,
        destinationLabel,
        detail,
        isPro,
        suggestionDescription,

        favoriteCallback,
    } = useDestinationCtr()
    const { allowedRegions, isAllRegions } = useUser();

    const renderContent = (content: any, i: number) => {
        return content.type === 'media' ?
            <Image key={i} source={{ uri: content.media?.urlLq }} height={265} marginB={38} />
            :
            <View key={i} paddingH={15} marginB={38}>
                {content.type === 'title_text' &&
                    <>
                        {i === 3 &&
                            <Divider marginB={38} />}
                        <Text size={22} rosha marginB={20}>{content.title}</Text>
                        <TextHtml children={content.contentHtml} />
                        {i === 3 &&
                            <Divider marginT={38} />}
                    </>
                }
                {content.type === 'text' &&
                    <>
                        <TextHtml children={content.contentHtml} />
                    </>
                }
                {content.type === 'title' &&
                    <>
                        <TextHtml children={content.titleHtml} />
                    </>
                }
                {
                    content.type === 'programme' &&
                    <>
                        <Text rosha size={25} marginB={38}>{content.title}</Text>
                        <Programme data={content.programmesUnit} />
                    </>
                }
                {content.type === 'partenaire_suggestion' &&
                    <>
                        <Divider marginB={38} />
                        <Text rosha size={25} marginT={10} marginB={20}>{content.title}</Text>
                        <Text light>{content.text}</Text>
                    </>
                }
            </View>
    }

    const image = { uri: detail.thumbnail?.urlLq }
    const nid = destination?.id && parseInt(destination.id)

    return (
        <TabContainer title={detail.title} sharedId={`inspiration.${detail.id}.photo`}
            image={image} backBtn>
            <AnimatedView
                duration={500}
                animation={'slideInUp'}
                paddingT={18}
            >
                {destination && <View paddingH={15} marginB={38}>
                    <Text size={15} marginR={60}>
                        {destinationLabel.toUpperCase()}
                    </Text>
                    <Text size={25} rosha marginT={20} marginR={60}>
                        {(destination.title || '').toUpperCase()}
                    </Text>
                    {destination.patrimoineMondial && destination.patrimoineMondial.length > 0 &&
                        <View row iCenter marginT={20}>
                            <Image source={images.tab.inspiration.Heritage} width={15} height={15} marginR={10} />
                            <Text>{(destination.patrimoineMondial[0]?.label || '').toUpperCase()}</Text>
                        </View>}

                    <AnimatedView
                        animation={'zoomIn'}
                        style={defaultStyle.favorite}>
                        <FavoriteIcon size='md' articleId={destination.id} isFavorite={destination.isFavorite} callback={favoriteCallback} />
                    </AnimatedView>
                    <View absolute={1} size={100} border={50} top={20} right={-60} color='primary' />
                </View>}
                {
                    !destination &&
                    <ActivityIndicator flex marginT={20} />
                }
                {
                    destination && destination.content.map(renderContent)
                }
                {destination && (isAllRegions || allowedRegions?.includes(destination.region?.id)) && <Suggestions regionId={destination.region?.id} suggestionDescription={suggestionDescription} suggestionsTitle={destination.suggestionsTitle} />}
                {destination && <Pub marginV={0} placement='content_end' nid={nid} />}
                {destination && !isPro && <ServicesCard />}
            </AnimatedView>
        </TabContainer>
    )
}

export default InspirationDestinationScreen