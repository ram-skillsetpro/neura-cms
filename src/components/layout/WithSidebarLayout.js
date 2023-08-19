import React from 'react';
import Sidebar from '../Sidebar';

const WithSidebarLayout = ({ children }) => {
  return (
    <div>
      {/* Your common layout elements (e.g., header) */}
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div style={{ flex: 1 }}>
          {children}
        </div>
      </div>
      {/* Your common layout elements (e.g., footer) */}
    </div>
  );
};

export default WithSidebarLayout;
