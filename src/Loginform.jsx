import React, { useState } from 'react';
import './App.css';
import { ReactNotifications, Store } from 'react-notifications-component';
import axios from 'axios';
import emailjs from '@emailjs/browser';

function LoginForm({ onLogin }) {
    const [username, setUsername] = useState('');
    const [logger, setLogger] = useState('');
    const [password, setPassword] = useState('changeme@123');
    const [changePassword, setChangePassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const service = 'service_wmb3lm7';
    const template = 'template_3irlf8c';
    const publicKey = 'LobN_SgvCm01_BoW_';
    const [otp, setOtp] = useState();
    const [count, setCount] = useState();
    let sendopt = 0;
    
    const sendEmail = () => {
        // setOtp(Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000);
        sendopt = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
        emailjs.send(service, template, {to_name: username, otp: sendopt, to: 'manv34081@gmail.com'}, publicKey)
            .then((response) => {
                console.log("Mail sent.");
                Store.addNotification({
                    title: "Mail sent!",
                    message: "Mail successfully sent to manv34081@gmail.com.",
                    type: "success",
                    insert: "top",
                    container: "top-center",
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    dismiss: {
                      duration: 5000,
                      onScreen: true
                    }
                });
            })
            .catch((error) => {
                console.error(error);
            })
        setOtp(sendopt);
    };

    const handleSubmit = (event) => {
        const change = async () => {
            try{
                if(logger === 'Student')
                {
                    const response = await axios.post("http://localhost:5000/api/auth/changestudentpassword", {username: username, password: confirmPassword});
                }
                else
                {
                    const response = await axios.post("http://localhost:5000/api/auth/changefacultypassword", {username: username, password: confirmPassword});
                }
                // if(response.data == true)
                // {
                //     Store.addNotification({
                //         title: "Success",
                //         message: "Password changed.",
                //         type: "success",
                //         insert: "top",
                //         container: "top-center",
                //         animationIn: ["animate__animated", "animate__fadeIn"],
                //         animationOut: ["animate__animated", "animate__fadeOut"],
                //         dismiss: {
                //           duration: 1000,
                //           onScreen: true
                //         }
                //     });
                // }
                // else
                // {
                //     Store.addNotification({
                //         title: "Error",
                //         message: "Cannot find user.",
                //         type: "danger",
                //         insert: "top",
                //         container: "top-center",
                //         animationIn: ["animate__animated", "animate__fadeIn"],
                //         animationOut: ["animate__animated", "animate__fadeOut"],
                //         dismiss: {
                //             duration: 1000,
                //             onScreen: true
                //         }
                //     });
                // }
            }
            catch(e){
                // Store.addNotification({
                //     title: "Error",
                //     message: "Error in changing password.",
                //     type: "danger",
                //     insert: "top",
                //     container: "top-center",
                //     animationIn: ["animate__animated", "animate__fadeIn"],
                //     animationOut: ["animate__animated", "animate__fadeOut"],
                //     dismiss: {
                //     duration: 1000,
                //     onScreen: true
                //     }
                // });
                alert("Catch");
                console.log(e);
            }
        };
        if(!changePassword)
        {
            event.preventDefault();
            onLogin(username, password, logger);
        }
        else if(otp != count)
        {
            alert("");
            Store.addNotification({
                title: "Error",
                message: "Wrong OTP.",
                type: "error",
                insert: "top",
                container: "top-center",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                  duration: 1000,
                  onScreen: true
                }
            });
            setOtp();
            setCount();
        }
        else if(password == confirmPassword)
        {
            change();
            setConfirmPassword('');
            setOtp();
            setCount();
            setChangePassword(false);
        }
        else
        {
            Store.addNotification({
                title: "Error!",
                message: "Entered passwords do not match.",
                type: "danger",
                insert: "left",
                container: "top-left",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                  duration: 1000,
                  onScreen: true
                }
              });
            setConfirmPassword('');
            setChangePassword(false);
        }
    };

    const handleChangePassword = () => {
        if(!changePassword)
            setChangePassword(true);
        else
            setChangePassword(false);
    }

    return (
        <>
        <ReactNotifications />
        <div className="form-popup" id="myForm">
            <form onSubmit={handleSubmit} className='form-container'>
                <h1 style={{margin: "0px", textAlign: "center", marginBottom: "5%"}}>Login</h1>
                <label htmlFor="username">Username</label>
                <input type="text" placeholder='Enter Id' id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                <label htmlFor="password">Password</label>
                <input type="password" placeholder='Enter password' id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                {changePassword && 
                    <>
                        <label htmlFor="confirmPassword">Confirm password</label>
                        <input type="password" placeholder='Confirm password' id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                        {otp > 1 &&
                            <>
                                <label htmlFor="count">Enter OTP</label>
                                <input type="password" placeholder='Enter OTP' id="count" onChange={(e) => setCount(e.target.value)} required />
                            </>
                        }
                        <button type='button' className='btn' onClick={sendEmail}>{sendopt == 0?'Send OTP':'Resend OTP'}</button>
                    </>
                }
                <div>
                    <label htmlFor="type" style={{marginRight: "10px"}}>Student</label>
                    <input type="radio" id="student" name='logger' value='Student' onChange={(e) => setLogger(e.target.value)} style={{marginRight: "5%"}} required />
                    <label htmlFor="type" style={{marginRight: "10px"}}>Faculty</label>
                    <input type="radio" id="faculty" name='logger' value='Faculty' onChange={(e) => setLogger(e.target.value)} required />
                </div>
                <button type="button" value="change_password" className='btn' onClick={handleChangePassword}>{changePassword? 'Cancel':'Change password'}</button>
                <button type="submit" value="Login" className='btn'>Submit</button>
            </form>
        </div>
        </>
    );
}

export default LoginForm;
