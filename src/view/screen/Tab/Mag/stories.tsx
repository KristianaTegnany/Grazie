//import { memo } from 'react';
import { AnimatedView, Image, Text, TouchableOpacity, View } from 'widget/Native';
import { images } from 'assets/images';
import routeName from 'routes/routeName';
import { useSelector } from 'react-redux';
import { rootState } from 'store/reducer';
import useAppNavigator from 'hooks/useAppNavigator';
import { ICategory } from 'store/slice/mag/type';

export const imagesStory = [
    images.tab.mag.stories.PepiteGigi,
    images.tab.mag.stories.AmisGigi,
    images.tab.mag.stories.Biblio,
    images.tab.mag.stories.CasaGigi,
];

const Stories = ({ isSubscribed, openPrivateModal }: { isSubscribed: boolean, openPrivateModal: () => void }) => {
    const navigator = useAppNavigator();

    const {
        categoriesDatas: {
            taxonomy: { stories },
        },
        magDatas: {
            config: {
                mag: {
                    storiesTitle,
                },
            },
        },
        storiesDatas: { isFirstBiblio, isFirstCasa, isFirstFriend, isFirstPepite },
    } = useSelector((state: rootState) => state.magReducer);

    const isFirstStory = [
        isFirstPepite,
        isFirstFriend,
        isFirstBiblio,
        isFirstCasa
    ]

    function goToStory(category: string, index: number, isFirst: boolean) {
        if (isSubscribed) {
            navigator.navigateScreen(routeName.tab.mag.story, {
                id: parseInt(category),
                index,
                isFirst,
                showTuto: isFirstBiblio && isFirstCasa && isFirstFriend && isFirstPepite,
                categories: stories,
                isFirstStory
            });
        } else {
            openPrivateModal()
        }
    };

    const renderStory = (story: ICategory, i: number) => (
        <TouchableOpacity
            key={i}
            onPress={() => goToStory(story.id, i, isFirstStory[i])}
            maxWidth={'25%'}>
            <AnimatedView animation={'zoomIn'} delay={100 * i} padding={4} iCenter>
                <Image source={imagesStory[i]} width={70} height={70} border={35} borderW={isFirstStory[i] ? 2 : 0} borderC='primary' />
                <Text size={12} center marginT={5} color='onPrimary'>{story.label}</Text>
            </AnimatedView>
        </TouchableOpacity>
    )

    return (
        <>
            <Text size={20} bold marginB={10} marginL={15}>{storiesTitle}</Text>
            <View row around marginB={10}>
                {stories.map(renderStory)}
            </View>
        </>
    )
}

export default Stories;
