// Layout.js
import React from 'react';
import WithSidebarLayout from './WithSidebarLayout'; // Import your layout components
import NoSidebarLayout from './NoSidebarLayout';
import { isAuthenticated } from '../../utils/authGuard';

const Layout = ({ children }) => {
  const isAuthentic = isAuthenticated(); // Assuming you have isAuthenticated function

  // Determine which layout to use based on the current route
  const getLayout = () => {
    if (isAuthentic) {
      return <WithSidebarLayout>{children}</WithSidebarLayout>;
    } else {
      return <NoSidebarLayout>{children}</NoSidebarLayout>;
    }
  };

  return getLayout();
};

export default Layout;
