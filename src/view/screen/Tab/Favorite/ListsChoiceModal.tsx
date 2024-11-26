import { ListRenderItem } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import { useSelector } from "react-redux";
import { rootState } from "store/reducer";
import FullModal from "widget/Modal/FullModal"
import { Button, FlatList, Image, Text, TouchableOpacity, View } from "widget/Native"
import CardLayout from "../widget/CardLayout";
import { images } from "assets/images";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useCallback, useEffect, useState } from "react";
import Apollo from "services/utils/apollo";
import AddOrEditList from "./widget/addOrEditList";
import { List } from "./favoriteCtr";
import useStatusBar from "hooks/useStatusBar";

type IProps = {
    dark?: boolean;
    modal: boolean;
    onPress: (selectedIds: string[]) => void;
    setModal: (value: boolean) => void;
}

const ListsChoiceModal = ({ dark, modal, onPress, setModal }: IProps) => {
    const { changeStatusBar } = useStatusBar()
    const { bottom } = useSafeAreaInsets()

    const closeModal = () => {
        setModal(false)
    }

    const [loading, setLoading] = useState(false)
    const [addModal, setAddModal] = useState(false)
    const [selectedIds, setSelectedIds] = useState<string[]>([])
    const [loadingMore, setLoadingMore] = useState(false);
    const [canFetchMore, setCanFetchMore] = useState(true);
    const [lists, setLists] = useState<List[]>([]);

    const openAddModal = () => setAddModal(true)
    const closeAddModal = () => {
        //changeStatusBar('light-content');
        setAddModal(false)
    }

    function updateSelectedIds(id: string) {
        if (selectedIds.includes(id)) {
            setSelectedIds(selectedIds.filter(selectedId => selectedId !== id))
        }
        else setSelectedIds([...selectedIds, id])
    }

    const onSaveFavorite = async () => {
        setLoading(true)
        await onPress(selectedIds)
        setSelectedIds([])
        setLoading(false)
        closeModal()
    }

    useEffect(() => {
        if (modal) {
            changeStatusBar(dark? 'light-content' : 'dark-content')
        }
    }, [modal])

    const {
        favoriteDatas: {
            translation: {
                addTofavorites,
                save,
                createList,
                selectFavoritesList,
            }
        }
    } = useSelector((state: rootState) => state.favoriteReducer);


    const fetchLists = useCallback(async (hasOffset?: boolean) => {
        if (hasOffset) {
            setLoadingMore(true);
        } else {
            setLoading(true);
        }

        const res = await Apollo.getFavoriteLists(
            hasOffset ? lists.length : undefined,
        );
        if (res.favoritesLists?.items) {
            if (
                canFetchMore && parseInt(res.favoritesLists.total) ===
                lists.length + res.favoritesLists.items.length
            ) {
                setCanFetchMore(false);
            }
            const newLists: List[] = hasOffset
                ? [...lists, ...res.favoritesLists.items]
                : res.favoritesLists.items;
            setLists(newLists);
        }
        if (hasOffset) {
            setLoadingMore(false);
        } else {
            setLoading(false);
        }
    }, []);

    const fetchMoreLists = () => {
        if (!loading && !loadingMore && canFetchMore)
            fetchLists(true)
    }

    const updateLists = () => {
        setCanFetchMore(true)
    }

    useEffect(() => {
        if (canFetchMore) {
            fetchLists(true)
        }
    }, [fetchLists, canFetchMore])

    useEffect(() => {
        if (modal) {
            fetchLists()
        }
    }, [modal])

    const renderItem: ListRenderItem<any> = ({ item, index }) => {
        return index === 0 ? (
            <View marginB={20} marginL={10}>
                <TouchableOpacity noPadding onPress={openAddModal}>
                    <View size={170} color="secondary" border={10} center iCenter>
                        <View color="onQuartenary" size={60} border={30} center iCenter><Image source={images.tab.favorite.FavoriteAdd} width={25} height={25} /></View>
                    </View>
                </TouchableOpacity>
                <Text size={15} bold marginT={5} marginL={5}>{createList}</Text>
            </View>
        ) : (<View key={item.id} marginB={20} marginL={10}>
            <CardLayout type="sqr" size="xs" source={item.thumbnail?.urlLq ? { uri: item.thumbnail?.urlLq } : images.tab.favorite.FavoritePattern2} selected={selectedIds.includes(item.id)} onPress={() => updateSelectedIds(item.id)} />
            <Text size={15} bold marginT={5} marginL={5}>{item.title}</Text>
        </View>)
    }

    const modifiedLists = [{}, ...lists]

    return (
        <FullModal modal={modal}>
            <View flex marginB={bottom || 20}>
                <View row marginL={20} iCenter>
                    <TouchableOpacity onPress={closeModal} >
                        <Icon name="arrowleft" size={25} />
                    </TouchableOpacity>
                    <Text rosha size={22} marginL={20}>{addTofavorites}</Text>
                </View>
                <Text marginT={10} marginL={15} bold>{selectFavoritesList}</Text>
                <View marginV={20} flex paddingL={5}>
                    <FlatList data={modifiedLists} flex infiniteScroll loading={loadingMore} numColumns={2} onEndReached={fetchMoreLists} renderItem={renderItem} />
                </View>
                <Button marginH={20} text={save} md loading={loading} onPress={onSaveFavorite} />
            </View>
            <AddOrEditList modal={addModal} close={closeAddModal} callback={updateLists} />
        </FullModal>
    )
}

export default ListsChoiceModal