import React from 'react';
import { CheckBox, FlatList, ScrollView, Text, View } from 'widget/Native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import colors from 'themes/colors';
import BottomModal from 'widget/Modal/PositionnedModal';
import { ListRenderItem } from 'react-native';

export type ICountry = {
    code: string;
    name: string;
};

type IProps = {
    country: ICountry | undefined;
    countries: ICountry[];
    modal: boolean;
    title: string;
    setCountry: (country: ICountry) => void;
    setModal: (data: boolean) => void;
};

const BottomModalCountries = (props: IProps) => {
    const { bottom } = useSafeAreaInsets();

    const renderItem: ListRenderItem<any> = ({ item }) => {
        return (<CheckBox
            key={item.code}
            text={item.name}
            radio
            dark
            value={props.country ? item.code === props.country.code : false}
            onChecked={() => {
                props.setCountry(item);
                props.setModal(false);
            }}
        />)
    }

    return (
        <BottomModal modal={props?.modal} setModal={props?.setModal} background={colors.white}>
            <View flex padding={20} paddingT={0} marginB={bottom}>
                <Text bold size={20} marginB={20}>{props.title}</Text>
                <FlatList flex data={props.countries} keyExtractor={item => item.code} renderItem={renderItem} />
            </View>
        </BottomModal>
    );
};

export default BottomModalCountries;