import { Box, Card, CardHeader, Skeleton } from '@mui/material';
import React from 'react';

const ChatListSkeleton = () => {
   return (
      <Box sx={{ minWidth: '250px', padding: '3px' }}>
         <Card>
            <CardHeader
               avatar={
                  <Skeleton animation="wave" variant="circular" width={40} height={40} />
               }
               title={
                  <Skeleton animation="wave" height={10} width="80%" style={{ marginBottom: 6 }} />
               }
               subheader={
                  <Skeleton animation="wave" height={10} width="40%" />
               }
            />
         </Card>
      </Box>
   )
}

export default ChatListSkeleton;