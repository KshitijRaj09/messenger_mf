import { WindowEvents } from "@kshitijraj09/sharedlib_mf";
import WindowEventService from "Sharedlib/eventservice";
import { useEffect, useState } from "react";
import useNotificationStore from "../zustand-config/notificationStore";

const useNotificationProvider = <Type,>(eventName: WindowEvents) => {
   const { increaseNotifications, notifications, fetchNotifications } = useNotificationStore();
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      fetchNotifications();
      import("Sharedlib/eventservice").
         then((event) => {
            event.default.subscribe(eventName, updateHandler);
         }).catch(error => {
            console.error('Error occured in event', error);
         })
      return () => {
         WindowEventService.unsubscribe(eventName, updateHandler)
      }
   }, []);

   const updateHandler = (event: Event) => {
      const { detail } = event as CustomEvent;
      increaseNotifications(detail);
      setLoading(false);
   }

   return {loading, notifications}
}

export default useNotificationProvider;