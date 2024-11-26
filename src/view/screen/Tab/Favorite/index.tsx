import TabContainer from '../widget/TabContainer';
import { ActivityIndicator, Text, View } from 'widget/Native';
import useFavoriteCtr, { List } from './favoriteCtr';
import ButtonIcon from '../widget/ButtonIcon';
import CardLayout from '../widget/CardLayout';
import { images } from 'assets/images';
import { /*memo, */useState } from 'react';
import ConfirmDeleteModal from '../widget/ConfirmDeleteModal';
import Pub from '../widget/Pub';
import { ListRenderItem } from 'react-native';
import AddOrEditList from './widget/addOrEditList';

const RenderList = ({ list, marginL, marginR, onDeletePress, onEditPress, onPress }: { list: List, marginL: number, marginR: number, onDeletePress: () => void, onEditPress: () => void, onPress: () => void }) => {
    return (
        <CardLayout key={list.id}
            type='win'
            size='md'
            noGradient={!list.thumbnail?.urlLq} source={list.thumbnail?.urlLq ? { uri: list.thumbnail?.urlLq } : images.tab.favorite.FavoritePattern} title={list.title} subtitle={list.entitiesTotalLabel} marginB={20}
            marginR={marginR}
            marginL={marginL}
            onPress={onPress}
            onEditPress={onEditPress}
            onDeletePress={onDeletePress}
        />
    )
} //, (prev, next) => JSON.stringify(prev.list) === JSON.stringify(next.list))

const FavoriteScreen = () => {

    const {
        myLists,
        myListsDescription,
        favorites,

        headerBg,
        headerDescription,

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
    } = useFavoriteCtr();

    const [modalDeleteList, setModalDeleteList] = useState(false)
    const [currentListId, setCurrentListId] = useState<string | undefined>()
    const [deleteModalTitle, setDeleteModalTitle] = useState<string>("")

    const openDeleteListModal = () => {
        setModalDeleteList(true)
    }

    const onDeleteList = async () => {
        await onDeletePress(currentListId!)
        setCurrentListId(undefined)
        setDeleteModalTitle("")
    }

    const beforeDeletePress = (list: List) => {
        setCurrentListId(list.id)
        setDeleteModalTitle(list.removeListConfirm)
        openDeleteListModal()
    }

    const renderItem: ListRenderItem<any> = ({ item, index }) => {
        return <RenderList marginR={index % 2 === 0 ? 10 : 0} marginL={index % 2 === 0 ? 15 : 0} list={item} onPress={() => goToDetail(item)} onEditPress={() => onEditPress(item)} onDeletePress={() => beforeDeletePress(item)} />
    }


    return (
        <>
            <TabContainer
                title={favorites}
                subtitle={headerDescription}
                image={{ uri: headerBg?.urlLq }}
                data={lists}
                loading={loadingMore}
                numColumns={2}
                onEndReached={fetchMoreLists}
                renderHeader={
                    <>
                        <View row between marginH={15} marginB={20}>
                            <View flex>
                                <Text size={28} rosha marginV={10}>{myLists}</Text>
                                <Text color='onPrimary'>{myListsDescription}</Text>
                            </View>
                            <ButtonIcon type='add' color='primaryDark' onPress={openAddOrEditModal} />
                        </View>
                        {loading && <ActivityIndicator padding={20} />}
                    </>
                }
                renderItem={renderItem}
                renderFooter={<Pub marginT={0} placement='favorites_home' />}
            />
            <AddOrEditList id={editList?.id} modal={editList !== undefined || addOrEditModal} name={editList?.name} close={closeAddOrEditModal} callback={updateLists} />
            <ConfirmDeleteModal loading={loading} title={deleteModalTitle} modal={modalDeleteList} setModal={setModalDeleteList} onPress={onDeleteList} />
        </>
    )
}

export default FavoriteScreen;