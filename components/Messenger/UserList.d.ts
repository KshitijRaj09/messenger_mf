import React from 'react';
type UserListPropsType = {
    isError: boolean;
    isLoading: boolean;
    userList: any[];
};
declare const UserList: ({ isError, isLoading, userList }: UserListPropsType) => React.JSX.Element;
export default UserList;
