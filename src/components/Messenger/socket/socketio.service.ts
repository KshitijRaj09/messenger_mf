// import { Socket, io } from 'socket.io-client';

// interface ServerToClientEvents {
//    noArg: () => void;
//    basicEmit: (a: number, b: string, c: Buffer) => void;
//    withAck: (d: string, callback: (e: number) => void) => void;
// }

// interface ClientToServerEvents {
//    //hello: () => void;
// }

// let socket: Socket;

// export const initiateSocketConnection = () => {
//    socket = io(process.env.APIBASEURL);
//    console.log(`Connecting socket...`);
// }

// export const disconnectSocket = () => {
//    console.log('Disconnecting socket...');
//    if (socket) socket.disconnect();
// }