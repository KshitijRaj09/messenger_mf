import { NotificationType } from '@kshitijraj09/sharedlib_mf';
import { create } from 'zustand';
import { getNotificationsAPI } from '../apis/getNotifications';
import { deleteNotifiationApi } from '../apis/deleteNotificationApi';
import { updateNotificationHandler } from '../util';

interface NotificationState {
   notifications: NotificationType[]
   increaseNotifications: (notification: NotificationType) => void;
   decreaseNotifications: (notification: string) => void;
   fetchNotifications: () => Promise<any>;
}

const useNotificationStore = create<NotificationState>((set) => ({
   notifications: [],
   fetchNotifications: async () => {
      const response = await getNotificationsAPI();
      set(() => ({ notifications: [...response] }))
   },
   increaseNotifications: (newNotification: NotificationType) =>
      set((state) => ({
         notifications: [...state.notifications, newNotification],
      })),

   decreaseNotifications: (selectedUserId: string) => {
      setTimeout(async() => {
         set((state) => ({
            notifications: state.notifications.filter((notification) =>
               notification.senderId !== selectedUserId)
         }));
         await deleteNotifiationApi(selectedUserId);
         updateNotificationHandler();
      }, 1000)
      
   },
}));

export default useNotificationStore;