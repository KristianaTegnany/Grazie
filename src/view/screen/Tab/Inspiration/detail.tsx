import React /*, { memo }*/ from 'react';
import { AnimatedView, FlatList, View } from 'widget/Native';
import useAppNavigator from 'hooks/useAppNavigator';
import routeName from 'routes/routeName';
import useStatusBar from 'hooks/useStatusBar';
import DetailChoice from './widget/Choice';
import useDetailCtr from './detailCtr';
import TitleBackBtn from 'widget/Header/TitleBackBtn';
import ActivityIndicator from 'widget/Native/ActivityIndicator';
import TabFilter from '../widget/TabFilter';
import CardRectLayout from '../widget/CardRectLayout';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ListRenderItem, StyleSheet } from 'react-native';
import normalize from 'services/utils/normalize';

const RenderCard = ({ index, item, onPress, favoriteCallback }: { item: any, index: number, onPress: () => void, favoriteCallback: (id: string, isFavorite?: boolean) => void }) => {
    return (
        <AnimatedView key={index} animation={index < 5 ? 'fadeInUp' : undefined} delay={index < 5 ? 100 * index : undefined}>
            <CardRectLayout
                dark
                size='sm'
                sharedId={`inspiration.${item.id}.photo`}
                source={{ uri: item.thumbnail?.urlLq }}
                poster
                marginB={10}
                id={item.id}
                title={item.title}
                subtitle={item.summary}
                isFavorite={item.isFavorite}
                favoriteCallback={favoriteCallback}
                onPress={onPress}
            />
        </AnimatedView>
    )
} //, (prev, next) => JSON.stringify(prev.item) === JSON.stringify(next.item))

const InspirationDetailScreen = () => {
    useStatusBar('dark-content');
    const { bottom } = useSafeAreaInsets();
    const {
        details,
        error,
        filterDatas,
        filterRef,
        loading,
        showFilter,
        closeFilter,
        favoriteCallback,
        openFilter,
        setFilterDatas,
    } = useDetailCtr();
    const navigator = useAppNavigator();

    const renderItem: ListRenderItem<any> = ({ item, index }) => <RenderCard index={index} item={item} onPress={() =>
        navigator.navigateScreen(routeName.tab.inspiration.destination, {
            detail: item
        })} favoriteCallback={favoriteCallback} />

    const renderFilter: ListRenderItem<any> = ({ item }) => {
        const checked = item.items.filter((item: any) => item.checked)
        const nbChecked = checked.length
        return <DetailChoice
            title={nbChecked > 0 ? (nbChecked === 1 ? checked[0].label : `${checked[0].label} (+${nbChecked - 1})`) : item.title}
            disabled={nbChecked === 0}
            onPress={openFilter}
        />
    }

    return (
        <View flex color='white'>
            <TitleBackBtn title={'Inspiration'} />
            <View flex>
                <FlatList forwardRef={filterRef} contentContainerStyle={styles.badges} horizontal data={filterDatas} renderItem={renderFilter} keyExtractor={item => item.title} onScrollToIndexFailed={info => {
                    const wait = new Promise(resolve => setTimeout(resolve, 500));
                    wait.then(() => {
                        filterRef.current?.scrollToIndex({ index: info.index, animated: true });
                    })
                }} />
                {
                    loading && !error &&
                    <ActivityIndicator padding={20} />
                }
                <View flex paddingH={15} paddingB={bottom || 20}>
                    <FlatList
                        data={details}
                        renderItem={renderItem}
                    />
                </View>
            </View>
            {filterDatas.length > 0 && <TabFilter dark isVisible={showFilter} isSubscribed /*pour débloquer les filtres*/ data={filterDatas} closeModal={closeFilter} updateData={setFilterDatas} />}
        </View>
    );
};

const styles = StyleSheet.create({
    badges: { paddingHorizontal: normalize(15), marginBottom: normalize(20) }
})

export default InspirationDetailScreen;
