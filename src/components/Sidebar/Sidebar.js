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

const Sidebar = () => {
  const authority = userAuthority().map(authority => authority.name);
  const [navs, setNavs] = useState([]);
  
  useEffect(() => {
    if(authority.includes(AUTHORITY.UPDATE_DEMO_USER)){
      setNavs([
        {url: '/company/manage', title: 'Manage Company', icon: <BusinessSharpIcon /> },
        {url: '/user/manage', title: 'Manage User', icon: <PeopleOutlineSharpIcon />},
        {url: '/roles', title: 'Roles', icon: <CorporateFare />, active:true},
        {url: '/authorities', title: 'Authorities', icon: <Badge />}, 
        {url: '/reports', title: 'Reports', icon: <Assignment />}, 
      ])
    }
    if(authority.includes(AUTHORITY.CLAUSE_PROMPT_MANAGEMENT)){
      setNavs([
        {url: '/contract/create', title: 'Contract Create', icon: <InboxIcon />}, 
        {url: '/contract/manage', title: 'Contract Master', icon: <InboxIcon />},
        {url: '/clause/create', title: 'Clause Create', icon: <InboxIcon />},
        {url: '/clause/manage', title: 'Clause Master', icon: <InboxIcon />},
        {url: '/clause-prompt/manage', title: 'Clause Prompt', icon: <InboxIcon />},
      ])
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