import React from 'react'; 
import style from './Header.module.scss';
import Dropdown from 'react-bootstrap/Dropdown'; 
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';
import logoImg from '../../../assets/images/simpleo-ai-logo@2x.png';
import { useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
 
const Header = ({mWebClick}) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('auth');
    navigate('/login');
  };



  return(
    <>
      <header className={style.header}>
        <div className='d-lg-none'>
          <IconButton onClick={mWebClick}>
            <MenuIcon />
          </IconButton>
        </div>

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
            </Dropdown.Toggle>

            <Dropdown.Menu className={style.dropdownBox}>
              <div className={style.dropImg}>
                <AccountCircle  />
              </div>
              <h3>Happy Singh</h3>
              <h4>Admin</h4>
              <button onClick={handleLogout} className='btn btn-primary'>Logout</button>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </header> 
    </>
  )
}
  
export default Header;