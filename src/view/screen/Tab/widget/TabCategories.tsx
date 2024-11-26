import { FlatList, Image, Text, TouchableOpacity, View } from 'widget/Native';
import { ICategory } from 'store/slice/mag/type';
import { useSelector } from 'react-redux';
import { rootState } from 'store/reducer';
//import { memo } from 'react';
import { useEffect, useRef } from 'react';
import { FlatList as RNFlatList } from 'react-native';
import TouchableView from 'widget/Native/TouchableView';


type ItemProps = {
    text: string;
    active?: boolean;
    activeC?: 'primary' | 'tertiary';
    big?: boolean;
    uri?: string;
    onPress?: () => void;
}

export const TabItem = ({ active, activeC, big, text, uri, onPress }: ItemProps) => {
    return (
        <TouchableView
            onPress={onPress}
            marginR={uri ? 0 : 25} center iCenter padding={big? 10 : 5}>
            {!!uri && <Image poster source={{ uri }} width={big ? 101 : 65} height={big ? 101 : 65} border={big ? 51 : 33} borderC='primary' borderW={active ? 2 : 0} />}
            <View marginT={uri ? 5 : 0} marginB={uri ? 10 : undefined} maxWidth={uri && !big? 65 : undefined} height={big? 34 : undefined} center>
                <Text center size={big ? 14 : (uri ? 10 : 17)} lineHeight={uri? (big? 16.41 : 11.72) : undefined} bold={active || big} color={big? 'textField' : (uri? 'black' : undefined)}>
                    {text}
                </Text>
            </View>
            {!uri && <View
                fullWidth
                border={active ? 2 : 0}
                borderC={active ? activeC : undefined}
                borderW={active ? 2 : undefined}
            />}
        </TouchableView>
    )
}

const TabCategories = ({ allUri, autoScroll, category, divider, marginB, title, type, hasImage, setCategory }: { allUri?: string, autoScroll?: boolean, category: number, divider?: boolean, marginB?: number, title?: string, type: 'mag' | 'address', hasImage?: boolean, setCategory: (categ: number) => void; }) => {

    const { categoriesDatas: { taxonomy: { articles } }, magDatas: { translation: { filterAll } } } = useSelector((state: rootState) => state.magReducer);
    const {
        adresscategories
    } = useSelector((state: rootState) => state.addressReducer.addressDatas.taxonomy);

    const RenderItem = ({ item }: { item: ICategory; }) => {
        return (
            <TabItem active={category === parseInt(item.id)} activeC={divider ? 'primary' : 'tertiary'} text={item.label} uri={hasImage ? item.media?.urlLq : undefined} onPress={() => setCategory(parseInt(item.id))} />
        )
    }
    const ref = useRef<RNFlatList>(null)

    const data = [{ id: '0', label: filterAll, machineName: 'filter_all', media: { urlLq: allUri } }, ...(type === 'mag' ? articles : adresscategories)]

    useEffect(() => {
        if (autoScroll)
            ref.current?.scrollToIndex({ index: data.findIndex(item => parseInt(item.id) === category), animated: true })
    }, [autoScroll, category])

    return (
        <View marginB={marginB} paddingH={15} paddingT={divider ? 20 : 0} borderC='onTertiary' borderTW={divider ? 5 : 0}>
            {!!title && <Text size={20} bold marginB={10}
            >{title}</Text>}
            <FlatList
                forwardRef={ref}
                bounces={false}
                horizontal
                showsHorizontalScrollIndicator={false}
                data={data}
                renderItem={RenderItem}
                onScrollToIndexFailed={info => {
                    const wait = new Promise(resolve => setTimeout(resolve, 500));
                    wait.then(() => {
                        ref.current?.scrollToIndex({ index: info.index, animated: true });
                    })
                }}
            />
        </View>
    )
};

export default TabCategories;
