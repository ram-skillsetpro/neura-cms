import React from 'react';
import { BrowserRouter } from 'react-router-dom'; 
import Header from './components/layout/header/Header';
import Routers from './routers/Routers';
import { isAuthenticated } from './utils/authGuard';

function App() {
  const isAuthentic = isAuthenticated();

  return (
    <BrowserRouter>
      <Routers />
    </BrowserRouter>
  );
}

export default App;
