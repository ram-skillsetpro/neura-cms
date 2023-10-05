import React from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { canAccessTheRouteWithUserAuthorities, isAuthenticated, isRestrictedRoutWithAuthority } from "../utils/authGuard";
import Layout from "../components/Layout/Layout";  // Import the Layout HOC
import Login from "../pages/Login";
import { Index } from "../pages/Index";
import CreateCompany from "../pages/company/Create";
import ManageCompany from "../pages/company/ManageCompany";
import ManageUser from "../pages/user/ManageUser";
import CreateContract from "../pages/contract/Create";
import ManageContract from "../pages/contract/ManageContract";
import CreateClause from "../pages/clause/CreateClause";
import ManageClause from "../pages/clause/ManageClause";
import ClausePrompt from "../pages/clause/ClausePrompt";
import AddClausePrompt from "../pages/clause/AddClausePrompt";
import { NoMatch } from "../pages/NoMatch";
import Roles from "../pages/Roles/Roles";


function PrivateRoute({ element }) {
  let isAuthentic = isAuthenticated();
  const pathname = useLocation().pathname;
  if (isRestrictedRoutWithAuthority(pathname) && !canAccessTheRouteWithUserAuthorities(pathname)) {
    isAuthentic = false;
  }
  return isAuthentic ? element : <Navigate to="/login" />;
}

const Routers = () => {
    return(
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<PrivateRoute element={<Layout> <Index /> </Layout>} />} />
          <Route path="/roles" element={<PrivateRoute element={<Layout> <Roles /> </Layout>} />} />
          
          <Route path="/company/create" element={<PrivateRoute element={<Layout> <CreateCompany /> </Layout>} />} />
          <Route path="/company/manage" element={<PrivateRoute element={<Layout> <ManageCompany /> </Layout>} />} />
          <Route path="/user/manage" element={<PrivateRoute element={<Layout> <ManageUser /> </Layout>} />} />
          <Route path="/contract/create" element={<PrivateRoute element={<Layout> <CreateContract /> </Layout>} />} />
          <Route path="/contract/manage" element={<PrivateRoute element={<Layout> <ManageContract /> </Layout>} />} />
          <Route path="/clause/create" element={<PrivateRoute element={<Layout> <CreateClause /> </Layout>} />} />
          <Route path="/clause/manage" element={<PrivateRoute element={<Layout> <ManageClause /> </Layout>} />} />
          <Route path="/clause-prompt/manage" element={<PrivateRoute element={<Layout> <ClausePrompt /> </Layout>} />} />
          <Route path="/clause-prompt/add" element={<PrivateRoute element={<Layout> <AddClausePrompt /> </Layout>} />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
    )
}

export default Routers;