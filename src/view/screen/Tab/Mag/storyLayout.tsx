import React from 'react';
import useStoryCtr from './storyCtr';
import { Image, View } from 'widget/Native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { imagesStory } from './stories';

const StoryLayout = () => {
    const {
        index,
        currentIndex,
        stories
    } = useStoryCtr();

    const { top } = useSafeAreaInsets();

    return (
        <View flex color='white' paddingT={top} paddingH={10}>
            <View row iCenter>
                <Image source={imagesStory[index]} width={30} height={30} />
                <View row between flex>
                    {stories?.map((_: any, i: number) => (
                        <View
                            key={i}
                            flex
                            height={3}
                            border={1.5}
                            marginL={5}
                            color={currentIndex >= i ? 'onSecondary' : 'onSecondaryLight'}
                        />
                    ))}
                </View>
            </View>
        </View>
    );
};

export default StoryLayout;
