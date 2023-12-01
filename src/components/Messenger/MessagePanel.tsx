import React, { useContext, useEffect, useRef, useState } from 'react';
import { fetchMessagesAPI } from '../../apis/fetchMessages';
import { useFetchData } from '../../CustomHooks/usefetchData';
import Message from './Message';
import { Box, Grid, InputLabel, TextField, Typography, styled, useMediaQuery, useTheme } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Send as SendIcon } from "@mui/icons-material";
import { sendMessageAPI } from '../../apis/sendMessage';
import { chatInfoContext } from '../../ContextAPI/ChatInfoProvider';
import { sendNotification } from '../../util';
import { pushNotificationApi } from '../../apis/pushNotificationApi';;
import useNotificationStore from '../../zustand-config/notificationStore';

const StyledLoadingButton = styled(LoadingButton)(() => ({
   backgroundColor: "#E5D1FA",
   color: "#7F669D",
   "&: hover": {
      backgroundColor: "#F7C8E0",
   },
}));

export type MessagesDataType = {
   senderId: string;
   receiverId: string;
   content: string;
   createdAt: string;
   _id: string;
}

const MessagePanel = () => {
   const socket = window.socket;
   const { chatInfo, setChatInfo } = useContext(chatInfoContext);
   const { chatId = '', currentUserId: senderId, secondUserId: receiverId, secondUserName } = chatInfo;
   const { data: messages, isLoading, isError, setData: setMessages } = useFetchData<MessagesDataType[]>(
      fetchMessagesAPI,
      chatId,
      []
   );
   
   const { decreaseNotifications } = useNotificationStore();
   const [isSecondUserTyping, setIsSecondUserTyping] = useState(false);
   const [isInProgress, setIsInprogress] = useState(false);
   const [input, setInput] = useState('');

   const messagesRef = useRef<MessagesDataType[]>();
   messagesRef.current = messages;
   const lastMessageRef = useRef(null);
   const timeoutid = useRef<ReturnType<typeof setTimeout>>();

   useEffect(() => {
      if (!chatId) {
         return;
      }
      socket.emit('one-one-chat', chatId);
      socket.on("message-from-server", (newMessageFromServer:MessagesDataType) => {
         sendNotification(newMessageFromServer.content, { username: secondUserName, avatar: '' });
         setMessages([...messagesRef.current, newMessageFromServer]);
      });
      socket.on("start-typing-from-server", () => {
         setIsSecondUserTyping(true);
      });
      socket.on("stop-typing-from-server", () => {
         setIsSecondUserTyping(false);
      });
      decreaseNotifications(receiverId);

      return () => {
         socket.off("message-from-server");
         socket.off('start-typing-from-server');
         socket.off('stop-typing-from-server');
      };
   }, [chatId]);

   useEffect(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
      if (document.visibilityState === 'visible') {
         decreaseNotifications(receiverId);
      }
   }, [messages]);

   useEffect(() => {
      window.addEventListener('visibilitychange', handleVisibilityChange);
      return () => {
        window.removeEventListener('visibilitychange', handleVisibilityChange);
      };
    }, [receiverId]);

   const handleVisibilityChange = () => {
         if (document.visibilityState === 'visible') {
            decreaseNotifications(receiverId);
         }
   }
   
   const onChangeHandler = (value: string) => {
      socket.emit("start-typing-from-client");
      setInput(value);
      timeoutid.current && clearTimeout(timeoutid.current);
      timeoutid.current = setTimeout(() => {
         socket.emit("stop-typing-from-client");
      }, 500);
   }

   const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setIsInprogress(true);
      const formData = new FormData(event.currentTarget);
      const content = formData.get("messageField") as string;
      const messageBody = { content, receiverId };
      const response = await sendMessageAPI(messageBody);
      if (response) {
         if (!chatId) {
            setChatInfo({...chatInfo, chatId: response.chatId});
         }
         const newMessage: MessagesDataType = {
            content,
            senderId,
            receiverId,
            createdAt: new Date().toJSON(),
            _id: new Date().toJSON()
         };
         const { _id, ...rest } = newMessage;
         const notificationResponse = await pushNotificationApi({
            ...rest, type: 'message',
            isRead: false
         })
         socket.emit('send-message', (newMessage));
         setIsInprogress(false);
         setMessages((messages) => ([...messages, newMessage]));
         setInput('');
      }
   }

   return (
      <Box sx={{
         height: "95vh",
         display: "flex",
         width: '90%',
         flexDirection: "column",
         bgcolor: "grey.200",
      }}
      >
         <Box sx={{ display: 'block', backgroundColor: 'darkseagreen', width: '100%', minHeight: '30px' }}>
            <Typography padding='5px' fontFamily='Mooli, sans-serif' textAlign='center'>
               {secondUserName}
            </Typography>
         </Box>
         <Box sx={{ flexGrow: 1, overflow: "auto", p: 2 }}>
            {
               messages && messages.map(message =>
                  <Message
                     key={message._id}
                     _id={message._id}
                     content={message.content}
                     receiverId={message.receiverId}
                     senderId={message.senderId}
                     createdAt={message.createdAt}
                     lastMessageRef={lastMessageRef}
                  />
               )
            }
         </Box>
         <Box sx={{ p: 2, backgroundColor: "background.default" }}>
            <Grid container spacing={2} sx={{ marginTop: '15px' }} component="form" noValidate onSubmit={onSubmitHandler} alignItems='center'>
               <Grid item mobile={10}>
                  <InputLabel htmlFor="messageField-textbox">
                     {isSecondUserTyping && <span>Typing...</span>}
                  </InputLabel>
                  <TextField
                     id="messageField-textbox"
                     size="medium"
                     fullWidth
                     placeholder="Type a message"
                     variant="outlined"
                     name='messageField'
                     value={input}
                     onChange={({ target: { value } }) => onChangeHandler(value)}
                  />
               </Grid>
               <Grid item mobile={2}>
                  <StyledLoadingButton
                     loading={isLoading}
                     loadingPosition='end'
                     endIcon={<SendIcon />}
                     variant='contained'
                     size='large'
                     type='submit'
                     name='sendButton'
                     disabled={isInProgress}
                  >
                     Send
                  </StyledLoadingButton>
               </Grid>
            </Grid>
         </Box>
      </Box>
   )
}

export default MessagePanel;