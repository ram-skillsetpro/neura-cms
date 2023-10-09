import React from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { canAccessTheRouteWithUserAuthorities, isAuthenticated, isRestrictedRoutWithAuthority } from "../utils/authGuard";
import Layout from "../components/layout/Layout";  // Import the Layout HOC
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
import Roles from "../pages/roles/Roles";
import { PageUrls } from "../utils/constants";
import Authorities from "../pages/authorities/Authorities";


function PrivateRoute({ element }) {
  const location = useLocation();
  if (!isAuthenticated()) {
    return  <Navigate to={PageUrls.LOGIN} />;
  }
  if (isRestrictedRoutWithAuthority(location.pathname) && !canAccessTheRouteWithUserAuthorities(location.pathname)) {
    return <Navigate to={PageUrls.UNAUTHORIZED} />
  }
  return element;
}

const Routers = () => {
    return(
        <Routes>
          <Route path={PageUrls.LOGIN} element={<Login />} />
          <Route path={PageUrls.INDEX} element={<PrivateRoute element={<Layout> <Index /> </Layout>} />} />
          <Route path={PageUrls.ROLES} element={<PrivateRoute element={<Layout> <Roles /> </Layout>} />} />
          <Route path={PageUrls.AUTHORITIES} element={<PrivateRoute element={<Layout> <Authorities /> </Layout>} />} />
          
          <Route path={PageUrls.COMPANY_CREATE} element={<PrivateRoute element={<Layout> <CreateCompany /> </Layout>} />} />
          <Route path={PageUrls.COMPANY} element={<PrivateRoute element={<Layout> <ManageCompany /> </Layout>} />} />
          <Route path={PageUrls.USER} element={<PrivateRoute element={<Layout> <ManageUser /> </Layout>} />} />
          <Route path={PageUrls.CONTRACT_CREATE} element={<PrivateRoute element={<Layout> <CreateContract /> </Layout>} />} />
          <Route path={PageUrls.CONTRACT} element={<PrivateRoute element={<Layout> <ManageContract /> </Layout>} />} />
          <Route path={PageUrls.CLAUSE_CREATE} element={<PrivateRoute element={<Layout> <CreateClause /> </Layout>} />} />
          <Route path={PageUrls.CLAUSE} element={<PrivateRoute element={<Layout> <ManageClause /> </Layout>} />} />
          <Route path={PageUrls.CLAUSE_PROMPT} element={<PrivateRoute element={<Layout> <ClausePrompt /> </Layout>} />} />
          <Route path={PageUrls.UNAUTHORIZED} element={<Layout> <NoMatch /> </Layout>} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
    )
}

export default Routers;