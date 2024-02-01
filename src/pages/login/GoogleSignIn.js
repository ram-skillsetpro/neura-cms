import React, { useEffect, useState } from 'react';
import fetcher from '../../utils/fetcher';
import { useNavigate } from 'react-router-dom';
import { AUTHORITY, PageUrls } from '../../utils/constants';
import { hasAuthority } from '../../utils/authGuard';
import SnackBar from '../../components/SnackBar';

const GoogleSignIn = () => {
  const navigate = useNavigate();
  const [snackbar, setSnackbar] = useState({
    show: false,
    status: "",
    message: "",
  });
  const toggleSnackbar = (value) => {
    setSnackbar(value);
  };

  const handleSignIn = async (data) => {
    try {
      const formData = new URLSearchParams();
      formData.append('credential', data);
      const response = await fetcher.post('sign-in/external', formData);
      setSnackbar({
        show: true,
        status: response?.status === 200 ? 'success' : 'error',
        message: response?.status === 200 ? 'Login successfully' : response?.message
      });
      if (response?.response?.token) {
        localStorage.setItem('auth', JSON.stringify(response.response));
        navigateTo();
      }
    } catch (err) {
      console.log(err);
    }
  }

  const navigateTo = () => {
    if (hasAuthority(AUTHORITY.USER_SUPER_ADMIN)) {
      navigate(PageUrls.DASHBOARD);
    } else if (hasAuthority(AUTHORITY.USER_QC) || hasAuthority(AUTHORITY.USER_DE)) {
      navigate(PageUrls.TICKETS);
    } else if (hasAuthority(AUTHORITY.CLAUSE_PROMPT_MANAGEMENT)) {
      navigate(PageUrls.CONTRACT);
    } else if (hasAuthority(AUTHORITY.UPDATE_DEMO_USER)) {
      navigate(PageUrls.COMPANY);
    } else {
      navigate(PageUrls.DASHBOARD);
    }
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    document.head.appendChild(script);

    window.handleAuthRes = (response) => {
      handleSignIn(response.credential);
    };

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <>
      <div>
        <div id="g_id_onload" data-client_id="464691684498-muvaskstvkks3jdcde2r8d38bhnpq50o.apps.googleusercontent.com" data-context="signin" data-ux_mode="popup" data-callback="handleAuthRes" data-nonce="" data-auto_prompt="false"></div>
        <div className="g_id_signin" data-type="standard" data-shape="pill" data-theme="filled_black" data-text="signin_with" data-size="large" data-logo_alignment="left"></div>
      </div>
      <SnackBar {...snackbar} onClose={toggleSnackbar} />
    </>
  );
};

export default GoogleSignIn;