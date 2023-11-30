import { WindowEvents } from "@kshitijraj09/sharedlib_mf";
declare const useNotificationProvider: <Type>(eventName: WindowEvents) => {
    loading: boolean;
    notifications: import("@kshitijraj09/sharedlib_mf").NotificationType[];
};
export default useNotificationProvider;
