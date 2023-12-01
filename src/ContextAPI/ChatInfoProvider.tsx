import React, { createContext, useState } from 'react';
import { getUserInfoFromStorage } from '../util';


export type chatInfoStateType = {
   chatId: string | null;
   currentUserId: string;
   secondUserId: string | null;
   secondUserName: string | null;
}

type chatInfoContextType = {
   setChatInfo: React.Dispatch<React.SetStateAction<chatInfoStateType>>;
   chatInfo: chatInfoStateType;
}

type Props = {
   children: React.ReactNode;
}

export const chatInfoContext = createContext<chatInfoContextType>(null);
const ChatInfoProvider: React.FC<Props> = ({ children }) => {
   const { userid: currentUserId } = JSON.parse(getUserInfoFromStorage());
   const [chatInfo, setChatInfo] = useState<chatInfoStateType>({
      chatId: null,
      secondUserId: null,
      secondUserName: null,
      currentUserId
   });
   return (
      <chatInfoContext.Provider value={{ chatInfo, setChatInfo }}>
         {children}
      </chatInfoContext.Provider>
   )
}

export default ChatInfoProvider;