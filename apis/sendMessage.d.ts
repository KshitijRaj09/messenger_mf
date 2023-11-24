type MessageBodyType = {
    receiverId: string;
    content: string;
};
export declare const sendMessageAPI: (messageBody: MessageBodyType) => Promise<any>;
export {};
