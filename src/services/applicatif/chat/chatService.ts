import API from "services/utils/api";
import {url} from "services/utils/url";

export const sendMessage = (messages: {text: string}[]) => {
  return API.post(url.messages.new, {message: messages[0].text.trim()});
};
