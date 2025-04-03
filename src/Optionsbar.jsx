import React from 'react';

function OptionsBar(props) {
  return (
    <div className="options-bar">
      <button onClick={() => props.setActiveSection('Dashboard')} >Calendar</button>
      {props.data == "Student" && <button onClick={() => props.setActiveSection('Students')} >Classmates</button>}
      <button onClick={() => props.setActiveSection('Teachers')} >Faculties</button>
      <button onClick={() => props.setActiveSection('Timetable')} >Time table</button>
      {props.data == "Student" && <button onClick={() => props.setActiveSection('Marks')} >Marks</button>}
      {props.data == "Faculty" && <button onClick={() => props.setActiveSection('Give_marks')} >Give marks</button>}
      <button onClick={() => props.setActiveSection('Settings')} >About me</button>
    </div>
  );
}

export default OptionsBar;
