import React from 'react';
import {
    AnimatedView,
    Image,
    Text,
    TextHtml,
    View,
} from 'widget/Native';
import defaultStyle from 'themes/defaultStyle';
import { images } from 'assets/images';
import useArticleCtr from './articleCtr';
import TabContainer from '../widget/TabContainer';
import EyeCard from '../widget/EyeCard';
import ContactCard from '../widget/ContactCard';
import ActivityIndicator from 'widget/Native/ActivityIndicator';
import FavoriteIcon from '../widget/FavoriteIcon';
import { Divider } from '../widget/TabFilter';
import Suggestions from './widget/suggestions';
import Video from 'react-native-video';
import { StyleProp, ViewStyle } from 'react-native';
import colors from 'themes/colors';
import PrivateFlag from '../../User/Membership/widget/PrivateFlag';
import PrivateLayer from '../../User/Membership/widget/PrivateLayer';

const Media = ({ content }: { content: any }) => {
    const isVideo = content.media?.type === 'video'
    const source = { uri: content.media?.urlLq }
    const style: StyleProp<ViewStyle> = { height: '100%', width: '100%', backgroundColor: colors.onSecondaryLight }
    return (
        <View marginB={38} height={265} fullWidth>
            {isVideo ? <Video source={source} style={style} resizeMode='contain' controls /> : <Image source={source} height={265} width={'100%'} />}
        </View>
    )
}

const ArticleScreen = () => {
    const {
        fattoMano,
        gigiGreen,
        ingredients,
        inKitchen,
        isPrivate,
        italy,
        param,
        article,
        publishedOn,
        ref,
        toContact,
        goToArticle,
        refresh
    } = useArticleCtr();

    const renderContent = (content: any, i: number) => {
        return content.type === 'media' ?
            <Media key={i} content={content} />
            :
            <View key={i} paddingH={content.type !== 'recipe' ? 15 : 0}>
                {content.type === 'title_text' &&
                    <View marginB={isPrivate ? 0 : 38}>
                        {!!content.title &&
                            <Text size={22} rosha marginB={20}>{content.title}</Text>
                        }
                        <TextHtml children={content.contentHtml} />
                        {isPrivate && <PrivateLayer isMag />}
                    </View>
                }
                {content.type === 'title' &&
                    <View marginB={38}>
                        <TextHtml rosha size={22} children={content.titleHtml} />
                    </View>
                }
                {content.type === 'text' &&
                    <View marginB={38}>
                        <TextHtml children={content.contentHtml} />
                    </View>
                }
                {content.type === 'gigi_friends' &&
                    <EyeCard title={content.title} description={content.contentHtml} />
                }
                {content.type === 'details_contact' &&
                    <View marginB={38}>
                        <Divider marginT={0} marginB={38} />
                        <ContactCard
                            title={toContact}
                            place={content.address}
                            mail={content.emailAddresses.join(', ')}
                            phone={content.phoneNumbers.join(', ')}
                            web={content.website}
                            room={content.roomsLabel}
                            amenities={content.rooms}
                            fbLink={content.socialNetworks?.find((item: any) => item.id === 'facebook')?.url}
                            instaLink={content.socialNetworks?.find((item: any) => item.id === 'instagram')?.url}
                        />
                    </View>
                }
                {content.type === 'recipe' &&
                    <View marginB={38}>
                        <Divider height={8} marginT={0} marginB={38} />
                        <View paddingH={15}>
                            <Text size={22} rosha marginB={20}>{ingredients}</Text>
                            <TextHtml light children={content.ingredientsHtml} />
                        </View>
                        <Divider height={8} marginT={38} marginB={38} />
                        <View paddingH={15}>
                            <Text size={22} rosha>{inKitchen}</Text>
                            {content.stepsHtml && content.stepsHtml.map((step: any, i: number) =>
                                <View key={i} marginT={20}>
                                    <Text rosha size={22} color='primary' marginB={10}>{i + 1}/</Text>
                                    <TextHtml children={step.contentHtml} />
                                </View>
                            )}
                        </View>
                    </View>
                }
            </View>
    }

    return (
        <TabContainer forwardRef={ref} title={param.title} sharedId={`article.${param.id}.photo`}
            image={{ uri: param.thumbnail?.urlLq }} backBtn>
            <AnimatedView
                duration={500}
                animation={'slideInUp'}
                paddingT={18}
            >
                <View paddingH={15} marginB={38}>
                    {isPrivate && <PrivateFlag />}
                    <Text size={15} color='textColorBlack'>
                        {(param.category?.label || article?.category?.label || '').toUpperCase()} - {(param.region?.label || italy).toUpperCase()}
                    </Text>
                    <Text size={25} rosha color='textColorBlack' marginT={15} marginR={60}>
                        {(param.title || '').toUpperCase()}
                    </Text>
                    {article &&
                        <View>
                            <Text size={15} marginT={20} marginB={10} color='textColorGrey'>
                                {publishedOn} {article.created} - {article.author?.label}</Text>
                            {
                                article.isGreen &&
                                <View row iCenter>
                                    <Image source={images.Green} width={12} height={12} marginR={5} />
                                    <Text size={15} bold color='green'>
                                        {gigiGreen}
                                    </Text>
                                </View>
                            }
                            {
                                article.isHandmade &&
                                <View row iCenter>
                                    <Image source={images.Fato} width={12} height={12} marginR={5} />
                                    <Text size={15} bold color='primaryDark'>
                                        {fattoMano}
                                    </Text>
                                </View>
                            }
                        </View>
                    }
                    {
                        article &&
                        <AnimatedView
                            animation={'zoomIn'}
                            style={defaultStyle.favorite}>
                            <FavoriteIcon size='md' articleId={article.id} isFavorite={article.isFavorite} callback={refresh} />
                        </AnimatedView>
                    }
                    <View absolute={1} size={100} border={50} top={20} right={-60} color='primary' />
                </View>
                {
                    article === undefined &&
                    <ActivityIndicator flex marginT={20} />
                }
                {
                    article && article.content.filter((_: any, i: number) => isPrivate ? i === 0 : true).map(renderContent)
                }
                {article && !isPrivate && <Suggestions articleId={param.id} category={param.category?.id} isSubscribed goToArticle={goToArticle} />}
            </AnimatedView>
        </TabContainer>
    );
};

export default ArticleScreen;
