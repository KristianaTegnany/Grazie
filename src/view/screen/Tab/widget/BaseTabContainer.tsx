import React, { PropsWithChildren, ReactNode } from 'react';
import { Animated, Dimensions, ListRenderItem, NativeScrollEvent, NativeSyntheticEvent, StyleSheet } from 'react-native';
import TabHeader from './TabHeader';
import colors from 'themes/colors';
import TabImageBackground from './TabImageBackground';
import { Source } from 'react-native-fast-image';
import { AnimatedView, FlatList, View } from 'widget/Native';
import { SharedElement } from 'react-navigation-shared-element';
import LinearGradient from 'react-native-linear-gradient';
import normalize from 'services/utils/normalize';

type IProps = PropsWithChildren & {
    backBtn?: boolean;
    forwardRef?: React.Ref<any> | undefined;
    showTitle?: boolean;
    loading?: boolean;
    parentAnim?: any;
    title: string;
    subtitle?: string;
    image?: Source;
    sharedId?: string;

    data?: any;
    numColumns?: number,

    renderFooter?: ReactNode;
    renderHeader?: ReactNode;
    search?: boolean;
    renderItem?: ListRenderItem<any>;
    onEndReached?: () => void;
    onSearch?: (text: string, offset?: number) => void;
    toggleSearch?: () => void;
};

const windowHeight = Dimensions.get('window').height;

export const ListHeaderComponent = ({ image, renderHeader, subtitle, title }: any) => {
    return (
        <>
            <TabImageBackground
                image={image}
                title={title}
                subtitle={subtitle}
            />
            <View marginT={-25} fullWidth height={25} borderT={25} color='white' />
            {renderHeader}
        </>
    )
}

const BaseTabContainer = (props: IProps) => {
    const {
        forwardRef,
        image,
        subtitle,
        title,
        sharedId,
        showTitle,

        data,
        loading,
        numColumns,
        renderFooter,
        renderHeader,
        search,
        onSearch,
        renderItem,
        toggleSearch,
    } = props;

    const marginAnim = new Animated.Value(30);

    const animatedBg = marginAnim.interpolate({
        inputRange: [windowHeight * 0.3, windowHeight * 0.33],
        outputRange: [image ? 'rgba(255, 255, 255, 0)' : 'rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 1)'],
        extrapolate: 'clamp',
    });

    const animatedContent = marginAnim.interpolate({
        inputRange: [windowHeight * 0.3, windowHeight * 0.33],
        outputRange: [image ? 'rgba(255, 255, 255, 1)' : colors.onSecondary, colors.onSecondary],
        extrapolate: 'clamp',
    });

    const animatedTitle = marginAnim.interpolate({
        inputRange: [windowHeight * 0.3, windowHeight * 0.33],
        outputRange: [image ? 0 : 1, 1],
        extrapolate: 'clamp',
    });

    const scrollHandler = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        return Animated.event(
            [
                {
                    nativeEvent: {
                        contentOffset: {
                            y: marginAnim,
                        },
                    },
                },
            ],
            { useNativeDriver: false }
        )(event);
    };

    const onEndReached = () => {
        if (data?.length > 0 && props.onEndReached)
            props.onEndReached()
    }

    return <>
        <AnimatedView absolute={image ? 2 : false} top={0} left={0} right={0} animatedColor={animatedBg}>
            <TabHeader
                animatedTitle={animatedTitle}
                backBtn={props?.backBtn}
                contentColor={animatedContent}
                search={search}
                text={title || undefined}
                onSearch={onSearch}
                toggleSearch={toggleSearch}
            />
            {!image && <LinearGradient style={{ height: normalize(20) }} colors={[colors.onTertiary, 'white']} />}
        </AnimatedView>
        {renderItem ?
            <FlatList
                color='white'
                data={data}
                flex
                infiniteScroll
                initialNumToRender={5}
                loading={loading}
                numColumns={numColumns}
                onEndReached={onEndReached}
                onScroll={scrollHandler}
                ListHeaderComponent={<ListHeaderComponent backBtn={props.backBtn} image={image} renderHeader={renderHeader} showTitle={showTitle} subtitle={subtitle} title={title} />}
                renderFooter={renderFooter}
                renderItem={renderItem}
            /> :
            <>
                <Animated.ScrollView
                    ref={forwardRef}
                    bounces={false}
                    showsVerticalScrollIndicator={false}
                    scrollEventThrottle={16}
                    contentContainerStyle={styles.scrollContainer}
                    onScroll={props?.parentAnim || scrollHandler}>
                    {image && <SharedElement
                        id={sharedId || ''}>
                        <TabImageBackground
                            image={image}
                            title={(props?.backBtn && !showTitle) ? undefined : title}
                            subtitle={subtitle}
                            titleLeft={showTitle}
                        />
                    </SharedElement>}
                    {props.children}
                </Animated.ScrollView>
            </>
        }
    </>
};

export default BaseTabContainer;

const styles = StyleSheet.create({
    nav: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1,
    },
    scrollContainer: {
        backgroundColor: 'white',
        minHeight: '100%'
    }
});
