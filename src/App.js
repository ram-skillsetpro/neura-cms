import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { NavigationBar } from './components/NavigationBar';
import { User } from './pages/User';
import Login from './pages/Login';
import { Index } from './pages/Index';
import { NoMatch } from './NoMatch';
import Layout from './components/layout/Layout'; // Import the Layout HOC
import { isAuthenticated } from './utils/authGuard';

function App() {

  const isAuthentic = isAuthenticated();
  return (
    <Router>
      <React.Fragment>
        <NavigationBar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={isAuthentic ? <Layout> <Index /> </Layout> : <Navigate to="/login" />} />
          <Route path="/user" element={isAuthentic ? <Layout> <Index /> </Layout> : <Navigate to="/login" />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </React.Fragment>
    </Router>
  );
}

export default App;
