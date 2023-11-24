import { getUserBySearchAPIUrl } from "./apiurlconstants";
import { axiosInstance } from "./axiosInstance";

export const getUserBySearch = async (value: string) => {
   try {
      const { data: userListBySearch } = await axiosInstance.get(`${getUserBySearchAPIUrl}?search=${value}`);
      return userListBySearch;
   }
   catch (error) {
      console.log(error);
   }
}