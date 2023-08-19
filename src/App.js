import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { NavigationBar } from './components/NavigationBar';
import { User } from './pages/User';
import Login from './pages/Login';
import { Index } from './pages/Index';
import { NoMatch } from './NoMatch';
import Layout from './components/layout/Layout'; // Import the Layout HOC
import { isAuthenticated } from './utils/authGuard';

function PrivateRoute({ element }) {
  const isAuthentic = isAuthenticated();
  return isAuthentic ? element : <Navigate to="/login" />;
}

function App() {
  return (
    <Router>
      <React.Fragment>
        <NavigationBar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<PrivateRoute element={<Layout> <Index /> </Layout>} />} />
          <Route path="/user" element={<PrivateRoute element={<Layout> <User /> </Layout>} />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </React.Fragment>
    </Router>
  );
}

export default App;
