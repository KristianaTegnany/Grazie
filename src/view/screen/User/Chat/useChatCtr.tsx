import { useCallback, useEffect, useState } from 'react';
import { IMessage } from 'react-native-gifted-chat';
import useAppNavigator from 'hooks/useAppNavigator';
import { sendMessage } from 'services/applicatif/chat/chatService';
import { useDispatch, useSelector } from 'react-redux';
import { rootState } from 'store/reducer';
import {
  addMessage,
  setMessages,
  setNewMessage,
} from 'store/slice/chat/chatSlice';
import Apollo from 'services/utils/apollo';
import { query_chat } from 'services/utils/apollo/query';
import { images } from 'assets/images';

export default function useChatCtr() {
  const [loading, setLoading] = useState<boolean>(true);
  const appNavigator = useAppNavigator();
  const dispatch = useDispatch();

  const {
    id: myId,
    firstName
  } = useSelector(
    (state: rootState) => state?.userReducer?.userInfo,
  );

  const welcomeMessage = useSelector(
    (state: rootState) => state?.appReducer?.burgerMenuDatas.translation.welcomeMessage,
  );

  const {
    messages,
    newMessage,
  } = useSelector(
    (state: rootState) => state?.chatReducer,
  );


  useEffect(() => {
    if (myId) {
      getMessage();
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (newMessage && myId) {
      dispatch(setNewMessage(false));
      getMessage();
    }
  }, [newMessage, myId]);

  const onSend = useCallback((msgs: IMessage[] = []) => {
    dispatch(addMessage(msgs[0]));
    //setMessages(previousMessages => GiftedChat.append(previousMessages, msgs));
    sendMessage(msgs)
  }, []);

  const getMessage = async () => {
    const res = await Apollo.query(query_chat)
    if (res.data?.messages?.items) {
      dispatch(setMessages(res.data.messages.items.map((item: any) => {
        return {
          _id: item.id,
          text: item.contentHtml,
          createdAt: parseInt(item.date.created) * 1000,
          user: {
            _id: item.owner.isCs ? '0' : myId,
            avatar: images.Logo,
            name: item.owner.label,
          },
          //files: e?.attributes?.files,
        };
      })
        .sort((a: any, b: any) => (a.createdAt > b.createdAt ? -1 : 1))))
    }
    setLoading(false);
  };

  const goBack = () => appNavigator.goBack();

  return {
    loading,
    messages,
    myId,
    welcomeMessage: welcomeMessage?.replace('@username', firstName),
    getMessage,
    goBack,
    onSend,
  };
}
