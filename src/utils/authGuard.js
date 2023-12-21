import { AUTHORITY_ROUT_MAP } from './constants';

export const isLoggedin = () => {
  return typeof window?.localStorage !== 'undefined' && !!localStorage.getItem('auth');
};

export const getToken = () => {
  let token = null;
  if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
    const authData = localStorage.getItem('auth');
    if (authData) {
      const parsedAuthData = JSON.parse(authData);
      if (parsedAuthData.token) {
        token = parsedAuthData.token;
      }
    }
  }
  return token;
};

export const userAuthority = () => {
  let userAuthority = [];
  if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
    const authData = localStorage.getItem('auth');
    if (authData) {
      const parsedAuthData = JSON.parse(authData);
      if (parsedAuthData.userauthority) {
          userAuthority = parsedAuthData.userauthority;
      }
    }
  }
  return userAuthority;
};

export const getAuthUser = () => {
  if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
    const authData = localStorage.getItem('auth');
    if (authData) {
      return JSON.parse(authData);
    }
  }
  return null;
};

export const hasAuthority = (authority) => {
  const authUser = getAuthUser();
  const foundAuthority = authUser?.userauthority.find(i => i.name === authority);
  return !!foundAuthority;
};

export const hasAuthorityById = (authorityId) => {
  const authUser = getAuthUser();
  const foundAuthority = authUser?.userauthority.find(i => i.id === authorityId);
  return !!foundAuthority;
};

export const isRestrictedRoutWithAuthority = (route) => {
  let returnValue = false;  
  const authorityRouteArray = AUTHORITY_ROUT_MAP.filter(x => route.match(x.route_regx) ? true : false)
  if (authorityRouteArray && authorityRouteArray.length >= 1) {
    returnValue = true
  }
  return returnValue
};


export const canAccessTheRouteWithUserAuthorities = (route) => {
    let returnValue = false;
    const authorityRoute = AUTHORITY_ROUT_MAP.find(x => route.match(x.route_regx) ? true : false)
    if (authorityRoute) {
        const userAuthorityList = userAuthority();
        authorityRoute?.authority?.forEach(authority => {
            userAuthorityList.forEach(authorityUser => {
                if (authority === authorityUser.name) {
                    returnValue = true
                }
            });
        });
    }
    return returnValue
};


// Function to check if the user is authenticated
export const isAuthenticated = () => {
  let isAuthenticated = false;
  if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
    const authData = localStorage.getItem('auth');
    if (authData) {
      const parsedAuthData = JSON.parse(authData);
      if (parsedAuthData.token) {
        isAuthenticated = true;
      }
    }
  }
  return isAuthenticated;
};



