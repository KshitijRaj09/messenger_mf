import React, { memo, useContext } from "react";
import { Avatar, Box, Paper, Typography } from "@mui/material";
import { MessagesDataType } from "./MessagePanel";
import TimeAgo from 'react-timeago';
import { chatInfoContext } from "./ContextAPI/ChatInfoProvider";

type MessagePropsType = MessagesDataType & {
   lastMessageRef: React.MutableRefObject<any>
}

const Message = ({ content, receiverId, senderId, _id: messageId, lastMessageRef, createdAt }: MessagePropsType) => {
   const { chatInfo: { currentUserId } } = useContext(chatInfoContext);
   const isReceiver = senderId !== currentUserId;
   console.log('isreceiver', senderId, currentUserId);
   return (
      <Box
         sx={{
            display: "flex",
            justifyContent: isReceiver ? "flex-start" : "flex-end",
            mb: 2,
         }}
         ref={lastMessageRef}
      >
         <Box
            sx={{
               display: "flex",
               flexDirection: isReceiver ? "row" : "row-reverse",
               alignItems: "center",
            }}
         >
            {/* <Avatar sx={{ bgcolor: isReceiver ? "primary.main" : "secondary.main" }}>
               {isReceiver ? "B" : "U"}
            </Avatar> */}
            <Paper
               variant="outlined"
               sx={{
                  p: 2,
                  ml: isReceiver ? 1 : 0,
                  mr: isReceiver ? 0 : 1,
                  backgroundColor: isReceiver ? "primary.light" : "secondary.light",
                  borderRadius: isReceiver ? "20px 20px 20px 5px" : "20px 20px 5px 20px",
               }}
            >
               <Typography variant="body1" color='#F8F8FF' fontFamily='Mooli, sans-serif'>{content}</Typography>
               <TimeAgo
                  date={createdAt}
                  style={{ color: '#F8F8FF', fontStyle: 'oblique' }}
               />
            </Paper>
         </Box>
      </Box>
   );
};

const MemoizedMessage = memo(Message);
export default MemoizedMessage;
