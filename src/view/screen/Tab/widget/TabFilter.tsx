import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { rootState } from "store/reducer";
import FullModal from "widget/Modal/FullModal"
import { Button, CheckBox, Image, ScrollView, Text, TouchableOpacity, View } from "widget/Native";
import Feather from "react-native-vector-icons/Feather";
import AntDesign from "react-native-vector-icons/AntDesign";
import colors from "themes/colors";
import { useEffect, useState } from "react";
import useStatusBar from "hooks/useStatusBar";
import PrivateLayer from "../../User/Membership/widget/PrivateLayer";

export type Item = { id: string; label: string, checked?: boolean, icon?: { urlLq: string } }

type IItem = {
    isSelected?: boolean;
    title: string;
    subtitle?: string;
    items: Item[],
    setItems: (items: Item[]) => void;
    updateIsSelected: () => void;
}

const ItemFilter = ({ isSelected, title, items, subtitle, setItems, updateIsSelected }: IItem) => {
    const [shown, setShown] = useState(true);
    const toggleShown = () => setShown(!shown);
    const toggleItem = (index: number) => {
        setItems(
            items.map((item, i) => {
                return { ...item, checked: i === index ? !item.checked : item.checked };
            }),
        );
    };

    const toggleAll = () => {
        const hasChecked = items.filter(item => item.checked).length > 0
        setItems(items.map(item => { return { ...item, checked: !hasChecked } }))
    }

    return (
        <View>
            <View row between iCenter>
                <View>
                    <TouchableOpacity noPadding onPress={toggleAll}><Text bold size={20} marginT={20} marginB={10}>{title}</Text></TouchableOpacity>
                    {!!subtitle && <Text size={12} color="onSecondaryLight" marginB={10} marginR={60}>{subtitle}</Text>}
                </View>
                {isSelected !== undefined ? <CheckBox
                    value={isSelected}
                    onChecked={updateIsSelected}
                    dark
                /> : <View marginR={5}>
                    <AntDesign
                        name={shown ? 'minus' : 'plus'}
                        size={20}
                        onPress={toggleShown}
                    />
                </View>}
            </View>
            {shown &&
                items.map((item, i) => (
                    <View key={i} row between iCenter>
                        <TouchableOpacity noPadding onPress={() => toggleItem(i)} row iCenter>
                            {item.icon && <Image source={{ uri: item.icon.urlLq }} resizeMode="contain" height={20} width={20} marginR={10} />}
                            <Text size={15} color="onSecondary">{item.label}</Text>
                        </TouchableOpacity>
                        <CheckBox
                            value={item.checked || false}
                            onChecked={() => toggleItem(i)}
                            dark
                        />
                    </View>
                ))}
        </View>
    )
}

export const Divider = ({ marginB, marginH, marginT, height }: { marginH?: number, marginB?: number, marginT?: number, height?: number }) => {
    return (
        <View height={height || 2} marginB={marginB} marginH={marginH} marginT={marginT !== undefined ? marginT : 10} color="onTertiary" />
    )
}

export type IGroupItem = {
    title: string;
    subtitle?: string;
    isSelected?: boolean;
    items: Item[]
}

type IProps = {
    dark?: boolean;
    isSubscribed?: boolean;
    isVisible: boolean;
    data: IGroupItem[];
    title?: string;
    updateData: (items: IGroupItem[]) => void;
    closeModal: () => void;
}

const TabFilter = ({ dark, isSubscribed, isVisible, data, title, closeModal, updateData }: IProps) => {
    const { changeStatusBar } = useStatusBar()
    const {
        translation: {
            filter,
            filterSaveButton,
        },
    } = useSelector((state: rootState) => state.inspirationReducer.inspirationDatas);

    const { bottom } = useSafeAreaInsets();

    const [groupedItems, setGroupedItems] = useState<IGroupItem[]>(data)
    const [loading, setLoading] = useState(false)

    const updateGroupedItems = (index: number, data: Item[]) => {
        setGroupedItems(groupedItems.map((group, i) => {
            return i === index ? { ...group, items: data } : group
        }))
    }

    const updateIsSelected = (index: number) => {
        setGroupedItems(groupedItems.map((group, i) => {
            return i === index ? { ...group, isSelected: !group.isSelected } : group
        }))
    }

    const onPress = () => {
        setLoading(true)
        setTimeout(() => {
            updateData(groupedItems)
            closeModal()
            setLoading(false)
        }, 500)
    }

    const beforeClosing = () => {
        //setGroupedItems(data)
        closeModal()
    }

    useEffect(() => {
        if (isVisible)
            changeStatusBar(dark? 'light-content' : 'dark-content');
        
    }, [isVisible])

    const renderGroup = (group: IGroupItem, i: number) => (<View key={i}>
        <ItemFilter title={group.title} subtitle={group.subtitle} isSelected={group.isSelected} items={group.items} updateIsSelected={() => updateIsSelected(i)} setItems={(data) => updateGroupedItems(i, data)} />
        {i < groupedItems.length - 1 && <Divider />}
    </View>)

    return (
        <FullModal modal={isVisible} notFullWidth={!!title}>
            <View iCenter row between={!title} marginH={20}>
                <TouchableOpacity onPress={beforeClosing} width={40}>
                    {!title ?
                        <Feather name={'arrow-left'} size={25} color={colors.black} /> : <AntDesign name={'left'} size={20} color={colors.black} />}
                </TouchableOpacity>
                <Text size={!title ? 22 : 16} rosha={!title} bold={!!title}>{title || filter}</Text>
                <View width={40} />
            </View>
            <Divider marginH={20} />
            <View flex>
                <ScrollView flex
                    fullWidth height={'100%'} paddingH={20} paddingB={20}>
                    {groupedItems.map(renderGroup)}
                </ScrollView>
                <Button loading={loading} marginB={bottom || 20} marginH={20} sm text={filterSaveButton} onPress={onPress} />
                {!isSubscribed && <PrivateLayer />}
            </View>
        </FullModal>
    )
}

export default TabFilter;