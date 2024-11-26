import React from 'react';
import { View } from 'widget/Native';
//import ProfilWithTextHeader from 'view/widget/Header/ProfilWithTextHeader';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import GiftedChatWidget from './GiftedChat';
import TitleBackBtn from 'widget/Header/TitleBackBtn';
import { Platform, StatusBar } from 'react-native';
import { rootState } from 'store/reducer';
import { useSelector } from 'react-redux';
import KeyboardAvoidingView from 'widget/Form/KeyboardAvoidingView';
import { useKeyboard } from '@react-native-community/hooks';

const ChatScreen = () => {
    const { bottom } = useSafeAreaInsets();
    const {keyboardShown} = useKeyboard()
    const isAndroid = Platform.OS === 'android'

    const {
        translation: {
            chatGigi,
            placeholderMessage,
        }
    } = useSelector(
        (state: rootState) => state?.appReducer.burgerMenuDatas,
    );

    return (
        <>
            <StatusBar barStyle={'dark-content'} animated />
            <TitleBackBtn title={chatGigi} />
            <View flex paddingH={10} paddingB={bottom || (isAndroid && keyboardShown? 0 : 20)} color='white' overflow='hidden'>
                <KeyboardAvoidingView flex inputHeight={40}>
                    <GiftedChatWidget placeholder={placeholderMessage} />
                </KeyboardAvoidingView>
            </View>
        </>
    );
};

export default ChatScreen;
