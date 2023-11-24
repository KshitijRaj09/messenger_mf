import React from 'react';
export type MessagesDataType = {
    senderId: string;
    receiverId: string;
    content: string;
    createdAt: string;
    _id: string;
};
declare const MessagePanel: () => React.JSX.Element;
export default MessagePanel;
