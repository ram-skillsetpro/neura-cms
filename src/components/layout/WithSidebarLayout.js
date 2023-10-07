import React from 'react';
import Sidebar from '../sidebar/Sidebar';
import style from './Layout.module.scss';

const WithSidebarLayout = ({ children }) => {
  return ( 
    <div className={style.layoutWrapper}>
      <div className={style.sidebar}>
        <Sidebar />
      </div>
      <div className={style.viewArea}>
        {children}
      </div>
    </div>
  );
};

export default WithSidebarLayout;
