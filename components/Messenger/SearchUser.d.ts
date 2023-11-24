import React from 'react';
type SearchUserPropsType = {
    searchText: string;
    searchTextHandler: (input: string) => void;
};
declare const SearchUser: ({ searchText, searchTextHandler }: SearchUserPropsType) => React.JSX.Element;
export default SearchUser;
