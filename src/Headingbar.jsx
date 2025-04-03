import React from 'react';
import './App.css';
import { ReactNotifications, Store } from 'react-notifications-component';

function HeadingBar({ username, login, onLogout }) {
  return (
    <div className="header" style={{backgroundColor: "#333", height: "7%", display: "flex"}}>
      <ReactNotifications />
      <h2 style={{color: "white", marginLeft: "5%", marginRight: "auto", marginTop: "auto", marginBottom: "auto"}}>Eduportal</h2>
      {login &&
        <div style={{backgroundColor: "#444", borderRadius: "10px", padding: "0px", marginTop: "auto", marginBottom: "auto", marginRight: "5%", display: "flex", height: "80%", maxWidth: "25%"}}>
          <h3 className="username">{username}</h3>
          <button onClick={onLogout} style={{color: "white", backgroundColor: "#e22", height: "100%", border: "none", paddingBlock: "0px"}}>
            <h3 style={{marginBlock: "0%", padding: "0px"}}>Logout</h3>
          </button>
        </div>
      }
      {/* {!username && <h3 className='username'>Login</h3>} */}
    </div>
  );
}

export default HeadingBar;
