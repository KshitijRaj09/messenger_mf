import { getUserAllChats } from "./apiurlconstants";
import { axiosInstance } from "./axiosInstance";

export const getUserChats = async () => {
   try {
      const { data: userChatList } = await axiosInstance.get(getUserAllChats);
      return userChatList;
   }
   catch (error) {
      console.log(error);
   }
}