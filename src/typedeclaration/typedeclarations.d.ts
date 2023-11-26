declare module 'Sharedlib/theme' {
    import { themeType } from "@mui/material";
    const theme: themeType;
    export default theme;
}
 
declare module "Sharedlib/eventservice" {
    import { WindowEventService as windowEventService, WindowEvents as windowEvents, UserInfoType } from "@kshitijraj09/sharedlib_mf";
    const WindowEventService: typeof windowEventService;
    const WindowEvents: typeof windowEvents;
    const UserInfoType: UserInfoType;  
    export default WindowEventService;
    export { WindowEvents, UserInfoType };
}
  

