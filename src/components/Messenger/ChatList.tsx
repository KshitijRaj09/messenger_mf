import React, { useEffect, useState } from "react";
import { getUserChats } from "../../apis/getUserChats";
import UserCard from "./UserCard";
import { Box, Typography } from "@mui/material";

const ChatList = () => {
   const [chatList, setChatList] = useState([]);
   const [isLoading, setIsLoading] = useState<boolean>(true);
   const [isError, setIsError] = useState<boolean>(false);

   const getUserChatsHandler = async () => {
      const data = await getUserChats();
      if (data) {
         setChatList(data);
      }
      else {
         setIsError(true);
      }
      setIsLoading(false);
   };
   useEffect(() => {
      setIsLoading(true);
      getUserChatsHandler();
   }, []);

   return (
      <>
         {isError && <Typography color='red'>Something went wrong</Typography>}
         {(isLoading ? [...Array(5)] : chatList).map((chat, index) => {
            const secondUserInfo = {
               name: chat?.secondUser?.name,
               avatar: chat?.secondUser?.avatar,
               userId: chat?.secondUser?._id,
               username: chat?.secondUser?.username,
            };
            return (<Box sx={{ padding: 1, minWidth: 300, background: '#F9F6EE', borderRadius: 2 }}>
               <UserCard
                  key={chat?._id || index}
                  chatId={chat?._id}
                  isLoading={isLoading}
                  secondUserInfo={secondUserInfo}
                  chatName={chat?.chatName}
                  from='ChatList'
               />
            </Box>
            )
         })}
      </>
   );
};

// return (
//    <>{isLoading && !chatList.length ? <ChatListSkeleton /> : chatList.map(chat =>)}</>
// )

export default ChatList;
