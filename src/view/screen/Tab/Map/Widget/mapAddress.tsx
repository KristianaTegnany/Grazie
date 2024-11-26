import React, { useEffect, useState } from 'react';
import { ActivityIndicator, AnimatedView, TouchableOpacity } from 'widget/Native';
import CardRectLayout from 'screen/Tab/widget/CardRectLayout';
import Apollo from 'services/utils/apollo';

type IProps = {
    id: string;
    callback: () => void;
    onPress: (data: any) => void;
};

const MapAddress = (props: IProps) => {
    const { id, callback, onPress } = props;

    const [address, setAddress] = useState<any>()

    const refresh = () => {
        Apollo.getMapAddress(id).then(res => {
            if (res.address) {
                setAddress(res.address)
            }
        })
    }

    const favoriteCallback = () => {
        callback()
        refresh()
    }

    useEffect(() => {
        setAddress(null)
        refresh()
    }, [id])

    return !address ? <ActivityIndicator /> : (
        <AnimatedView animation={'fadeIn'} paddingH={10}>
            <TouchableOpacity noPadding nestedTouch onPress={() => onPress(address)}>
                <CardRectLayout
                    size='sm'
                    sharedId={`address.${address.id}.photo`}
                    source={{ uri: address.thumbnail?.urlLq }}
                    poster
                    id={address.id}
                    title={address.title}
                    subtitle={address.summary}
                    category={address.category?.label}
                    isFavorite={address.isFavorite}
                    favoriteCallback={favoriteCallback}
                />
            </TouchableOpacity>
        </AnimatedView>
    );
};

export default MapAddress;
