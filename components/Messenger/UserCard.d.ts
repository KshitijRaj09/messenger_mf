import React from "react";
type userInfoType = {
    name: string;
    userId: string;
    avatar: string;
    username: string;
};
type UserCardPropsType = {
    isLoading: boolean;
    chatId?: string;
    chatName?: string;
    secondUserInfo: userInfoType;
    from: 'UserList' | 'ChatList';
};
declare const UserCard: ({ secondUserInfo, isLoading, chatId, chatName, from }: UserCardPropsType) => React.JSX.Element;
export default UserCard;
