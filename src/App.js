import React from 'react';
import { BrowserRouter } from 'react-router-dom'; 
import { NavigationBar } from './components/NavigationBar';
import Routers from './Routers/Routers';
import { isAuthenticated } from './utils/authGuard';

function App() {
  const isAuthentic = isAuthenticated();

  return (
    <BrowserRouter>
      <>
        {isAuthentic ? 
          <NavigationBar /> 
          : null
        }
        <Routers />
      </>
    </BrowserRouter>
  );
}

export default App;
