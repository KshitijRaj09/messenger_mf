import { fetchChatInfo } from "./apiurlconstants";
import { axiosInstance } from "./axiosInstance";

export const getChatInfo = async (userId: string) => {
   try {
      const { data: chatInfo } = await axiosInstance.post(`${fetchChatInfo}`, {
         secondUserId: userId
      });
      if (!chatInfo) {
         return chatInfo;
      }
      const { _id: chatId, ...rest } = chatInfo;
      return { ...rest, chatId };
   }
   catch (error) {
      console.log(error);
   }
}