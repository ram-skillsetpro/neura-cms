import React from 'react'; 
import style from './Header.module.scss';
import Dropdown from 'react-bootstrap/Dropdown';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';
import logoImg from '../../assets/images/simpleo-ai-logo@2x.png';
 
const Header = () => {
  return(
    <>
      <header className={style.header}>
        <div className={style.logo}>
          <Link to="/">
            <img src={logoImg} alt="" />
          </Link>
        </div>

        <div className={style.headerRight}>
          <Dropdown className={style.usernameDropown}>
            <Dropdown.Toggle variant="default" id="dropdown-basic">
              <div className={style.btnAvatar}>
                <AccountCircle  />
              </div>
              <div className={style.btnUsername}>
                <strong>Happy Singh</strong>
                Admin
              </div>
            </Dropdown.Toggle>

            <Dropdown.Menu className={style.dropdownBox}>
              <div className={style.dropImg}>
                <AccountCircle  />
              </div>
              <h3>Happy Singh</h3>
              <h4>Admin</h4>
              <button className='btn btn-primary'>Logout</button>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </header> 
    </>
  )
}
  
export default Header;