import React from 'react';
import { BrowserRouter } from 'react-router-dom'; 
import Header from './components/Header/Header';
import Routers from './Routers/Routers';
import { isAuthenticated } from './utils/authGuard';

function App() {
  const isAuthentic = isAuthenticated();

  return (
    <BrowserRouter>
      <>
        {isAuthentic ? 
          <Header /> 
          : null
        }
        <Routers />
      </>
    </BrowserRouter>
  );
}

export default App;
