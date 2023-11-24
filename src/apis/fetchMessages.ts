import { messengerAPIRoute } from "./apiurlconstants";
import { axiosInstance } from "./axiosInstance";

export const fetchMessagesAPI = async (chatId: string) => {
   try {
      const { data: chatInfo } = await axiosInstance.get(`${messengerAPIRoute}/${chatId}`);
      return chatInfo;
   }
   catch (error) {
      console.log(error);
   }
}