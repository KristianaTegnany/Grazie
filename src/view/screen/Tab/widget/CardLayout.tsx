import { Source } from "react-native-fast-image"
import normalize from "services/utils/normalize";
import { ImageBackground, Pressable, Text, View } from "widget/Native"
import ButtonIcon from "./ButtonIcon";
import LinearGradient from "react-native-linear-gradient";
import { SharedElement } from "react-navigation-shared-element";
import Icon from "react-native-vector-icons/AntDesign";
import colors from "themes/colors";
import { ReactNode } from "react";
import PrivateFlag from "../../User/Membership/widget/PrivateFlag";

export type ICardLayout = {
    blur?: boolean;
    source: Source;
    type?: 'rect' | 'sqr' | 'win';
    size: 'xs' | 'sm' | 'ml' | 'md' | 'lg';
    category?: string;
    dark?: boolean;
    id?: string;
    title?: string;
    subtitle?: string;

    isGreen?: boolean;
    isFato?: boolean;
    isPrivate?: boolean;
    hasVideo?: boolean;
    isFavorite?: boolean;

    selected?: boolean;
    sharedId?: string;

    marginL?: number;
    marginR?: number;
    marginB?: number;
    marginH?: number;
    noGradient?: boolean;

    poster?: boolean;
    renderFavoriteIcon?: ReactNode;

    favoriteCallback?: (id: string) => void;
    onPress?: () => void;
    onEditPress?: () => void;
    onDeletePress?: () => void;

    onGreenPress?: () => void;
    onFatoPress?: () => void;
    onDotPress?: () => void;
}

const CardLayout = ({ blur, dark, source, type, size, category, title, subtitle, isGreen, isFato, isPrivate, hasVideo, selected, sharedId, marginL, marginR, marginB, marginH, noGradient, poster, renderFavoriteIcon, onPress, onEditPress, onDeletePress, onDotPress, onGreenPress, onFatoPress }: ICardLayout) => {
    const textEnd = size !== 'xs' && !(['sm', 'md'].includes(size) && type === 'sqr')
    let width = undefined,
        height: number | undefined = 324,
        borderT = 10,
        borderB = 10,
        titleS = 22,
        titleR = true,
        titleB = false,
        subtitleS = 17,
        aspectRatio = undefined

    if (type === 'sqr') {
        titleB = true
        titleR = false
        titleS = 17

        if (size === 'xs') {
            width = 175 //(390 - 40) / 2 //158
            height = undefined //158
            aspectRatio = 1
            titleS = 15
        }
        else if (size === 'sm') {
            width = 140 //(390 - 40) / 2.5
            aspectRatio = 1.34
            height = undefined
            titleS = 15
        }
        else if (size === 'md') {
            width = 175 //(390 - 40) / 2 //163
            aspectRatio = 1.25
            height = undefined //130
            borderT = 6
            borderB = 6
        }
        else {
            width = 250
            height = 210
        }
    }
    else if (type === 'win') {
        titleB = true
        titleR = false
        titleS = 17

        if (size === 'sm') {
            width = 140 //(screenWidth - 40) / 2.5
            height = undefined
            aspectRatio = 0.69
            borderT = 129
            borderB = 10
        }
        else {
            width = 175
            aspectRatio = 0.7
            height = undefined //243
            borderT = 85
            borderB = 6
            titleS = 15
            subtitleS = 12
        }
    } else if (size === 'sm') {
        height = 193

        if (!category)
            titleS = 28
        else subtitleS = 15
    }
    else if (size === 'md') {
        width = 250
        height = 345
        borderT = 16
        borderB = 16

        subtitleS = 15
    }
    else if (size === 'ml') {
        width = 294
        height = 264
        borderT = 10
        borderB = 10

        titleS = 20
        subtitleS = 17
    }

    return (
        <Pressable onPress={onPress} nestedTouch={!(isPrivate && !title)} marginB={marginB} marginH={marginH} marginL={marginL} marginR={marginR}>
            <SharedElement id={sharedId || ''}>
                <ImageBackground ImageProps={{
                    source,
                    resizeMode: 'cover',
                }} blur={blur} width={width} height={height} borderT={borderT} borderB={borderB} color={poster ? 'onSecondaryLight' : undefined} aspectRatio={aspectRatio} />
            </SharedElement>
            {dark && <View absolute={1} top={0} left={0} right={0} bottom={0} borderT={borderT} borderB={borderB} hexColor="#00000055" />}
            <View between absolute={1} top={0} bottom={0} left={0} right={0} borderT={borderT} borderB={borderB} borderW={selected ? 2 : 0} borderC={'primary'}>
                {selected && <View absolute={1} right={10} top={10}><Icon name="checkcircle" color={colors.primary} size={25} /></View>}
                <View row between iCenter padding={textEnd ? 20 : 0}>
                    <View row>
                        {
                            isGreen && onGreenPress &&
                            <ButtonIcon type="green" size='xs' onPress={onGreenPress} />
                        }
                        {
                            isFato && onFatoPress &&
                            <ButtonIcon type="fato" size='xs' onPress={onFatoPress} />
                        }
                        {
                            hasVideo &&
                            <ButtonIcon type="video" size='xs' />
                        }

                    </View>
                    <View>
                        {renderFavoriteIcon}
                        {
                            onDotPress &&
                            <ButtonIcon type="dot" onPress={onDotPress} />
                        }
                    </View>
                </View>
                {
                    !textEnd &&
                    <View padding={10}>
                        <Text marginH={10} center size={titleS} rosha={titleR} bold={titleB} color='white'>{['xs', 'md'].includes(size) ? (title || '').toUpperCase() : title}</Text>
                    </View>
                }
                <View>
                    {
                        textEnd && (
                            <LinearGradient style={{ padding: normalize(20), paddingTop: (type === 'rect' && size === 'sm') ? 0 : normalize(40), borderBottomLeftRadius: normalize(borderB), borderBottomRightRadius: normalize(borderB) }}
                                colors={[
                                    'rgba(0,0,0,0)',
                                    'rgba(0,0,0,0.3)',
                                    'rgba(0,0,0,1)',
                                ]} locations={noGradient ? [1, 1, 1] : [0, 0.3, 1]}>
                                {
                                    (type === 'win' && size !== 'sm' && onEditPress && onDeletePress) &&
                                    <View row marginB={10}>
                                        <ButtonIcon type='edit' onPress={onEditPress} />
                                        <ButtonIcon marginL={10} type='delete' onPress={onDeletePress} />
                                    </View>
                                }
                                {isPrivate && <PrivateFlag />}
                                {!!category &&
                                    <Text size={15} marginB={5} bold color='white' numberOfLines={1}>{category.toLocaleUpperCase()}</Text>
                                }
                                {!!title && <Text size={titleS} rosha={titleR} bold={titleB} color={noGradient ? undefined : 'white'} numberOfLines={type === 'rect' || (type === 'win' && size !== 'sm') || (type === 'sqr' && size === 'md') ? 1 : 2}>{title}</Text>}
                                {!!subtitle &&
                                    <Text size={subtitleS} marginT={5} color={noGradient ? undefined : 'white'} numberOfLines={2}>{subtitle}</Text>
                                }
                            </LinearGradient>
                        )
                    }
                </View>
            </View>
        </Pressable>
    )
}

export default CardLayout;