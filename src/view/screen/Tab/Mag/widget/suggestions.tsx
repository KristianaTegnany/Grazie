import { /*memo,*/ useCallback, useEffect, useState } from "react"
import Toast from "react-native-toast-message"
import { useSelector } from "react-redux"
import CardLayout from "screen/Tab/widget/CardLayout"
import { Divider } from "screen/Tab/widget/TabFilter"
import Apollo from "services/utils/apollo"
import { query_articles_suggestions } from "services/utils/apollo/query"
import { rootState } from "store/reducer"
import { ActivityIndicator, ScrollView, Text, View } from "widget/Native"

const Suggestions = ({ articleId, category, isSubscribed, goToArticle }: { articleId: string, category: string, isSubscribed: boolean, goToArticle: (article: any) => void }) => {
    const [loading, setLoading] = useState(true)
    const [suggestions, setSuggestions] = useState<any[]>([])

    const {
        italy,
        discoverOtherGigiSecrets
    } = useSelector((state: rootState) => state.magReducer.magDatas.translation);

    const getSuggestions = useCallback(async () => {
        setLoading(true)
        const response = await Apollo.query(query_articles_suggestions, {
            id: [parseInt(articleId)],
            category: parseInt(category),
        });
        if (response?.error) {
            Toast.show({ text2: response.error.message, type: "error" });
        } else if (response?.data?.articles?.items) {
            setSuggestions(response.data.articles.items);
        }
        setLoading(false)
    }, [articleId]);

    const renderSuggestion = (item: any, i: number) => {
        const isPrivate = !isSubscribed && item.isPublic != true

        return (
            <CardLayout
                key={i}
                type='rect'
                size='ml'
                poster
                marginR={10}
                source={{ uri: item.thumbnail?.urlLq }}
                id={item.id}
                isPrivate={isPrivate}
                title={item.title}
                subtitle={item.summary}
                category={item.category?.label + ' - ' + (item.region?.label || italy)}
                onPress={() => goToArticle(item)}
            />)
    }

    useEffect(() => {
        getSuggestions()
    }, [getSuggestions])

    return loading ? <ActivityIndicator padding={20} /> : (suggestions.length > 0 ?
        <View marginB={38}>
            <Divider marginH={15} marginT={0} marginB={38} />
            <Text marginH={10} rosha size={22}>{discoverOtherGigiSecrets}</Text>
            <ScrollView horizontal row paddingT={38} paddingL={15} paddingR={5}>
                {suggestions.map(renderSuggestion)}
            </ScrollView>
        </View> : null)
} //, (prev, next) => JSON.stringify(prev.articleId) === JSON.stringify(next.articleId))

export default Suggestions;