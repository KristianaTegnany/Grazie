import React, { useEffect } from 'react';
import { TouchableOpacity, Text, View, AnimatedView, Image } from 'widget/Native';
import routeName from 'routes/routeName';
import { images } from 'assets/images';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { rootState } from 'store/reducer';
import Apollo from 'services/utils/apollo';

const BottomTabs = ({ state, navigation }: any) => {
    const { bottom } = useSafeAreaInsets();

    const {
        translation: {
            theMag,
            inspiration,
            myNotebooks,
            myMap,
            favorites
        }
    } = useSelector((state: rootState) => state.appReducer.bottomNavDatas);

    const {
        noOrderYet
    } = useSelector((state: rootState) => state.userReducer.serviceDatas.translation);

    const icons: any = {
        [routeName.tab.mag.base]: {
            icon: images.tab.bottom.Mag,
            label: theMag,
        },
        [routeName.tab.inspiration.base]: {
            icon: images.tab.bottom.Inspiration,
            label: inspiration,
        },
        [routeName.tab.address.base]: {
            icon: images.tab.bottom.Carnet,
            label: myNotebooks
        },
        [routeName.tab.favorite.base]: {
            icon: images.tab.bottom.Favorite,
            label: favorites,
        },
        [routeName.tab.map.home]: {
            icon: images.tab.bottom.Map,
            label: myMap,
        },
    };

    useEffect(() => {
        if (!noOrderYet) {
            Apollo.getAllPreloadDatas()
        }
    }, [noOrderYet])

    const renderRoute = (route: any, index: number) => {
        const isFocused = state.index === index;
        const onPress = () => {
            const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
            });
            if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
            }
        };

        return (
            <View key={index} center marginH={10}>
                <TouchableOpacity
                    onPress={onPress}
                    center iCenter
                >
                    <View>
                        {isFocused && <AnimatedView animation={'zoomIn'} absolute top={-5} left={-5} border={13} color='tertiary' size={25}/>}
                        <Image
                            source={icons[route?.name]?.icon}
                            resizeMode='contain'
                            width={25}
                            height={25}
                        />
                    </View>
                    <Text size={12} light marginT={5} bold={isFocused}>
                        {icons[route?.name]?.label}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View row around paddingH={10} bottom={0} paddingT={10} paddingB={bottom || 10} fullWidth color='white' borderT={10} shadow>
            {state.routes.map(renderRoute)}
        </View>
    );
};

export default BottomTabs;
