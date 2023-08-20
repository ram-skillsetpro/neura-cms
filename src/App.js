import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { NavigationBar } from './components/NavigationBar';
import { User } from './pages/User';
import Login from './pages/Login';
import { Index } from './pages/Index';
import { NoMatch } from './NoMatch';
import Layout from './components/layout/Layout'; // Import the Layout HOC
import { isAuthenticated, isRestrictedRoutWithAuthority, canAccessTheRouteWithUserAuthorities } from './utils/authGuard';
import ManageUser from './pages/master/ManageUser';
import ManageCompany from './pages/company/ManageCompany';
import CreateCompany from './pages/company/Create';
import { useLocation } from 'react-router-dom';

function PrivateRoute({ element }) {
  let isAuthentic = isAuthenticated();
  const pathname = useLocation().pathname;
  if (isRestrictedRoutWithAuthority(pathname) && !canAccessTheRouteWithUserAuthorities(pathname)) {
    isAuthentic = false;
  }
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
          <Route path="/company/create" element={<PrivateRoute element={<Layout> <CreateCompany /> </Layout>} />} />
          <Route path="/company/manage" element={<PrivateRoute element={<Layout> <ManageCompany /> </Layout>} />} />
          <Route path="/manage/user" element={<PrivateRoute element={<Layout> <ManageUser /> </Layout>} />} />
          <Route path="/manage/company" element={<PrivateRoute element={<Layout> <ManageCompany /> </Layout>} />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </React.Fragment>
    </Router>
  );
}

export default App;
