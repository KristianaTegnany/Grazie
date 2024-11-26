import React, { /*memo, */ useState } from 'react';
import useDetailCtr from './detailCtr';
import ActivityIndicator from 'widget/Native/ActivityIndicator';
import CardLayout from '../widget/CardLayout';
import { AnimatedView, FlatList, Image, View } from 'widget/Native';
import ListOptionsModal from './ListOptionsModal';
import { images } from 'assets/images';
import TitleBackBtn from 'widget/Header/TitleBackBtn';
import { ListRenderItem } from 'react-native';

const RenderItem = ({ index, item, readOnly, onPress, onDotPress }: { item: any, index: number, readOnly?: boolean, onPress: () => void, onDotPress: () => void }) => {
    return (
        <AnimatedView key={index} animation={index < 5 ? 'fadeInUp' : undefined} delay={index < 5 ? 100 * index : undefined} opacity={readOnly ? 0.5 : 1} pointerEvents={readOnly && 'none'}>
            <CardLayout
                key={item.id}
                type='rect'
                size='sm'
                marginB={10}
                sharedId={`${item.type === 'fiche_destination' ? 'inspiration' : (item.type === 'fiche_partenaires' ? 'address' : 'article')}.${item.id}.photo`}
                title={item.title} subtitle={item.summary}
                category={(item.category ? (item.category.label + ' - ') : '') + '' + (item.region?.label || '')}
                source={{ uri: item.thumbnail?.urlLq }}
                onDotPress={onDotPress} onPress={onPress} />
        </AnimatedView>
    )
} //, (prev, next) => JSON.stringify(prev.item) === JSON.stringify(next.item))

const FavoriteDetailScreen = () => {
    const {
        allowedRegions,
        hasPro,
        param,
        cards,
        loading,
        loadingMore,
        fetchMoreDetails,
        goToFicheArticle,
        refresh
    } = useDetailCtr();

    const [listOptionsModal, setListOptionsModal] = useState(false)
    const [selectedId, setSelectedId] = useState<string | undefined>()

    const deleteFavoriteCallback = async () => {
        await refresh()
    }

    const renderItem: ListRenderItem<any> = ({ item, index }) => <RenderItem index={index} item={item} readOnly={!hasPro && !allowedRegions?.includes(item.region?.id)} onPress={() => goToFicheArticle(item)} onDotPress={() => {
        setSelectedId(item.id);
        setListOptionsModal(true);
    }} />

    return (
        <View flex>
            <TitleBackBtn title={param.title} />
            {
                loading &&
                <ActivityIndicator absolute={1} top={0} bottom={0} left={0} right={0} center />
            }
            <View flex paddingV={20} paddingH={15}>
                <FlatList
                    data={cards}
                    infiniteScroll
                    loading={loadingMore}
                    onEndReached={fetchMoreDetails}
                    renderItem={renderItem}
                />
            </View>
            <View absolute={-1} center top={0} left={0} bottom={0} right={0}>
                <Image source={images.tab.inspiration.MoonLeft} absolute={0} left={0} height={360} width={180} resizeMode='contain' />
            </View>
            <ListOptionsModal id={selectedId} listId={param.id} modal={listOptionsModal} setModal={setListOptionsModal} callback={deleteFavoriteCallback} />
        </View>
    );
};

export default FavoriteDetailScreen;
