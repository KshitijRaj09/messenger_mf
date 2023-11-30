import { notificationApiRoute } from "./apiurlconstants";
import { axiosInstance } from "./axiosInstance";

export const deleteNotifiationApi = async (secondUserId:string) => {
   try {
      const response = await axiosInstance.delete(`${notificationApiRoute}/${secondUserId}`)
      return response;
   }
   catch (error) {
      console.log(error);
   }
}