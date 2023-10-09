import React, { useState } from 'react';
import Sidebar from '../sidebar/Sidebar';
import style from './Layout.module.scss';
import Header from '../../components/layout/header/Header';
import { Drawer } from '@mui/material';

const WithSidebarLayout = ({ children }) => {
  const [panelState, setPanelState] = useState(false);

  const mWebMenuToggleHandler = () => {
    setPanelState(!panelState);
  }
  return ( 
    
    <>
      <Header mWebClick={mWebMenuToggleHandler} />

      <div className={style.layoutWrapper}>
        <div className={`${style.sidebar} d-none d-lg-block`}>
          <Sidebar />
        </div>
        <div className={style.viewArea}>
          {children}
        </div>
      </div>

      <Drawer
        anchor="left"
        open={panelState}
        onClose={mWebMenuToggleHandler}
        PaperProps={{ 
          sx: {width: '240px'} 
        }} 
      >
        <Sidebar closeEvent={mWebMenuToggleHandler} />
      </Drawer>
    </>
  );
};

export default WithSidebarLayout;
