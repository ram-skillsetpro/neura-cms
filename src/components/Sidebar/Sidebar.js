import React, { useEffect, useState } from 'react';
import style from './Sidebar.module.scss'; 
import { Link } from 'react-router-dom';
import { AUTHORITY } from "../../utils/constants";
import {userAuthority } from "../../utils/authGuard";
import CorporateFare from '@mui/icons-material/CorporateFare';
import Assignment from '@mui/icons-material/Assessment';
import Badge from '@mui/icons-material/Badge';
import DomainAdd from '@mui/icons-material/DomainAdd';
import PeopleOutlineSharpIcon from '@mui/icons-material/PeopleOutlineSharp';
import InboxIcon from '@mui/icons-material/Inbox'

const Sidebar = () => {
  const authority = userAuthority().map(authority => authority.name);
  const [navs, setNavs] = useState([]);
  
  useEffect(() => {
    if(authority.includes(AUTHORITY.UPDATE_DEMO_USER)){
      setNavs([
        // {url: '/company/manage', title: 'Manage Company', icon: <BusinessSharpIcon /> },
        // {url: '/user/manage', title: 'Manage User', icon: <PeopleOutlineSharpIcon />},
        {url: '/roles', title: 'Roles', icon: <CorporateFare />, active:true},
        {url: '/user/manage', title: 'Authorities', icon: <Badge />},
        {url: '/user/manage', title: 'Authorities Maping', icon: <DomainAdd />},
        {url: '/user/manage', title: 'Users', icon: <PeopleOutlineSharpIcon />},
        {url: '/user/manage', title: 'Reports', icon: <Assignment />},
        {url: '/user/manage', title: 'Roles', icon: <CorporateFare />},
      ])
    }else if(authority.includes(AUTHORITY.CLAUSE_PROMPT_MANAGEMENT)){
      setNavs([
        {url: '/contract/create', title: 'Contract Create', icon: <InboxIcon />}, 
        {url: '/contract/manage', title: 'Contract Master', icon: <InboxIcon />},
        {url: '/clause/create', title: 'Clause Create', icon: <InboxIcon />},
        {url: '/clause/manage', title: 'Clause Master', icon: <InboxIcon />},
        {url: '/clause-prompt/add', title: 'Add Clause Prompt', icon: <InboxIcon />},
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
              <Link to={nav.url} className={nav.active ? style.active: null}>
                {nav.icon}
                {nav.title}
              </Link>
            </li>
          )}
        </ul>
      </div>
    </>
    
  );
}

export default Sidebar;