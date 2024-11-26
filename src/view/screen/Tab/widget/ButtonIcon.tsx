import React from 'react';
import { Image } from 'widget/Native';
import { images } from 'assets/images';
import ActivityIndicator from 'widget/Native/ActivityIndicator';
import TouchableView from 'widget/Native/TouchableView';

type IProps = {
    size?: 'xs' | 'md' | 'lg';
    type: 'edit' | 'delete' | 'favorite' | 'calendar' | 'add' | 'dot' | 'green' | 'fato' | 'video';
    isFavorite?: boolean;
    color?: 'primaryDark' | 'white';
    loading?: boolean;
    marginL?: number;
    onPress?: () => void;
};

const ButtonIcon = (props: IProps) => {
    const { color, isFavorite, loading, marginL, size, type, onPress } = props;

    let source = images.tab.icons.Delete;

    switch (type) {
        case 'edit':
            source = images.tab.icons.Edit;
            break;
        case 'favorite':
            source = isFavorite ? images.tab.icons.Isfavorite : images.tab.icons.Favorite;
            break;
        case 'calendar':
            source = images.tab.icons.Calendar;
            break;
        case 'add':
            source = images.tab.icons.Add;
            break;
        case 'dot':
            source = images.tab.icons.Dot;
            break;
        case 'green':
            source = images.tab.icons.Green;
            break;
        case 'fato':
            source = images.tab.icons.Fato;
            break;
        case 'video':
            source = images.tab.mag.Video;
    }

    let dimension = 43,
        padding = 10

    switch (size) {
        case 'xs':
            dimension = 28
            padding = 7.5
            break
        case 'md':
            dimension = 64
            padding = 20
            break
        case 'lg':
            dimension = 73
            padding = 20
    }

    return (
        <TouchableView onPress={onPress}
            padding={padding}
            width={dimension}
            marginL={marginL}
            height={dimension} border={dimension / 2} color={color || 'secondary'} marginR={['fato', 'green'].includes(type) ? 10 : 0}>
            {
                !loading && <Image
                    source={source}
                    resizeMode='contain'
                    flex
                />
            }
            {loading && <ActivityIndicator />}
        </TouchableView >
    );
};

export default ButtonIcon;
