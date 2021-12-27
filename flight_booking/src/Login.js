import React, { useState } from 'react';
import { setUserSession, setUserEmail,getUserAPI } from './Common';
import axios from 'axios';
import {NavLink} from 'react-router-dom';
import Button from "react-bootstrap/Button";
 
function Login(props) {

  const API_USER =getUserAPI();
  const [loading] = useState(false);
  const username = useFormInput('');
  const password = useFormInput('');
  const [error, setError] = useState(null);
 
  // handle button click of login form
  const handleLogin = () => {
      
      if(username.value==='admin' && password.value==='admin'){
        props.history.push('/admin');
      }
      else
      {
          axios.post(API_USER+'flight/user/login', { username: username.value, password: password.value }).then(response => {
          console.log(response);
          if(response.data.msg==="Valid"){
            setUserSession('Username', response.data.name);
            setUserEmail('Useremail', response.data.username);
            props.history.push('/dashboard');
          }
          else{
            alert("Invalid Credential");
          }
        
        }).catch(error => {
        if (error.response.status === 401) setError(error.response.data.message);
        else setError("Something went wrong. Please try again later.");
        });    
      }
  }
  
 return (
    <div>
     <div className="header">
            <NavLink exact activeClassName="active" to="/">Home</NavLink>
            <NavLink activeClassName="active" to="#">News</NavLink>
            <NavLink activeClassName="active" to="#">Contact</NavLink>
            <NavLink activeClassName="active" to="#">About</NavLink>
            <NavLink activeClassName="active" to="#">What's New</NavLink>
            <NavLink activeClassName="active" to="/signup">New User</NavLink>
      </div>
      <b>Login</b>
      <br /><br />
      <div>
        Username<br />
        <input type="text" {...username} autoComplete="new-password" />
      </div>
      <div style={{ marginTop: 10 }}>
        Password<br />
        <input type="password" {...password} autoComplete="new-password" />
      </div>
      {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
      <Button type="submit" variant="success" value={loading ? 'Loading...' : 'Login'} onClick={handleLogin} disabled={loading} >Login</Button><br />
    </div>
  );
}
 
const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue);
 
  const handleChange = e => {
    setValue(e.target.value);
  }
  return {
    value,
    onChange: handleChange
  }
}
 
export default Login;