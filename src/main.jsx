import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
import App from './App.jsx'
// import { NavBar, Options } from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'

// const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <Options /> */}
    {/* <NavBar /> */}
    <App />
  </React.StrictMode>,
  // <BrowserRouter basename="/localhost:5173">
  //   <App />
  // </BrowserRouter>
)
