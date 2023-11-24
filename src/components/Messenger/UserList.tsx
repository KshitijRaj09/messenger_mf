import { Box, Typography } from '@mui/material';
import React from 'react';
import UserCard from './UserCard';

type UserListPropsType = {
   isError: boolean;
   isLoading: boolean;
   userList: any[]
}

const UserList = ({ isError, isLoading, userList }: UserListPropsType) => {

   return (
      <>
         {isError && <Typography color='red'>Something went wrong</Typography>}
         {(isLoading ? [...Array(5)] : userList).map((user, index) => {
            const secondUserInfo = {
               name: user?.name,
               avatar: user?.avatar,
               userId: user?._id,
               username: user?.username,
            };
            return (<Box sx={{ padding: 1, minWidth: 250, background: '#F9F6EE', borderRadius: 2 }}>
               <UserCard
                  key={user?._id || index}
                  isLoading={isLoading}
                  secondUserInfo={secondUserInfo}
                  from='UserList'
               />
            </Box>
            )
         })}
      </>
   );
}

export default UserList;