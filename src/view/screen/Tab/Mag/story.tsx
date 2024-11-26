import React, { useEffect, useState } from 'react';
import useStoryCtr from './storyCtr';
import { Image, Text, TextHtml, TouchableOpacity, View } from 'widget/Native';
import { Dimensions, GestureResponderEvent } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { imagesStory } from './stories';
import ActivityIndicator from 'widget/Native/ActivityIndicator';
import { TouchableOpacity as RNTouchable } from 'react-native';
import { Animated } from 'react-native';
import Video, { OnProgressData } from 'react-native-video';
import { OnLoadEvent } from 'react-native-fast-image';
import { openURL } from 'screen/Others/whoGigi';
import Icon from 'react-native-vector-icons/Feather';
import useStatusBar from 'hooks/useStatusBar';

const { height: screenHeight } = Dimensions.get('window')
const sm = screenHeight < 668,
    md = screenHeight > 667 && screenHeight < 813,
    paddingB = (sm ? 10 : (md ? 15 : 20)),
    paddingT = (sm ? 25 : (md ? 30 : 35))

const CTA = ({ title, color, url }: { title: string, color: `#${string}`, url: string }) => {
    return (
        <TouchableOpacity onPress={() => openURL(url)} border={13}>
            <View padding={10} height={46} center iCenter border={13} hexColor={color}>
                <Text color={color === BEIGE ? undefined : 'white'} bold size={16}>{title || 'CTA'}</Text>
            </View>
        </TouchableOpacity>
    )
}

const StoryHeader = ({ total, currentIndex, source, widthAnim, goBack }: { total?: number, currentIndex: number, source: { uri: string }, widthAnim: Animated.Value, goBack: () => void }) => {
    const renderStep = (_: any, i: number) => (
        <View
            key={i}
            flex
            height={3}
            border={1.5}
            marginL={2}
            color={i < currentIndex ? 'white' : 'onQuartenary'}
        >
            {i === currentIndex &&
                <Animated.View style={{
                    flex: 1,
                    backgroundColor: 'white',
                    borderRadius: 1.5,
                    width: widthAnim.interpolate({ inputRange: [0, 100], outputRange: ['0%', '100%'] })
                }} />}
        </View>
    )

    return (
        <View fullWidth>
            <View row iCenter marginH={10} marginT={5}>
                <TouchableOpacity onPress={goBack} noPadding>
                    <Image source={source} width={30} height={30} />
                </TouchableOpacity>
                <View row between flex>
                    {Array(total).fill(0).map(renderStep)}
                </View>
            </View>
            <TouchableOpacity sEnd noPadding marginR={13.5} onPress={goBack}>
                <Icon name='x' size={30} color='white' />
            </TouchableOpacity>
        </View>
    )
}

type IStoryMedia = {
    absolute?: boolean;
    aspectRatio?: number;
    flex?: boolean | number;
    paused?: boolean;
    source: { uri: string };
    type: "video" | "image";
    onLoad: (data: number | OnLoadEvent) => void;
}
const StoryMedia = ({ absolute, aspectRatio, flex, paused, source, type, onLoad }: IStoryMedia) => {

    const [duration, setDuration] = useState(0);
    const props = absolute ? { source, onLoad, absolute: -1, top: 0, left: 0, right: 0, bottom: 0 } : { source, onLoad }

    useEffect(() => {
        if (duration > 0) {
            onLoad(duration)
        }
    }, [duration])

    return type === "video" ?
        <View {...props} flex={flex}>
            <Video
                source={source}
                onProgress={(data: OnProgressData) => {
                    if (duration === 0 && data.seekableDuration) {
                        setDuration(data.seekableDuration)
                    }
                }}
                style={{ flex: 1 }}
                paused={paused}
                resizeMode="cover"
            />
        </View> : <Image {...props} resizeMode={'cover'} aspectRatio={aspectRatio} flex={flex} />
}

type ITheme = {
    [key: string]: {
        bg: `#${string}`,
        cta: `#${string}`,
        color: `#${string}`
    }
}

const TEMP1 = 'temp_1',
    TEMP2 = 'temp_2',
    TEMP3 = 'temp_3',
    TEMP4 = 'temp_4',
    BEIGE = '#F5EFE8',

    themes: ITheme = {
        theme_1: {
            bg: '#7C96A3',
            cta: BEIGE,
            color: '#FFFFFF'
        },
        theme_2: {
            bg: '#749079',
            cta: BEIGE,
            color: '#FFFFFF'
        },
        theme_3: {
            bg: '#AE694A',
            cta: BEIGE,
            color: '#FFFFFF'
        },
        theme_4: {
            bg: '#6F4048',
            cta: BEIGE,
            color: '#FFFFFF'
        },
        theme_5: {
            bg: '#A2B073',
            cta: BEIGE,
            color: '#FFFFFF'
        },
        theme_6: {
            bg: '#E5D5C5',
            cta: '#C77651',
            color: '#000'
        },
        theme_7: {
            bg: '#AE694A',
            cta: BEIGE,
            color: '#FFFFFF'
        },
        theme_8: {
            bg: '#AE694A',
            cta: '#C77651',
            color: '#FFFFFF'
        },
    }

const StoryScreen = () => {
    useStatusBar('dark-content')
    const {
        index,
        currentIndex,
        showTuto,
        stories,
        TEMP5,
        total,
        widthAnim,
        goBack,
        next,
        onPressIn,
        onPressOut,
        resume,
    } = useStoryCtr();

    const { bottom, top } = useSafeAreaInsets();

    const story = stories[currentIndex]

    const [loading, setLoading] = useState(true);
    const [paused, setPaused] = useState(false);

    const onLoad = (data: number | OnLoadEvent) => {
        if (typeof data === 'number') {
            resume(next, data * 1000)
        }
        else {
            resume(next)
        }
        setLoading(false)
    }

    useEffect(() => {
        setPaused(false)
        setLoading(true)
        if (stories[currentIndex]) {
            if (stories[currentIndex].template === TEMP5) {
                resume(next)
                setLoading(false)
            }
            else if (![TEMP1, TEMP2, TEMP3, TEMP4].includes(stories[currentIndex].template)) {
                next()
            }
        }
    }, [currentIndex])

    const onPressingIn = (event: GestureResponderEvent) => {
        setPaused(true)
        onPressIn(event)
    }

    const onPressingOut = (event: GestureResponderEvent) => {
        setPaused(false)
        onPressOut(event)
    }
    const style = { flex: 1 }

    return (
        <RNTouchable touchSoundDisabled activeOpacity={1} onPressIn={onPressingIn} onPressOut={onPressingOut} style={style}>
            <View flex marginT={top} borderT={10} overflow='hidden'>
                {!story &&
                    <ActivityIndicator flex center />
                }
                {
                    loading && <ActivityIndicator absolute top={0} left={0} bottom={0} right={0} center />
                }
                {
                    story && [TEMP1, TEMP4].includes(story.template) &&
                    <>
                        <View fullWidth aspectRatio={story.template === TEMP1 ? 0.92 : undefined} flex={story.template === TEMP4}>
                            <StoryMedia absolute paused={paused} type={story.media?.type} source={{ uri: story.media?.urlLq }} onLoad={onLoad} />
                            <View absolute top={0} left={0} bottom={0} right={0} between>
                                <StoryHeader currentIndex={currentIndex} source={imagesStory[index]} total={total} widthAnim={widthAnim} goBack={goBack} />
                                {
                                    story.template === TEMP4 &&
                                    <View paddingH={20} fullWidth paddingT={paddingT} paddingB={paddingT + bottom}>
                                        {story.cta && <CTA url={story.cta.url} color={themes[story.theme].cta} title={story.cta.title} />}
                                    </View>
                                }
                            </View>
                        </View>
                        {
                            story.template === TEMP1 &&
                            <View flex iCenter center hexColor={themes[story.theme].bg} paddingH={15} paddingB={paddingB + bottom}>
                                <Text center size={28} rosha hexColor={themes[story.theme].color} marginT={paddingB}>{story.title}</Text>
                                <TextHtml center hexColor={themes[story.theme].color} marginV={paddingB}>{story.text || ''}</TextHtml>
                                <View paddingH={20} fullWidth paddingT={paddingB}>
                                    {story.cta && <CTA url={story.cta.url} color={themes[story.theme].cta} title={story.cta.title} />}
                                </View>
                            </View>
                        }
                    </>
                }
                {
                    story && [TEMP2, TEMP3, TEMP5].includes(story.template) &&
                    <>
                        <View flex iCenter hexColor={themes[story.theme].bg}>
                            <StoryHeader currentIndex={currentIndex} source={imagesStory[index]} total={total} widthAnim={widthAnim} goBack={goBack} />
                            <View flex center iCenter paddingH={15} paddingT={20} paddingB={paddingT}>
                                <Text center size={28} rosha hexColor={themes[story.theme].color} marginV={paddingT}>{story.title}</Text>
                                <TextHtml center hexColor={themes[story.theme].color}>{story.text || ''}</TextHtml>
                            </View>
                            {
                                story.template === TEMP5 &&
                                <View paddingH={40} hexColor={themes[story.theme].bg} paddingB={paddingT + bottom} fullWidth>
                                    {story.cta && <CTA url={story.cta.url} color={themes[story.theme].cta} title={story.cta.title} />}
                                </View>
                            }
                        </View>
                        {story.template !== TEMP5 && <StoryMedia paused={paused} type={story.media?.type} source={{ uri: story.media?.urlLq }} onLoad={onLoad} flex />}
                        {
                            story.template === TEMP3 &&
                            <View paddingT={paddingT} paddingB={paddingT + bottom} paddingH={40} hexColor={themes[story.theme].bg}>
                                {story.cta && <CTA url={story.cta.url} color={themes[story.theme].cta} title={story.cta.title} />}
                            </View>
                        }
                    </>
                }
            </View>
        </RNTouchable>
    );
};

export default StoryScreen;
