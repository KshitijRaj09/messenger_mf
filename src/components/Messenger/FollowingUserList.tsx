// import React, {useEffect, useState} from "react";
// import {getFollowingsListAPI} from "./apis/getFollowingsListApi";
// import UserCard from "./UserCard";
// import {List, Paper} from "@mui/material";

// type followingUserListType = {
//    userid: string;
//    username: string;
// };

// const FollowingUserList = () => {
//    const [listOfFollowings, setListofFollowings] = useState<
//       followingUserListType[]
//    >([]);

//    const getListOfFollowingsHandler = async () => {
//       const data = await getFollowingsListAPI();
//       setListofFollowings(data);
//    };

//    useEffect(() => {
//       getListOfFollowingsHandler();
//    }, []);

//    return (
//       <Paper elevation={2}>
//          <List sx={{width: "100%", maxWidth: 300}}>
//             {listOfFollowings.length > 0 &&
//                listOfFollowings.map((user) => (
//                   <UserCard
//                      key={user.userid}
//                      userId={user.userid}
//                      username={user.username}
//                   />
//                ))}
//          </List>
//       </Paper>
//    );
// };

// export default FollowingUserList;
