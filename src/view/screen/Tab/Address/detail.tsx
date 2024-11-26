import React /*, { memo }*/ from 'react';
import { AnimatedView, FlatList, ScrollView, Text, View } from 'widget/Native';
import useStatusBar from 'hooks/useStatusBar';
import useDetailCtr from './detailCtr';
import TitleBackBtn from 'widget/Header/TitleBackBtn';
import ActivityIndicator from 'widget/Native/ActivityIndicator';
import DetailChoice from '../Inspiration/widget/Choice';
import TabFilter from '../widget/TabFilter';
import TabCategories from '../widget/TabCategories';
import CardRectLayout from '../widget/CardRectLayout';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ListRenderItem } from 'react-native';
import InnerShadow from 'widget/Header/InnerShadow';

const RenderAddress = ({ index, item, onPress, favoriteCallback }: { item: any, index: number, onPress: () => void, favoriteCallback: (id: string, isFavorite?: boolean) => void }) => {
    return (
        <AnimatedView key={index} animation={index < 5 ? 'fadeInUp' : undefined} delay={index < 5 ? 100 * index : undefined}>
            <CardRectLayout
                dark
                size='sm'
                sharedId={`address.${item.id}.photo`}
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

const AddressDetailScreen = () => {
    useStatusBar('dark-content');
    const { bottom } = useSafeAreaInsets();
    const {
        category,
        details,
        filterDatas,
        loading,
        loadingMore,
        partnerTypes,
        selectedPartner,
        showFilter,
        title,
        explore,
        filter,
        filterAllUri,

        closeFilter,
        fetchMoreDetails,
        goToCard,
        openFilter,
        setCategory,
        setFilterDatas,
        updateCardFavorite,
        updateSelectedPartner
    } = useDetailCtr();

    const renderItem: ListRenderItem<any> = ({ item, index }) => <RenderAddress index={index} item={item} onPress={() => goToCard(item)} favoriteCallback={updateCardFavorite} />

    const renderPartner = (partner: { id: string; label: string } | undefined, i: number) => {
        const checked = partner?.id === selectedPartner
        const onPress = () => updateSelectedPartner(partner?.id || '')

        return <DetailChoice key={i}
            title={partner?.label || ''}
            disabled={!checked}
            onPress={onPress}
        />
    }

    return (
        <View flex color='white'>
            <TitleBackBtn title={title} />
            <View marginH={20} marginB={10} row between>
                <View width={175}><Text size={22} bold color='black'>{explore}</Text></View>
                <DetailChoice
                    title={filter}
                    onPress={openFilter}
                />
            </View>
            <View flex paddingT={10}>
                <TabCategories hasImage allUri={filterAllUri} autoScroll marginB={10} category={category} type='address' setCategory={setCategory} />
                <InnerShadow fullWidth height={15} />
                {partnerTypes && <ScrollView horizontal paddingH={15} row marginB={10}>
                    {partnerTypes?.map(renderPartner)}
                </ScrollView>
                }
                {
                    loading &&
                    <ActivityIndicator padding={20} />
                }
                <View flex paddingH={15} paddingB={bottom || 20} marginT={5}>
                    <FlatList
                        data={details}
                        infiniteScroll
                        loading={loadingMore}
                        onEndReached={fetchMoreDetails}
                        renderItem={renderItem}
                    />
                </View>
            </View>
            {filterDatas.length > 0 && <TabFilter isVisible={showFilter} data={filterDatas} isSubscribed closeModal={closeFilter} updateData={setFilterDatas} />}
        </View>
    );
};

export default AddressDetailScreen;
