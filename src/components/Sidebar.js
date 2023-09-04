import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import { useNavigate } from 'react-router-dom';
import { AUTHORITY } from "../utils/constants";
import {userAuthority } from "../utils/authGuard";
import PeopleOutlineSharpIcon from '@mui/icons-material/PeopleOutlineSharp';
import BusinessSharpIcon from '@mui/icons-material/BusinessSharp';

export default function SelectedListItem() {
  const authority = userAuthority().map(authority => authority.name);
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <Box sx={{ width: '100%', height: '100%', bgcolor: 'background.paper' }}>
      {/* <List component="nav" aria-label="main mailbox folders">
        <ListItemButton
          selected={selectedIndex === 0}
          onClick={(event) => handleListItemClick(event, 0)}
        >
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="My Contracts" />
        </ListItemButton>
        <ListItemButton
          selected={selectedIndex === 1}
          onClick={(event) => handleListItemClick(event, 1)}
        >
          <ListItemIcon>
            <DraftsIcon />
          </ListItemIcon>
          <ListItemText primary="Shared with me" />
        </ListItemButton>
        <ListItemButton
          selected={selectedIndex === 2}
          onClick={(event) => handleListItemClick(event, 2)}
        >
          <ListItemIcon>
            <DraftsIcon />
          </ListItemIcon>
          <ListItemText primary="Starred" />
        </ListItemButton>
        <ListItemButton
          selected={selectedIndex === 3}
          onClick={(event) => handleListItemClick(event, 3)}
        >
          <ListItemIcon>
            <DraftsIcon />
          </ListItemIcon>
          <ListItemText primary="Trash" />
        </ListItemButton>
      </List>
      <Divider /> */}
      <List component="nav" aria-label="secondary mailbox folder" className='left-nav'>
        { authority.includes(AUTHORITY.UPDATE_DEMO_USER) && (
          <ListItemButton
            selected={selectedIndex === 4}
            onClick={() => navigate('/company/manage')}
          >
            <ListItemIcon>
            <BusinessSharpIcon />
          </ListItemIcon>
            <ListItemText primary="Manage Company" />
          </ListItemButton>
        )}
        { authority.includes(AUTHORITY.UPDATE_DEMO_USER) && (
          <ListItemButton
            selected={selectedIndex === 5}
            onClick={() => navigate('/user/manage')}
          >
            <ListItemIcon>
            <PeopleOutlineSharpIcon />
          </ListItemIcon>
            <ListItemText primary="Manage User" />
          </ListItemButton>
        )}
        { (authority.includes(AUTHORITY.CLAUSE_PROMPT_MANAGEMENT)) && (
          <ListItemButton
            selected={selectedIndex === 6}
            onClick={() => navigate('/contract/create')}
          >
            <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
            <ListItemText primary="Contract Create" />
          </ListItemButton>
        )}
        { (authority.includes(AUTHORITY.CLAUSE_PROMPT_MANAGEMENT)) && (
          <ListItemButton
            selected={selectedIndex === 7}
            onClick={() => navigate('/contract/manage')}
          >
            <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
            <ListItemText primary="Contract Master" />
          </ListItemButton>
        )}
      </List>
    </Box>
  );
}