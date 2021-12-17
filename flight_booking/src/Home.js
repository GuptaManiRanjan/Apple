import React from 'react';
import { NavLink } from 'react-router-dom';
import './App.css';
function Home() {
  return (
    <div >
      <div className="header">
            <NavLink exact activeClassName="active" to="/">Home</NavLink>
            <NavLink activeClassName="active" to="#">News</NavLink>
            <NavLink activeClassName="active" to="#">Contact</NavLink>
            <NavLink activeClassName="active" to="#">About</NavLink>
            <NavLink activeClassName="active" to="#">What's New</NavLink>
            <NavLink activeClassName="active" to="/signup">New User</NavLink>
            <NavLink activeClassName="active" to="/login">Login</NavLink>
        </div>
          <marquee>Welcome to the Flight Booking Application!</marquee>
    </div>
  );
}
 
export default Home;