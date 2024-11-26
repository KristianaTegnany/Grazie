import {IMessage} from 'react-native-gifted-chat';

type ChatStateType = {
  field_write_to_gigi_title: string;
  field_short_text: string;
  field_input_writing_placeholder: string;
  messages: IMessage[];
  newMessage: boolean;
};

export default ChatStateType;
