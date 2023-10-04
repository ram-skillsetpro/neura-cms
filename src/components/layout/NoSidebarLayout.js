import React from 'react';
import style from './Layout.module.scss';

const NoSidebarLayout = ({ children }) => {
  return (
    <div className={style.noSidebarLayout}>
      {/* Your common layout elements (e.g., header) */}
      {children}
      {/* Your common layout elements (e.g., footer) */}
    </div>
  );
};

export default NoSidebarLayout;
