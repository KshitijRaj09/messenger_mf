
import React from 'react';
import { InputBase, alpha, styled } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
const Search = styled('div')(({ theme }) => ({
   position: 'relative',
   borderRadius: theme.shape.borderRadius,
   backgroundColor: alpha('#555D50', 0.15),
   '&:hover': {
      backgroundColor: alpha('#555D50', 0.25),
   },
   marginLeft: 0,
   width: '100%',
   [theme.breakpoints.up('mobile')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
   },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
   padding: theme.spacing(0, 2),
   height: '100%',
   position: 'absolute',
   pointerEvents: 'none',
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
   color: 'inherit',
   '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('mobile')]: {
         width: '12ch',
         '&:focus': {
            width: '20ch',
         },
      },
   },
}));

type SearchUserPropsType = {
   searchText: string;
   searchTextHandler: (input: string) => void;
}

const SearchUser = ({ searchText, searchTextHandler }: SearchUserPropsType) => {
   return (
      <Search>
         <SearchIconWrapper>
            <SearchIcon />
         </SearchIconWrapper>
         <StyledInputBase
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
            value={searchText}
            onChange={(event) => searchTextHandler(event.target.value)}
         />
      </Search>
   )
}

export default SearchUser;