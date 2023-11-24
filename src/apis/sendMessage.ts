import { messengerAPIRoute } from "./apiurlconstants";
import { axiosInstance } from "./axiosInstance";

type MessageBodyType = {
   receiverId: string;
   content: string;
}

export const sendMessageAPI = async (messageBody: MessageBodyType) => {
   try {
      const { data: message } = await axiosInstance.post(messengerAPIRoute, messageBody);
      return message;
   }
   catch (error) {
      console.log(error);
   }
}