import React from 'react';
export type chatInfoStateType = {
    chatId: string | null;
    currentUserId: string;
    secondUserId: string | null;
    secondUserName: string | null;
};
type chatInfoContextType = {
    setChatInfo: React.Dispatch<React.SetStateAction<chatInfoStateType>>;
    chatInfo: chatInfoStateType;
};
type Props = {
    children: React.ReactNode;
};
export declare const chatInfoContext: React.Context<chatInfoContextType>;
declare const ChatInfoProvider: React.FC<Props>;
export default ChatInfoProvider;
