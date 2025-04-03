import React, { useState } from 'react';
import axios from 'axios'
import Male from './Male.png'
import Female from './Female.png'

function Settings(props) {
  // const [data, setData] = useState([]);
  return (
    <div style={{width: "100%", height: "100%", marginInline: "auto", marginBlock: "auto"}}>
      <div className={`${props.data.gender?'boy':'girl'}_card`} style={{width: "75%", height: "80%", marginInline: "auto", paddingTop: "auto", display: "flex", marginBlock: "auto"}}>
        <div style={{width: "70%", marginBlock: "auto", textAlign: "left", paddingLeft: "10%"}}>
          <h2>Name : {props.data.firstName} {" "} {props.data.lastName}</h2>
          <h2>Class : {props.data.standard} - {props.data.division} ({props.data.room_no})</h2>
          {props.log == "Student"?<h2>Roll number : {props.data.roll_no}</h2>:<></>}
          <h2>Attendance : {props.data.attendance}</h2>
          <h2>Address : Nowhere, Somewhere, Anywhere-000000</h2>
          <h2>Phone : 987654321</h2>
        </div>
        <div style={{width: "30%", division: "flex", flexDirection: "column", padding: "auto"}}>
          <img src={props.data.gender?Male:Female} alt="Image" style={{width: "150px", height: "150px", borderRadius: "150px", marginBlock: "auto"}}/>
        </div>
      </div>
    </div>
  );
}

export default Settings;
