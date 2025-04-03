import React, { useState } from 'react';
import axios from 'axios';
import Male from './Male.png';
import Female from './Female.png';

function Students(props) {
  const [data, setData] = useState([]);
  const [loadedStudent, setLoadedStudent] = useState(false);
  const getdata2 = async () => {
    try{
      const response = await axios.post('http://localhost:5000/api/auth/getdata2', { standard: props.data.standard, division: props.data.division, roll_no: props.data.roll_no, room_no: props.data.room_no });
      console.log(response);
      setData(response.data);
    }
    catch(e){
      console.log("Error" + e)
    }
  }
  if(!loadedStudent)
  {
    setLoadedStudent(true);
    getdata2();
  }
  const student = data;
  return (
    <div style={{overflowY: "auto", scrollbarWidth: "none", maxHeight: "625px"}}>
      <h2 style={{marginBlock: "0px", maxHeight: "50px", backgroundColor: "#ee5", paddingBlock: "5px", width: "95%", marginInline: "auto", border: "2px solid #ee5", borderRadius: "10px 10px 0px 0px"}}>Class : {props.data.standard} - {props.data.division}</h2>
      <div className='student_grid'>
        { student && student.map(item => (
            <div className={`${item.gender?'boy':'girl'}_card`} key={item.roll_no}>
              <img src={item.gender?Male:Female} alt="Image" style={{width: "100px", height: "100px", borderRadius: "50px"}}/>
              <h5>Name :<br /> {item.firstName} <br /> {item.lastName}</h5>
              <h5>Roll number : {item.roll_no}</h5>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Students;