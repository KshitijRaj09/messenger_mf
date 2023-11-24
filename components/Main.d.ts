import React from 'react';
import { Socket } from "socket.io-client";
declare global {
    interface Window {
        socket: Socket;
    }
}
declare const Main: () => React.JSX.Element;
export default Main;
