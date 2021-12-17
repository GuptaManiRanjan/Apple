import React from 'react';
import Form from "./Form"
import './Signup.css';
import {NavLink } from 'react-router-dom';

function Signup() {

    return (
        <div>
            <div className="header">
            <NavLink exact activeClassName="active" to="/">Home</NavLink>
            <NavLink activeClassName="active" to="#">News</NavLink>
            <NavLink activeClassName="active" to="#">Contact</NavLink>
            <NavLink activeClassName="active" to="#">About</NavLink>
            <NavLink activeClassName="active" to="#">What's New</NavLink>
            <NavLink activeClassName="active" to="/login">Login</NavLink>
        </div>
            <Form />
        </div>
    );
  }

export default Signup;