import { Typography } from '@mui/material';
import React, { useContext } from 'react';
import { chatInfoContext } from '../../ContextAPI/ChatInfoProvider';
import MessagePanel from './MessagePanel';

const ChatMainPage = () => {
   const { chatInfo } = useContext(chatInfoContext);
   const { secondUserId } = chatInfo;

   return <>
      {!secondUserId ?
         <Typography sx={{ padding: 3 }} fontFamily='Mooli, sans-serif' component='h3'>Select a contact to start</Typography> :
         <MessagePanel />
      }
   </>
}

export default ChatMainPage;