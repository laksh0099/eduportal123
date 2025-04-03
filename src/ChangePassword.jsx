import React, { useState } from 'react';
import './App.css';
import axios from 'axios';
import { ReactNotifications, Store } from 'react-notifications-component';

function LoginForm({ onLogin }) {
    const [username, setUsername] = useState('');
    const [logger, setLogger] = useState('');
    const [password, setPassword] = useState('changeme@123');
    

    const handleSubmit = (event) => {
        event.preventDefault();
        onLogin(username, password, logger);
    };

    return (
        <div className="form-popup" id="myForm">
            <form onSubmit={handleSubmit} className='form-container'>
                <ReactNotifications />
                <h1 style={{margin: "0px", textAlign: "center", marginBottom: "10%"}}>Login</h1>
                <label htmlFor="    username">Username</label>
                <input type="text" placeholder='Enter Id' id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                <label htmlFor="password">Password</label>
                <input type="password" placeholder='Enter password' id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <label htmlFor="type">Student</label>
                <input type="radio" id="student" name='logger' value='Student' onChange={(e) => setLogger(e.target.value)} style={{marginRight: "5%"}} required />
                <label htmlFor="type">Faculty</label>
                <input type="radio" id="faculty" name='logger' value='Faculty' onChange={(e) => setLogger(e.target.value)} required />
                <button type="button" value="change_password" className='btn'>Change password</button>
                <button type="submit" value="Login" className='btn'>Submit</button>
            </form>
        </div>
    );
}

export default LoginForm;