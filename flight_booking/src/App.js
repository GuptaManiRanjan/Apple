import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import './App.css';
import Login from './Login';
import UserDashboard from './UserDashboard';
import Home from './Home';
import Signup from './Signup';
import Admin from './Admin';
import background from "./img/bg.jpg";
import BookingHistory from './BookingHistory';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

   return (
    <div className="App"  style={{ backgroundImage: `url(${background})` }}>
      <BrowserRouter>
        <div>
          <div className="content">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/dashboard" component={UserDashboard} />
              <Route path="/signup" component={Signup} />
              <Route path="/admin" component={Admin} />
              <Route path="/bookinghistory" component={BookingHistory} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}
 
export default App;
