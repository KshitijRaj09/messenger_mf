import {
   Avatar,
   Badge,
   Box,
   Card,
   CardHeader,
   Skeleton,
   Typography,
} from "@mui/material";
import React, { useContext, useEffect, useMemo } from "react";
import { getChatInfo } from "../../apis/getChatInfo";
import { chatInfoContext } from "../../ContextAPI/ChatInfoProvider";
import useNotificationStore from "../../zustand-config/notificationStore";

const styles = () => ({
   styleCard: {
      "&:hover": {
         backgroundColor: '#EDEADE',
         cursor: 'pointer'
      }
   },
   followButton: {
      backgroundColor: "#F38181",
      "&:hover": {
         backgroundColor: "#C06C84",
      },
   },
});

type userInfoType = {
   name: string;
   userId: string;
   avatar: string;
   username: string;
}

type UserCardPropsType = {
   isLoading: boolean;
   chatId?: string; //chatId or userId
   chatName?: string; //chat or user name
   secondUserInfo: userInfoType;
   from: 'UserList' | 'ChatList';
};

//Note: This component display user as well as chat

const UserCard = ({ secondUserInfo, isLoading, chatId = '', chatName = '', from }: UserCardPropsType) => {
   const classes = styles();
   const { setChatInfo } = useContext(chatInfoContext);
   const { notifications } = useNotificationStore();
   let memoizedNotificationCount = useMemo(() => notifications.filter(notification =>
      notification.senderId === secondUserInfo.userId),
      [notifications]
   )

   const chatInfoAPIHandler = async () => {
      if (isLoading) {
         return;
      }
      const chatDetails = await getChatInfo(secondUserInfo.userId);
      setChatInfoHandler(chatDetails?.chatId);
   }

   const setChatInfoHandler = (chatId: string) => {
      setChatInfo((prev) =>
      ({
         ...prev,
         chatId: chatId,
         secondUserId: secondUserInfo.userId,
         secondUserName: secondUserInfo.name
      }));
   }

   return (
      <Card sx={classes.styleCard} onClick={() => from === 'UserList' ? chatInfoAPIHandler() : setChatInfoHandler(chatId)}>
         <CardHeader
            avatar={
               isLoading ? (
                  <Skeleton animation="wave" variant="circular" width={40} height={40} />
               ) : (
                  <Avatar
                     alt="Ted talk"
                     src="https://pbs.twimg.com/profile_images/877631054525472768/Xp5FAPD5_reasonably_small.jpg"
                  />
               )
            }
            title={
               isLoading ? (
                  <Skeleton
                     animation="wave"
                     height={10}
                     width="80%"
                     style={{ marginBottom: 6 }}
                  />
               ) : (
                  <Box component='div' sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                     <Typography fontFamily='Mooli, sans-serif'>{secondUserInfo.name}</Typography>
                     <Badge badgeContent={memoizedNotificationCount.length} invisible={false} color="primary" />
                  </Box>
               )
            }
            subheader={
               isLoading ? (
                  <Skeleton animation="wave" height={10} width="40%" />
               ) : (
                  'Latest message here'
               )
            }
         />
      </Card>
   )
};

export default UserCard;
