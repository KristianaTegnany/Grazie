import useAppNavigator from "hooks/useAppNavigator";
import routeName from "routes/routeName";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { rootState } from "store/reducer";
import { FavoriteService } from "services/applicatif/favorite/favoriteService";
import Apollo from "services/utils/apollo";
import Toast from "react-native-toast-message";

export type List = {
    id: string;
    title: string;
    entitiesTotal: number;
    entitiesTotalLabel: string;
    removeListConfirm: string;
    thumbnail: {
        urlLq: string;
    }
}

export default function useFavoriteCtr() {
    const {
        favoriteDatas: {
            translation: {
                myLists,
                myListsDescription,
                favorites,
                save,
                discover,
                createBtn,
                addTofavorites,
                nameYourList,
                options,
                changeList,
                delete: deleteBtn,
            },
            config: {
                favorites: {
                    headerDescription,
                    intro,
                    headerBg
                }
            }
        }
    } = useSelector((state: rootState) => state.favoriteReducer);

    const [loading, setLoading] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const [canFetchMore, setCanFetchMore] = useState(true);
    const [lists, setLists] = useState<List[]>([]);

    const [addOrEditModal, setAddOrEditModal] = useState(false)
    const [editList, setEditList] = useState<{ id: string, name: string } | undefined>()

    const navigator = useAppNavigator();

    const openAddOrEditModal = () => {
        setAddOrEditModal(true)
    }

    const closeAddOrEditModal = () => {
        setEditList(undefined)
        setAddOrEditModal(false)
    }

    const onEditPress = (list: List) => {
        setEditList({ id: list.id, name: list.title })
    }

    const onDeletePress = async (id: string) => {
        setLoading(true)
        const res = await FavoriteService.deleteList(id)
        if (res.success) {
            setLists(lists.filter(list => list.id !== id))
        }
        setLoading(false)
        Toast.show({ text2: res.message, type: res.success ? 'success' : 'error' })
    }

    const goToDetail = (list: List) => navigator.navigateScreen(routeName.tab.favorite.detail, {
        list
    })

    const fetchLists = async (hasOffset?: boolean) => {
        if (hasOffset) {
            setLoadingMore(true);
        } else {
            setLoading(true);
        }

        const res = await Apollo.getFavoriteLists(
            hasOffset ? lists.length : undefined,
        );
        if (res?.favoritesLists?.items) {
            if (
                parseInt(res.favoritesLists.total) ===
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
    };

    const fetchMoreLists = () => {
        if (!loading && !loadingMore && canFetchMore)
            fetchLists(true)
    }

    const updateLists = () => {
        setCanFetchMore(true)
        fetchLists(true)
    }

    useEffect(() => {
        if (navigator.isFocused)
            fetchLists()
    }, [navigator.isFocused])

    return {
        myLists,
        myListsDescription,
        favorites,
        save,
        discover,
        createBtn,
        addTofavorites,
        nameYourList,
        options,
        changeList,
        deleteBtn,


        headerBg,
        headerDescription,
        intro,
        lists,

        addOrEditModal,
        editList,
        loading,
        loadingMore,

        closeAddOrEditModal,
        fetchMoreLists,
        goToDetail,
        onDeletePress,
        onEditPress,
        openAddOrEditModal,
        updateLists,
    };
}
