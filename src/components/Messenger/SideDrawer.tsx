import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { Box, Divider, Drawer, IconButton, Typography, useMediaQuery, useTheme } from "@mui/material";
import {
  ChevronLeft as ChevronLeftIcon,
  TextsmsOutlined as TextsmsOutlinedIcon
} from "@mui/icons-material";
import ChatList from "./ChatList";
import SearchUser from "./SearchUser";
import { getUserBySearch } from "../../apis/getUserBySearch";
import UserList from "./UserList";

type SideDrawerPropsType = {
  children: JSX.Element;
}

const drawerWidth = 300;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(1),
  // necessary for content to be below app bar
  justifyContent: "flex-start",
}));

const SideDrawer = ({ children }: SideDrawerPropsType) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>('');
  const [userList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const theme = useTheme();
  const isMobileScreen = useMediaQuery(theme.breakpoints.down('tablet'));

  useEffect(() => {
    const timerId = setTimeout(() => {
      getuserBySearchHandler();
    }, 1000)

    return () => clearTimeout(timerId)

  }, [searchText])

  const getuserBySearchHandler = async () => {
    if (!searchText) {
      setUserList([]);
      return;
    }
    setIsLoading(true);
    const data = await getUserBySearch(searchText);
    if (data) {
      setUserList(data);
    }
    else {
      setIsError(true);
    }
    setIsLoading(false);
  }

  const searchTextHandler = async (input: string) => {
    setSearchText(input);
  }

  return (
    <Box sx={{
      display: "flex",
      maxWidth: '90vw'
    }}>
      <Box sx={{ flexGrow: 2 }}>{children}</Box>
      {!isDrawerOpen ? (
        <Box sx={{ display: 'flex', flexDirection: 'column', }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              minWidth: isMobileScreen ? 20 : 300
            }}>
            {!isMobileScreen && <Typography color="#4C4646">Start new chat</Typography>}
            <IconButton
              color='inherit'
              aria-label='open drawer'
              edge='start'
              onClick={() => setIsDrawerOpen(true)}
              sx={{
                margin: "0 5px",
                padding: "0",
                ...(isDrawerOpen && { display: "none" }),
              }}>
              <TextsmsOutlinedIcon />
            </IconButton>
          </Box>
          {!isMobileScreen && (
            <>
              <Divider sx={{ margin: 1.5 }} />
              <ChatList />
            </>)
          }
        </Box>
      ) : (
        <>
          <Drawer
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              "& .MuiDrawer-paper": {
                width: drawerWidth,
                background: '#F9F6EE'
              },
            }}
            variant='temporary'
            anchor='right'
            open={isDrawerOpen}>
            <DrawerHeader>
              <IconButton onClick={() => setIsDrawerOpen(!isDrawerOpen)}>
                <ChevronLeftIcon />
              </IconButton>
              <SearchUser searchText={searchText} searchTextHandler={searchTextHandler} />
            </DrawerHeader>
            <UserList
              isLoading={isLoading}
              isError={isError}
              userList={userList}
            />
          </Drawer>
        </>
      )
      }
    </Box >
  );
};

export default SideDrawer;
