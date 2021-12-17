export const getUser = () => {
    //const userStr = sessionStorage.getItem('user');
    //const userStr = sessionStorage.key('Username');
    const userStr = sessionStorage.getItem('user');
return userStr;
    // if (userStr) return JSON.parse(userStr);
    // else return "";
  }

  export const getUserEmail = () => {
   
    const userEmail = sessionStorage.getItem('useremail');
return userEmail;
    
  }
   
  // return the token from the session storage
  export const getToken = () => {
    return sessionStorage.getItem('token') || null;
  }
   
  // remove the token and user from the session storage
  export const removeUserSession = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
  }
   
  // set the token and user from the session storage
  export const setUserSession = (token, user) => {
    sessionStorage.setItem('token', token);
   // sessionStorage.setItem('user', JSON.stringify(user));
   sessionStorage.setItem('user', user);
  }
  export const setUserEmail = (token, useremail) => { 
    sessionStorage.setItem('token', token);   
   sessionStorage.setItem('useremail', useremail);
  }