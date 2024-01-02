import React, { useEffect, useState } from 'react';
import style from './Sidebar.module.scss'; 
import { NavLink, useNavigate } from 'react-router-dom';
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
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import userDefaultImage from '../../assets/images/defaultProfileImg.png';
import NavItem from './NavItem';
import { getAuthUser } from '../../utils/authGuard';

const Sidebar = ({closeEvent}) => {
  const navigate = useNavigate();
  const authority = userAuthority().map(authority => authority.name);
  const [navs, setNavs] = useState([]);
  
  useEffect(() => {
    if (authority.includes(AUTHORITY.USER_SUPER_ADMIN)) {
      setNavs(prevNavs => [...prevNavs,
        {url: PageUrls.DASHBOARD, title: 'Dashboard', icon: <DashboardIcon /> }
      ]);
    }
    if(authority.includes(AUTHORITY.UPDATE_DEMO_USER)){
      setNavs(prevNavs => [...prevNavs,
        {url: PageUrls.COMPANY, title: 'Manage Company', icon: <BusinessSharpIcon /> },
        {url: PageUrls.LEADS, title: 'Manage Leads', icon: <PeopleOutlineSharpIcon />}, 
        // {url: PageUrls.REPORTS, title: 'Reports', icon: <Assignment />}, 
        {
          title: 'User Management', 
          icon: <ManageAccountsIcon />, 
          subNavs: [
            {url: PageUrls.USERS, title: 'Users'},
            authority.includes(AUTHORITY.ROLE_ADMINISTRATOR) ? { url: PageUrls.ROLES, title: 'Roles'} : null,
            {url: PageUrls.AUTHORITIES, title: 'Authorities'},
          ].filter(nav => nav !== null)
        }
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

  const handleLogout = () => {
    localStorage.removeItem('auth');
    navigate('/login');
  };
  
  return (
    <>
      <div className={style.sidebarNavigation}>
        <div className='d-lg-none mb-2'>
          <IconButton onClick={closeEvent}>
            <MenuOpenIcon />
          </IconButton>
        </div>
        <ul>
          {navs.map((item, index) =>
            <NavItem {...item} key={index} mWebCloseEvent={mWebCloseEvent} />
          )}
        </ul>

        <div className={style.sidebarBottom}>
          <div className={style.userInfo}> 
            <img src={userDefaultImage} alt="Gautam Sinha" className={style.userImg} /> 
            <div className={style.userInfoTxt}>
              <strong>{getAuthUser()?.username}</strong>
              <span>{getAuthUser()?.roleName}</span>
            </div> 
          </div>
          <ul>
            <li>
              <NavLink to="#" onClick={mWebCloseEvent}>
                <SettingsIcon />
                Settings
              </NavLink>
            </li>
            <li>
              <NavLink to="/" className={style.logoutLink} onClick={handleLogout}>
                <LogoutIcon />
                Log out
              </NavLink>
            </li>
          </ul> 
        </div>
      </div>
    </>
    
  );
}

export default Sidebar;