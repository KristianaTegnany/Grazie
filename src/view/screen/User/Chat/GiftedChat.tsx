import {
    Bubble,
    Composer,
    GiftedChat,
    InputToolbar,
} from 'react-native-gifted-chat';
import React, { useState } from 'react';
import { ActivityIndicator, Dimensions, RefreshControl, StyleSheet, TouchableOpacity, View } from 'react-native';
import colors from 'themes/colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Text } from 'widget/Native';
import RenderHTML from 'react-native-render-html';
import fonts from 'themes/fonts';
import useChatCtr from './useChatCtr';
import LinkCard from './CardLink';

const { width } = Dimensions.get('window');

type IProps = {
    placeholder: string;
};

const tagsStyles = {
    p: {
        fontFamily: fonts.roboto,
        color: colors.onPrimary,
    },
};

const baseStyle = { paddingHorizontal: 10 }

const GiftedChatWidget = ({ placeholder }: IProps) => {
    const {
        getMessage,
        onSend,
        messages,
        myId, loading,
        welcomeMessage
    } = useChatCtr();
    
    const [refreshing, setRefreshing] = useState(false)

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
        getMessage();
        setRefreshing(false);
    }, []);

    return loading ? (
        <View style={styles.loading}>
            <ActivityIndicator size="large" color={colors.primaryDark} />
        </View>
    ) : (
        <>
            {messages.length === 0 && <Text>{welcomeMessage}</Text>}
            <GiftedChat
                messages={messages}
                onSend={onSend}
                user={{
                    _id: myId as string
                }}
                renderBubble={(props) => {
                    const gigiLink = props.currentMessage?.text.includes('<a href="graziegigi') && props.currentMessage.text.replaceAll('\n', '').replace(/.*(<a href=\"graziegigi.*<\/a>).*/, "$1")

                    return (
                        <View>
                            <Bubble
                                {...props}
                                wrapperStyle={{
                                    right: {
                                        backgroundColor: colors.primaryDark
                                    }
                                }}
                            />
                            {
                                !!gigiLink &&
                                <LinkCard id={gigiLink.replace(/.*data-id="(.*?)".*/, "$1")} type={gigiLink.replace(/.*data-entity-type="(.*?)".*/, "$1")} description={gigiLink.replace(/.*>(.*)<\/a>/, "$1")} uri={gigiLink.replace(/.*entity-thumbnail="(.*?)".*/, "$1")} />
                            }
                        </View>
                    )
                }}
                renderMessageText={props => (
                    props.currentMessage?.user._id == myId ? <Text color={'white'} marginH={10} marginV={10} size={13}>{props.currentMessage?.text}</Text> : <RenderHTML
                        contentWidth={width}
                        source={{ html: props.currentMessage?.text?.replace(/graziegigi:\/\/node\/[0-9]*/, "") || '' }}
                        tagsStyles={tagsStyles}
                        baseStyle={baseStyle}
                    />
                )}
                scrollToBottom
                renderComposer={props => (
                    <Composer
                        {...props}
                        placeholder={placeholder}
                        textInputStyle={styles.composer}
                    />
                )}
                renderInputToolbar={props => (
                    <InputToolbar {...props} containerStyle={styles.inputContainer} />
                )}
                renderSend={props => (
                    <View style={styles.bottomInputIcon}>
                        <TouchableOpacity
                            style={styles.iconSendBg}
                            onPress={() =>
                                props.onSend && props.onSend({ text: props.text }, true)
                            }>
                            <FontAwesome name="send" size={20} color="white" />
                        </TouchableOpacity>
                    </View>
                )}
                listViewProps={{
                    showsVerticalScrollIndicator: false,
                    refreshControl: <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }}
            />
        </>
    );
};

export default GiftedChatWidget;
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    loading: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomInputIcon: {
        alignSelf: 'center',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    attachContainer: {
        backgroundColor: colors.quartenary,
        height: 40,
        justifyContent: 'center',
        paddingHorizontal: 10,

        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
    },
    composer: {
        color: colors.onSecondary,
        backgroundColor: colors.quartenary,
        paddingLeft: 12,
        paddingTop: 12,
        borderRadius: 10,
        minHeight: 40
    },
    goBack: {
        position: 'absolute',
        top: 15,
        left: 15,
        zIndex: 9999,
    },
    iconSendBg: {
        backgroundColor: colors.primary,
        width: 40,
        height: 40,
        borderRadius: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
    },
    bottomInput: {
        display: 'flex',
        flexDirection: 'row',
        paddingRight: 10,
    },
    inputContainer: { backgroundColor: 'transparent', borderTopWidth: 0 },
});
