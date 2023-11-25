import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../utils/authGuard';

import { hasAuthority } from '../utils/authGuard';
import { AUTHORITY, PageUrls } from '../utils/constants';

const Index = () => {

  const navigate = useNavigate();
  const isAuthentic = isAuthenticated();

  const navigateTo = () => {
    if (hasAuthority(AUTHORITY.USER_QC) || hasAuthority(AUTHORITY.USER_DE)) {
      navigate(PageUrls.TICKETS);
    } else if (hasAuthority(AUTHORITY.USER_SUPER_ADMIN)) {
      navigate(PageUrls.DASHBOARD);
    } else {
      navigate(PageUrls.LOGIN);
    }
  };

  useEffect(() => {
    navigateTo();
  }, [])

  return(
    <></>
  );

};

export default Index;
