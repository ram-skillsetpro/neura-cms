import React from 'react';

const NoSidebarLayout = ({ children }) => {
  return (
    <div>
      {/* Your common layout elements (e.g., header) */}
      {children}
      {/* Your common layout elements (e.g., footer) */}
    </div>
  );
};

export default NoSidebarLayout;
