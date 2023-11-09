import React, { useEffect, useState } from 'react';
import style from './Sidebar.module.scss'; 
import { NavLink } from 'react-router-dom';
import { AUTHORITY } from "../../utils/constants";
import {userAuthority } from "../../utils/authGuard"; 
import Assignment from '@mui/icons-material/Assessment';
import Badge from '@mui/icons-material/Badge'; 
import BusinessSharpIcon from '@mui/icons-material/BusinessSharp'
import PeopleOutlineSharpIcon from '@mui/icons-material/PeopleOutlineSharp'; 
import BalanceIcon from '@mui/icons-material/Balance';
import {PageUrls } from "../../utils/constants";
import { IconButton } from '@mui/material';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import ChecklistIcon from '@mui/icons-material/Checklist';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import ArticleIcon from '@mui/icons-material/Article';

const Sidebar = ({closeEvent}) => {
  const authority = userAuthority().map(authority => authority.name);
  const [navs, setNavs] = useState([]);
  
  useEffect(() => {
    if(authority.includes(AUTHORITY.UPDATE_DEMO_USER)){
      setNavs(prevNavs => [...prevNavs, 
        {url: PageUrls.COMPANY, title: 'Manage Company', icon: <BusinessSharpIcon /> },
        {url: PageUrls.LEADS, title: 'Manage Leads', icon: <PeopleOutlineSharpIcon />},
        {url: PageUrls.ROLES, title: 'Roles', icon: <BalanceIcon />, active:true},
        {url: PageUrls.AUTHORITIES, title: 'Authorities', icon: <Badge />}, 
        {url: PageUrls.REPORTS, title: 'Reports', icon: <Assignment />}, 
      ]);
    }
    if(authority.includes(AUTHORITY.CLAUSE_PROMPT_MANAGEMENT)){
      setNavs(prevNavs => [...prevNavs, 
        // {url: PageUrls.CONTRACT_CREATE, title: 'Contract Create', icon: <InboxIcon />}, 
        {url: PageUrls.CONTRACT, title: 'Contract Master', icon: <ChecklistIcon />},
        // {url: PageUrls.CLAUSE_CREATE, title: 'Clause Create', icon: <InboxIcon />},
        {url: PageUrls.CLAUSE, title: 'Clause Master', icon: <LocalLibraryIcon />},
        {url: PageUrls.CLAUSE_PROMPT, title: 'Clause Prompt', icon: <AutoStoriesIcon />},
      ]);
    }
    if(authority.includes(AUTHORITY.USER_QC) || authority.includes(AUTHORITY.USER_DE)){
      setNavs(prevNavs => [...prevNavs, 
        {url: PageUrls.TICKETS, title: 'Tickets', icon: <ArticleIcon />}
      ]);
    }
  },[])

  const mWebCloseEvent = () => {
    if(closeEvent){
      closeEvent();
    }else{
      return false;
    }
  }
  
  return (
    <>
      <div className={style.sidebarNavigation}>
        <div className='d-lg-none mb-2'>
          <IconButton onClick={closeEvent}>
            <MenuOpenIcon />
          </IconButton>
        </div>
        <ul>
          {navs.map((nav, index) => 
            <li key={index}>
              <NavLink to={nav.url} className={({ isActive }) => (isActive ? style.active : '')} onClick={mWebCloseEvent}>
                {nav.icon}
                {nav.title}
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </>
    
  );
}

export default Sidebar;