import AnySizeDragSortableView from "./DragSortable";
import { Image, Text, TouchableOpacity, View } from "widget/Native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import normalize from "services/utils/normalize";
import colors from "themes/colors";
import { useRef, useState } from "react";

export type IOrderItem = {
    id: string;
    label: string;
    isMoved: boolean;
    icon?: {
        urlLq: string;
        urlHq: string;
        label: string;
    }
};

export type IRenderItem = {
    index: number | null;
    isEdit?: boolean;
    item: IOrderItem;
    sortableViewRef: any;
};

const DragItem = ({ index, isEdit, item, sortableViewRef }: IRenderItem) => {
    const [isMoved, setIsMoved] = useState(false)

    const onPressIn = () => {
        sortableViewRef.current?.startTouch(item, index);
        setIsMoved(true)
    }

    const onPressOut = () => sortableViewRef.current?.onPressOut()

    return (
        <TouchableOpacity
            onPressIn={onPressIn}
            onPressOut={onPressOut} marginR={20} width={330}>
            <View flex row iCenter>
                <View size={35} center iCenter marginR={10} border={23} hexColor={isMoved ? '#fff' : '#1D242455'}>{isMoved || isEdit ? <Text bold color={isMoved ? "primary" : "white"}>{(index || 0) + 1}</Text> : <MaterialIcons name="more-horiz" color={colors.white} />}</View>
                <View flex row iCenter between padding={5} paddingR={10} border={50} hexColor={isMoved ? '#fff' : '#1D242455'}>
                    <View flex row iCenter>
                        <Image source={{ uri: item.icon?.urlLq }} borderC="primary" borderW={isMoved ? 1 : 0} width={35} height={35} border={20} />
                        <View paddingH={15}>
                            <Text size={15} medium color={isMoved ? 'primary' : 'white'}>
                                {item.label}
                            </Text>
                        </View>
                    </View>
                    <MaterialIcons
                        name={'drag-indicator'}
                        size={normalize(20)}
                        color={isMoved ? colors.primary : colors.white}
                    />
                </View>
            </View>
        </TouchableOpacity>
    )
}

const AnySizeDragSortable = ({ data, isEdit, onDataChange }: { data: IOrderItem[], isEdit?: boolean, onDataChange: (data: any[], callback: any) => void }) => {
    const sortableViewRef = useRef<any>();

    return (
        <AnySizeDragSortableView
            ref={sortableViewRef}
            dataSource={data}
            keyExtractor={item => item.id}
            renderItem={(
                item: IOrderItem,
                index: number | null
            ) => <DragItem index={index} isEdit={isEdit} item={item} sortableViewRef={sortableViewRef} />}
            onDataChange={onDataChange}
            onDragEnd={() => null}
            movedWrapStyle={{}}
        />
    )
}

export default AnySizeDragSortable