import { chatAPIRoute } from "./apiurlconstants"
import { axiosInstance } from "./axiosInstance";

export const createChatAPI = async (userId: string) => {
   try {
      const { data: chatInfo } = await axiosInstance.post(`${chatAPIRoute}`, {
         receiverId: userId
      });
      return chatInfo;
   }
   catch (error) {
      console.log(error);
   }
}