import React, { useEffect, useState } from 'react';
import style from './Sidebar.module.scss'; 
import { Link, NavLink } from 'react-router-dom';
import { AUTHORITY } from "../../utils/constants";
import {userAuthority } from "../../utils/authGuard";
import CorporateFare from '@mui/icons-material/CorporateFare';
import Assignment from '@mui/icons-material/Assessment';
import Badge from '@mui/icons-material/Badge';
import DomainAdd from '@mui/icons-material/DomainAdd';
import BusinessSharpIcon from '@mui/icons-material/BusinessSharp'
import PeopleOutlineSharpIcon from '@mui/icons-material/PeopleOutlineSharp';
import InboxIcon from '@mui/icons-material/Inbox'
import BalanceIcon from '@mui/icons-material/Balance';
import {PageUrls } from "../../utils/constants";

const Sidebar = () => {
  const authority = userAuthority().map(authority => authority.name);
  const [navs, setNavs] = useState([]);
  
  useEffect(() => {
    if(authority.includes(AUTHORITY.UPDATE_DEMO_USER)){
      setNavs(prevNavs => [...prevNavs, 
        {url: PageUrls.COMPANY, title: 'Manage Company', icon: <BusinessSharpIcon /> },
        {url: PageUrls.USER, title: 'Manage User', icon: <PeopleOutlineSharpIcon />},
        {url: PageUrls.ROLES, title: 'Roles', icon: <BalanceIcon />, active:true},
        {url: PageUrls.AUTHORITIES, title: 'Authorities', icon: <Badge />}, 
        {url: PageUrls.REPORTS, title: 'Reports', icon: <Assignment />}, 
      ]);
    }
    if(authority.includes(AUTHORITY.CLAUSE_PROMPT_MANAGEMENT)){
      setNavs(prevNavs => [...prevNavs, 
        {url: PageUrls.CONTRACT_CREATE, title: 'Contract Create', icon: <InboxIcon />}, 
        {url: PageUrls.CONTRACT, title: 'Contract Master', icon: <InboxIcon />},
        {url: PageUrls.CLAUSE_CREATE, title: 'Clause Create', icon: <InboxIcon />},
        {url: PageUrls.CLAUSE, title: 'Clause Master', icon: <InboxIcon />},
        {url: PageUrls.CLAUSE_PROMPT, title: 'Clause Prompt', icon: <InboxIcon />},
      ]);
    }
  },[])
  
  return (
    <>
      <div className={style.sidebarNavigation}>
        <ul>
          {navs.map((nav, index) => 
            <li key={index}>
              <NavLink to={nav.url} className={({ isActive }) => (isActive ? style.active : '')}>
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