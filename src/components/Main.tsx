import React, { useEffect } from 'react';
import { ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import Messenger from './Messenger/Messenger';
import { Socket } from "socket.io-client";
import Loader from './Loaders';

declare global {
   interface Window {
      socket: Socket;
   }
}

const Main = () => {
   const [theme, setTheme] = useState(null);

   useEffect(() => {
      import('Sharedlib/theme').then((sharedTheme) => {
         setTheme(sharedTheme.default);
      }).catch((error) => {
         console.log('Error loading shared theme', error);
      })
   }, []);
   
   if (!theme) {
      return (
        <Loader />
      );
    }

   return (
      <ThemeProvider theme={theme}>
         <Messenger />
      </ThemeProvider>
      )
}

export default Main;