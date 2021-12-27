import { useState } from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { getUserAPI } from './Common';

export default function Form() {

const API_USER =getUserAPI();
let history = useHistory();
// States for registration
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [mobile, setMobile] = useState('');
const [password, setPassword] = useState('');

var msg;

// States for checking the errors
const [submitted, setSubmitted] = useState(false);
const [error, setError] = useState(false);

// Handling the name change
const handleName = (e) => {
	setName(e.target.value);
	setSubmitted(false);
};

// Handling the email change
const handleEmail = (e) => {
	setEmail(e.target.value);
	setSubmitted(false);
};

// Handling the Mobile change
const handleMobile = (e) => {
	setMobile(e.target.value);
	setSubmitted(false);
};

// Handling the password change
const handlePassword = (e) => {
	setPassword(e.target.value);
	setSubmitted(false);
};

// Handling the form submission
const handleSubmit = (e) => {
	e.preventDefault();
	if (name === '' || email === '' || password === '' || mobile === '')
    {
	    setError(true);
	}
    else
    {
	    setSubmitted(true);
        setError(false);
        axios.post(API_USER+'flight/user/register',{name:name,password:password,username:email,mobile:mobile,email:email,role:'USER',status:'1'})
        .then(response => {
          console.log(response);   
          console.log(response.data);  
          alert(response.data);
          if(response.data==='User Registration successfully')
          {
            history.push('/');
          }  
      }).catch(error => {
        if (error.response.status === 401) setError(error.response.data.message);
        else setError("Something went wrong. Please try again later.");
      }); 
	}
};

// Showing success message
const successMessage = () => {
	return (
	<div
		className="success"
		style={{
		display: submitted ? '' : 'none',
		}}>
		<h1>{msg}</h1>
	</div>
	);
};

// Showing error message if error is true
const errorMessage = () => {
	return (
	<div
		className="error"
		style={{
		display: error ? '' : 'none',
		}}>
		<h2>Please enter all the fields</h2>
	</div>
	);
};

return (
	<div className="form">
	<div>
		<h1>User Registration</h1>
	</div>

	{/* Calling to the methods */}
	<div className="messages">
		{errorMessage()}
		{successMessage()}
	</div>

	<form>
		{/* Labels and inputs for form data */}
		<label className="label">Name</label>
		<input onChange={handleName} className="input"
		value={name} type="text" />

		<label className="label">Email</label>
		<input onChange={handleEmail} className="input"
		value={email} type="email" />

        <label className="label">Mobile</label>
		<input onChange={handleMobile} className="input"
		value={mobile} type="mobile" />

		<label className="label">Password</label>
		<input onChange={handlePassword} className="input"
		value={password} type="password" />
		<br></br><br></br>
		<Button variant="success" onClick={handleSubmit}  type="submit">
		Submit
		</Button>
	</form>
	</div>
);
}
