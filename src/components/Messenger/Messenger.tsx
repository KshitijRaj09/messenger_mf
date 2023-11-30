import React, { memo } from "react";
import { Box } from "@mui/system";
import SideDrawer from "./SideDrawer";
import ChatMainPage from "./ChatMainPage";
import ChatInfoProvider from "../../ContextAPI/ChatInfoProvider";
import useNotificationProvider from "../../CustomHooks/useNotificationProvider";
import { NotificationType, WindowEvents } from "@kshitijraj09/sharedlib_mf";

const Messenger = () => {
   const messageNotification:WindowEvents = 'messageNotification';
   useNotificationProvider<NotificationType>(messageNotification);
   
   return (
      <ChatInfoProvider>
         <Box component='div' id='messenger'>
            <SideDrawer>
               <ChatMainPage />
            </SideDrawer>
         </Box>
      </ChatInfoProvider>
   );
};

const memoizedMessenger = memo(Messenger);
export default memoizedMessenger;
