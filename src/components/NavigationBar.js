import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
// import logo from '../../public/images/simpleo-ai-logo@2x.png'

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "#F2F2F2",
  border: "1px solid #F2F2F2",
  color: "#232323",
  '&:hover': {
    backgroundColor:"#F2F2F2",
  },
  // '&:active': {
  //   border:"1px solid #e284af"
  // },
  // '&:focus': {
  //   border:"1px solid #e284af"
  // },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
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
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));


export const NavigationBar = () => (
  <Box sx={{ flexGrow: 1 }} className="top-nav-header">
  <AppBar position="static">
    <Toolbar>
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={2}>
        <img src="/images/simpleo-ai-logo@2x.png" alt='simpleO.ai' className='top-logo'/>
        </Grid>
        <Grid item xs={8}>
        {/* <Search sx={{marginTop:"12px"}}>
        <SearchIconWrapper>
        <img src='/images/icon-search@4x.png' alt='simpleO.ai' className='icon-size'/>
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ 'aria-label': 'search' }}
        />
      </Search> */}
        </Grid>
        <Grid item xs={2} style={{textAlign:"right"}}>
        {/* <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton> */}
        {/* <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
          <img src='images/icon-bell.svg' alt='simpleO.ai'/>
          </Badge>
        </IconButton> */}
        <IconButton
          size="large"
          edge="end"
          aria-label="account of current user"
          // aria-controls={menuId}
          aria-haspopup="true"
          // onClick={handleProfileMenuOpen}
          color="inherit"
        >
          <Avatar sx={{ width: 24, height: 24 }}>H</Avatar>
        </IconButton>
        </Grid>
      </Grid>
    </Box>
    </Toolbar>
  </AppBar>
  {/* {renderMobileMenu}
  {renderMenu} */}
</Box>
)