import { KeyboardType, ListRenderItem, NativeSyntheticEvent, StyleSheet, TextInput, TextInputFocusEventData } from "react-native";
import Feather from 'react-native-vector-icons/Feather';
import View from "./View";
import TouchableOpacity from "./TouchableOpacity";
import colors from "themes/colors";
import normalize from "services/utils/normalize";
import { useState } from "react";
import fonts from "themes/fonts";
import defaultStyle from "themes/defaultStyle";
import Text from "./Text";
import FullModal from "widget/Modal/FullModal";
import Image from "./Image";
import CheckBox from "./Checkbox";
import TitleBackBtn from "widget/Header/TitleBackBtn";
import { useSelector } from "react-redux";
import { rootState } from "store/reducer";
import FlatList from "./FlatList";

type ILeadingProps = {
    name: string;
    onPress?: () => void;
}

const Leading = (props: ILeadingProps) => {
    const { name, onPress } = props;
    return onPress ? (
        <TouchableOpacity onPress={onPress}>
            <Feather
                name={name}
                color={colors.onPrimary}
                size={normalize(20)}
            />
        </TouchableOpacity>
    ) : <Feather
        name={name}
        color={colors.onPrimary}
        size={normalize(20)}
    />
}


export type IInputProps = {
    placeholder?: string;
    iconName?: string;
    secure?: boolean;
    name?: string;
    autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters' | undefined;
    autoFocus?: boolean;
    keyboard?: KeyboardType;
    shadow?: boolean;
    activity?: boolean;
    calendar?: boolean;
    phone?: boolean;
    search?: boolean,
    semiTransparent?: boolean;

    hasError?: boolean;
    readOnly?: boolean;

    codeValue?: string;
    value?: string;
    zip?: boolean;
    onChange?: (text: string) => void;
    onChangeCode?: (text: string) => void;
    onBlur?: () => void;
    onFocus?: (event: NativeSyntheticEvent<TextInputFocusEventData>) => void;
};

const RenderPhoneCode = ({ value, onChange }: { value?: string, onChange?: (text: string) => void }) => {
    const phoneCodes = useSelector((state: rootState) => state.userReducer.serviceDatas.phoneNumbers?.items)

    const {
        selectRegionCode
    } = useSelector((state: rootState) => state.userReducer.serviceDatas.translation)

    const [code, setCode] = useState(value || '+33')
    const [modalCode, setModalCode] = useState(false)
    const closeCode = () => {
        if (code && code !== value && onChange) {
            onChange(code)
        }
        setModalCode(false)
    }
    const openCode = () => setModalCode(true)

    const renderItem: ListRenderItem<any> = ({ item }) => {
        return <View marginL={20} marginR={10} row between iCenter borderTW={1} paddingT={5} marginT={10} borderC="quartenary">
            <View row iCenter>
                <Image source={{ uri: item.flagUrl }} width={20} height={20} marginR={10} />
                <Text bold size={12} marginR={10}>{item.countryCode}</Text>
                <Text size={12} color="onSecondaryLight">{item.phoneCode}</Text>
            </View>
            <CheckBox radio dark value={item.phoneCode === code} onChecked={() => {
                if (item.phoneCode !== code)
                    setCode(item.phoneCode)
            }} />
        </View>
    }

    return (
        <>
            <TouchableOpacity onPress={openCode} color="quartenary" height={"100%"} marginR={5} center iCenter border={10}><Text marginH={5}>({phoneCodes.filter(item => item.phoneCode === code)[0].countryCode}) {code}</Text></TouchableOpacity>
            <FullModal modal={modalCode}>
                <TitleBackBtn title={selectRegionCode} noPaddingT onPress={closeCode} />
                <FlatList ListHeaderComponent={<View marginB={20}>
                    <FlatList keyExtractor={item => item.phoneCode} data={phoneCodes.filter(pc => ['+33', '+39', '+32', '+41', '+377', '+352'].includes(pc.phoneCode))} renderItem={renderItem} />
                </View>} keyExtractor={item => item.phoneCode} data={phoneCodes} renderItem={renderItem} />
            </FullModal>
        </>
    )
}

const Input = (props: IInputProps) => {
    const { autoFocus, name, activity, calendar, phone, search, semiTransparent, placeholder, readOnly, shadow, secure, hasError, value, codeValue, zip, onChange, onChangeCode, onBlur, onFocus } = props;

    const [secureTextEntry, setSecureTextEntry] = useState<boolean>(
        secure || false)

    const backgroundColor = search ? colors.onTertiary : `rgba(250, 250, 250, ${semiTransparent ? 0.7 : 1
        })`;

    const onChangeText = (text: string) => onChange && onChange(text.trimStart().replace(/\s+/g, ' '));

    return (
        <View fullWidth iCenter>
            <View row height={search ? 45 : 55}>
                {
                    phone &&
                    <RenderPhoneCode value={codeValue} onChange={onChangeCode} />
                }
                <TextInput
                    secureTextEntry={secureTextEntry}
                    value={value}
                    onChangeText={onChangeText}
                    onBlur={onBlur}
                    onFocus={onFocus}
                    placeholder={placeholder}
                    style={[
                        inputStyles.input,
                        shadow && defaultStyle.shadowSs,
                        {
                            backgroundColor,
                            borderColor: colors.error,
                            borderRadius: normalize((search || phone) ? 10 : 16),
                            borderWidth: hasError ? 0.5 : 0,
                            height: normalize(search ? 45 : 55, true),
                            paddingLeft: normalize(search ? 40 : 20),
                            paddingRight: normalize(10)
                        },
                        phone ? { flex: 1 } : { width: '100%' },
                    ]}
                    maxLength={zip ? 9 : (phone ? (value && value[0] === '0' ? 10 : 9) : undefined)}
                    autoFocus={autoFocus}
                    editable={!readOnly}
                    placeholderTextColor={colors.onPrimary}
                    keyboardType={props?.keyboard || 'default'}
                    autoCapitalize={props.autoCapitalize}
                />
            </View>
            {
                search &&
                <View absolute={2} left={10} height='100%' center>
                    <Leading name='search' />
                </View>
            }

            <View absolute={2} right={15} padding={5} height='100%' center>
                {name && ['email', 'confirm_email'].includes(name) && value &&
                    <Leading onPress={() => onChange && onChange('')} name="x-circle" />
                }
                {secure &&
                    <Leading onPress={() => setSecureTextEntry(c => !c)} name={secureTextEntry ? 'eye' : 'eye-off'} />
                }
                {calendar &&
                    <Leading name='calendar' />}
                {activity &&
                    <Leading name='chevron-down' />}
            </View>
        </View>
    )
}

export default Input;

export const inputStyles = StyleSheet.create({
    input: {
        backgroundColor: colors.quartenary,
        paddingVertical: 0,
        zIndex: 1,
        color: colors.onSecondaryExtraDark,
        fontFamily: fonts.roboto,
        fontSize: normalize(17)
    },
});