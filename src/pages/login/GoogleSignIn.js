// GoogleLoginButton.js
import React, { useEffect } from 'react';
import { jwtDecode as jwt_decode } from 'jwt-decode';

const GoogleSignIn = () => {
    useEffect(() => {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      document.head.appendChild(script);
  
      window.handleAuthRes = (response) => {
        const responsePayload = jwt_decode(response.credential);
        console.log("ID: " + responsePayload.sub);
        console.log('Full Name: ' + responsePayload.name);
        console.log('Given Name: ' + responsePayload.given_name);
        console.log('Family Name: ' + responsePayload.family_name);
        console.log("Image URL: " + responsePayload.picture);
        console.log("Email: " + responsePayload.email);
      };
  
      return () => {
        document.head.removeChild(script);
      };
    }, []);

    return (
      <div>
        <div id="g_id_onload" data-client_id="464691684498-muvaskstvkks3jdcde2r8d38bhnpq50o.apps.googleusercontent.com" data-context="signin" data-ux_mode="popup" data-callback="handleAuthRes" data-nonce="" data-auto_prompt="false"></div>
        <div className="g_id_signin" data-type="standard" data-shape="pill" data-theme="filled_black" data-text="signin_with" data-size="large" data-logo_alignment="left"></div>
      </div>
    );
  };
  
  export default GoogleSignIn;