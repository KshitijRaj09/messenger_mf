import React from "react";
import { MessagesDataType } from "./MessagePanel";
type MessagePropsType = MessagesDataType & {
    lastMessageRef: React.MutableRefObject<any>;
};
declare const MemoizedMessage: React.MemoExoticComponent<({ content, receiverId, senderId, _id: messageId, lastMessageRef, createdAt }: MessagePropsType) => React.JSX.Element>;
export default MemoizedMessage;
