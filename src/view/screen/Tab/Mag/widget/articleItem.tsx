import { View } from "widget/Native";
//import { memo } from 'react';
import CardRectLayout from "screen/Tab/widget/CardRectLayout";
import Pubs from "../pubs";
import { IArticle } from "store/slice/mag/type";

const RenderArticle = ({ article, category, index, isSubscribed, italy, goToArticle, onGreenPress, onFatoPress, updateArticleFavorite }: { article: IArticle, category: number, index: number, isSubscribed: boolean, italy: string, goToArticle: (article: IArticle) => void, onGreenPress: () => void, onFatoPress: () => void, updateArticleFavorite: (id: string) => void }) => {

    const onPress = () => goToArticle(article)
    const isPrivate = !isSubscribed && article.isPublic != true

    return (
        <View marginV={10}>
            <View paddingH={15}>
                <CardRectLayout
                    source={{ uri: article.thumbnail?.urlLq }}
                    size='lg'
                    sharedId={`article.${article.id}.photo`}
                    id={article.id}
                    title={article.title}
                    category={article.category?.label + ' - ' + (article.region?.label || italy)}
                    subtitle={article.summary}
                    isGreen={article.isGreen}
                    isFato={article.isHandmade}
                    isPrivate={isPrivate}
                    hasVideo={article.hasVideo}
                    isFavorite={article.isFavorite}
                    favoriteCallback={updateArticleFavorite}
                    onGreenPress={onGreenPress}
                    onFatoPress={onFatoPress}
                    onPress={onPress}
                />
            </View>
            <Pubs index={index} category={category} />
        </View>
    )
} //, (prev, next) => JSON.stringify(prev.article) === JSON.stringify(next.article))

export default RenderArticle;