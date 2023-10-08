import React from 'react';
import Sidebar from '../sidebar/Sidebar';
import style from './Layout.module.scss';
import Header from '../../components/layout/header/Header';

const WithSidebarLayout = ({ children }) => {
  return ( 
    
    <>
      <Header />
      <div className={style.layoutWrapper}>
        <div className={style.sidebar}>
          <Sidebar />
        </div>
        <div className={style.viewArea}>
          {children}
        </div>
      </div>
    </>
  );
};

export default WithSidebarLayout;
