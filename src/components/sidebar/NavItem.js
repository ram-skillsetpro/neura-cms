import React from "react";
import { NavLink } from "react-router-dom";
import style from './Sidebar.module.scss';
import { Collapse } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const NavItem = (props) => {
    const { url, title, icon, subNavs, mWebCloseEvent } = props;
    const isExpandable = subNavs && subNavs.length > 0;
    const [open, setOpen] = React.useState(false);

    const expandableHandler = () => {
        setOpen(!open);
    }

    return(
        <>
            <li>
              <NavLink to={url} className={({ isActive }) => (isActive && url ? style.active : '')} onClick={isExpandable ? expandableHandler : mWebCloseEvent}>
                {icon}
                {title}

                {isExpandable && !open && <span className={style.arrowIcon}><ExpandMoreIcon /></span>}
                {isExpandable && open && <span className={style.arrowIcon}><ExpandLessIcon /></span>}
              </NavLink>
              
              {isExpandable ?
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <ul className={style.submenu}>
                        {subNavs.map((subnav, index) => 
                            <li>
                                <NavLink to={subnav.url} className={({ isActive }) => (isActive && subnav.url ? style.active : '')} onClick={mWebCloseEvent}>
                                    {subnav.title}
                                </NavLink>
                            </li>
                        )}
                    </ul>
                </Collapse> 
              : null }
            </li>
        </>
    )
}

export default NavItem;