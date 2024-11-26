import TabContainer from '../widget/TabContainer';
import { ActivityIndicator } from 'widget/Native';
import TabCategories from '../widget/TabCategories';
import useMagCtr from './magCtr';
import CenterModal from '../widget/CenterModal';
import { useState } from 'react';
import { ListRenderItem } from 'react-native';
import Stories from './stories';
import RenderArticle from './widget/articleItem';
import PrivateModal from '../../User/Membership/widget/PrivateModal';

const MagScreen = () => {

    const {
        articlesTitle,
        theMag,
        headerBg,
        headerDescription,
        datas,
        gigiGreenTitle,
        gigiGreenDescription,
        fattoManoTitle,
        fattoManoDescription,
        isSubscribed,
        italy,

        category,
        privateModal,
        closePrivateModal,
        fetchMoreArticles,
        goToArticle,
        openPrivateModal,
        setCategory,
        updateArticleFavorite
    } = useMagCtr();

    const [showGreen, setShowGreen] = useState(false)
    const [showFato, setShowFato] = useState(false)

    const onGreenPress = () => setShowGreen(true)
    const onFatoPress = () => setShowFato(true)

    const onHideGreen = () => setShowGreen(false)
    const onHideFato = () => setShowFato(false)

    const renderItem: ListRenderItem<any> = ({ item, index }) => {
        return <RenderArticle article={item} category={category} index={index} isSubscribed={isSubscribed} italy={italy} goToArticle={goToArticle} onGreenPress={onGreenPress} onFatoPress={onFatoPress} updateArticleFavorite={updateArticleFavorite} />
    }

    return (
        <>
            <TabContainer
                data={datas.articles}
                image={{ uri: headerBg?.urlLq }}
                title={theMag}
                subtitle={headerDescription}
                loading={datas.loadingMore}
                onEndReached={fetchMoreArticles}
                renderHeader={
                    <>
                        <Stories isSubscribed={isSubscribed} openPrivateModal={openPrivateModal} />
                        <TabCategories divider category={category} title={articlesTitle} type='mag' setCategory={setCategory} marginB={10} />
                        {datas.loading && <ActivityIndicator padding={20} />}
                    </>
                }
                renderItem={renderItem}
            />
            <CenterModal modal={showGreen} type='green' closeModal={onHideGreen} title={gigiGreenTitle} description={gigiGreenDescription} />
            <CenterModal modal={showFato} type='fato' closeModal={onHideFato} title={fattoManoTitle} description={fattoManoDescription} />
            <PrivateModal modal={privateModal} closeModal={closePrivateModal} />
        </>
    )
}

export default MagScreen;