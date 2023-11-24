import React from "react";
import { Box } from "@mui/system";
import SideDrawer from "./SideDrawer";
import ChatMainPage from "./ChatMainPage";
import ChatInfoProvider from "./ContextAPI/ChatInfoProvider";

const Messenger = () => {
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

export default Messenger;
