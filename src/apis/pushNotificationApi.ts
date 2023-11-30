import { NotificationType } from "@kshitijraj09/sharedlib_mf";
import { notificationApiRoute } from "./apiurlconstants";
import { axiosInstance } from "./axiosInstance";

export const pushNotifiationApi = async (body: NotificationType) => {
   try {
      const { data: notification } = await axiosInstance.post(notificationApiRoute,
         { ...body });
      return notification;
   }
   catch (error) {
      console.log(error);
   }
}