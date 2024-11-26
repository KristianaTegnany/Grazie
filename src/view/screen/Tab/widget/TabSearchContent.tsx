import React, { PropsWithChildren } from 'react';
import { ListRenderItem } from 'react-native';
import { ActivityIndicator, FlatList, Image, Text, TextHtml, TouchableOpacity, View } from 'widget/Native';
import { SharedElement } from 'react-navigation-shared-element';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import useAppNavigator from 'hooks/useAppNavigator';
import routeName from 'routes/routeName';
import { images } from 'assets/images';
import { useSelector } from 'react-redux';
import { rootState } from 'store/reducer';
import PrivateModal from '../../User/Membership/widget/PrivateModal';

type IProps = PropsWithChildren & {
    canFetchMore: boolean;
    loadingMore: boolean;
    searching: boolean;
    searchResults: any[];
    showPrivateModal: boolean;
    showSearch: boolean;
    onSearch: (text: string | null, nb: number) => void;
    closePrivateModal: () => void
};

const TabSearchContent = (props: IProps) => {
    const { canFetchMore, loadingMore, searching, searchResults, showPrivateModal, showSearch, closePrivateModal, onSearch } = props;
    const navigator = useAppNavigator();
    const { top } = useSafeAreaInsets();

    const theMag = useSelector((state: rootState) => state.magReducer.magDatas.translation.theMag);
    const inspiration = useSelector((state: rootState) => state.inspirationReducer.inspirationDatas.translation.inspiration);
    const addressesListTitle = useSelector((state: rootState) => state.addressReducer.addressDatas.translation.addressesListTitle);

    const fetchMoreResults = () => {

        if (!loadingMore && canFetchMore) {
            onSearch(null, searchResults.length);
        }
    }

    const renderSearchResult: ListRenderItem<any> = ({ item }) => {
        const goToFiche = () => {
            navigator.navigateScreen(
                item.type === "fiche_destination"
                    ? routeName.tab.inspiration.destination
                    : item.type === "fiche_partenaires"
                        ? routeName.tab.address.card
                        : routeName.tab.mag.article,
                {
                    article: item,
                    detail: item,
                },
            );
        };

        return (
            <TouchableOpacity onPress={goToFiche}>
                <View row padding={10} borderBW={1} borderC='tertiary' iStart>
                    <SharedElement id={`${item.type === 'fiche_destination' ? 'inspiration' : (item.type === 'fiche_partenaires' ? 'address' : 'article')}.${item.id}.photo`}>
                        <Image poster source={{ uri: item.thumbnail?.urlLq }} border={10} width={100} height={100} />
                    </SharedElement>
                    <View flex marginL={10}>
                        <Text marginB={5} size={10}>{(item.type === "fiche_destination" ? inspiration : (item.type === "fiche_partenaires" ? addressesListTitle : theMag)).toUpperCase()}</Text>
                        <Text marginB={5} rosha size={18}>{item.title}</Text>
                        <TextHtml size={12}>{item.body}</TextHtml>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    return <>
        {
            searching &&
            <ActivityIndicator absolute={1} top={0} bottom={0} left={0} right={0} center />
        }
        {showSearch &&
            <View absolute top={top + 55} left={0} right={0} bottom={0} color='white' height={'100%'}>
                {searchResults.length > 0 ? <FlatList data={searchResults} infiniteScroll loading={loadingMore} onEndReached={fetchMoreResults} renderItem={renderSearchResult} /> : (
                    <View flex iCenter marginT={40}>
                        <Image source={images.tab.SearchPlaceholder} height={100} width={100} />
                        <Text marginT={40} size={14} color='onSecondaryLight'>Recherchez un restaurant, un hôtel, un guide...</Text>
                    </View>
                )}
            </View>}
        <PrivateModal modal={showPrivateModal} closeModal={closePrivateModal} />
    </>
};

export default TabSearchContent;