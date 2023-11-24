import { followingUserListAPIUrl } from "./apiurlconstants";
import { axiosInstance } from "./axiosInstance";

export const getFollowingsListAPI = async () => {

    try {
        const { data } = await axiosInstance.get(followingUserListAPIUrl);
        return data;
    }
    catch (error) {
        console.log(error);
    }
}