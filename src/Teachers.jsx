import React from 'react';
import Male from './Male.png';
import Female from './Female.png';

function Teachers() {
  const student = [
    {
      Firstname: "Dilip",
      Lastname: "Joshi",
      Gender: true,
      id: 92
    },
    {
      Firstname: "Neha",
      Lastname: "Mehra",
      Gender: false,
      id: 82
    },
    {
      Firstname: "Supriya",
      Lastname: "Parekh",
      Gender: false,
      id: 28
    },
    {
      Firstname: "Jayesh",
      Lastname: "Parmar",
      Gender: true,
      id: 74
    }
  ];
  return (
    <div style={{overflowY: "auto", scrollbarWidth: "none", maxHeight: "575px"}}>
      <h2 style={{marginBlock: "0px", maxHeight: "50px", backgroundColor: "#f10", paddingBlock: "5px", width: "95%", marginInline: "auto", border: "2px solid #f10", borderRadius: "10px 10px 0px 0px"}}>Faculties</h2>
      <div className='faculty_grid'>
        { student && student.map(item => (
            <div className={`${item.Gender?'boy':'girl'}_card`} key={item.id}>
              <img src={item.Gender?Male:Female} alt="Image" style={{width: "100px", height: "100px", borderRadius: "50px"}}/>
              <h3>Name : {item.Firstname} {" "} {item.Lastname}</h3>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Teachers;
