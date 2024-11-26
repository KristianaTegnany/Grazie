import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {chatInitialState} from './initialState';
import ChatStateType from './type';
import {IMessage} from 'react-native-gifted-chat';

export const chatSlice = createSlice({
  name: 'chat',
  initialState: chatInitialState,
  reducers: {
    setChatData: (state, action: PayloadAction<ChatStateType>) => {
      state.field_input_writing_placeholder =
        action.payload.field_input_writing_placeholder;
      state.field_short_text = action.payload.field_short_text;
      state.field_write_to_gigi_title =
        action.payload.field_write_to_gigi_title;
    },
    addMessage: (state, action: PayloadAction<IMessage>) => {
      state.messages.unshift(action.payload);
    },
    setMessages: (state, action: PayloadAction<IMessage[]>) => {
      state.messages = action.payload;
    },
    setNewMessage: (state, action: PayloadAction<boolean>) => {
      state.newMessage = action.payload;
    },
  },
});

export const {setChatData, addMessage, setMessages, setNewMessage} =
  chatSlice.actions;

export default chatSlice.reducer;
