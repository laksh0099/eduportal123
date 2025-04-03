import React, { useState, useEffect } from 'react';
import axios from 'axios';

const times = [
  '07:00 - 08:00',
  '08:00 - 09:00',
  '09:00 - 10:00', // Break time will be added here
  '10:00 - 11:00',
  '11:00 - 12:00'
];

function Timetable(props) {
  const [data, setData] = useState([]);
  const [loadedtt, setLoadedtt] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        let response;
        if(props.log === 'Student')
          response = (await axios.post('http://localhost:5000/api/auth/getstt', { standard: props.data.standard, division: props.data.division, roll_no: props.data.roll_no, room_no: props.data.room_no }));
        else
          response = (await axios.post('http://localhost:5000/api/auth/getftt', { username: props.user, password: props.pass }));
        console.log(response.data);
        setData(response.data);
      } catch (e) {
        console.log("Error" + e);
      }
    };
    if (!loadedtt) {
      setLoadedtt(true);
      getData();
    }
  }, [loadedtt, props.user, props.pass, props.log, props.data]);

  console.log(data);
  if (!data || Object.keys(data).length === 0) {
    return <div>Loading...</div>;
  }

  const weekdays = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
  const timetableData = data[0]; // Assuming you need to access the first element of the data array

  return (
    <div className="timetable-container">
      <h2 style={{height: "40px", margin: "0px", backgroundColor: "#04aa6d", borderRadius: "10px 10px 0px 0px"}}>Timetable</h2>
      <table>
        <thead>
          <tr>
            <th>Time</th>
            {weekdays.map(day => (
              <th key={day}>{day.charAt(0).toUpperCase() + day.slice(1)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {times.map((time, rowIndex) => (
            <tr key={rowIndex}>
              <td>{time}</td>
              {weekdays.map((day, colIndex) => (
                <td key={colIndex}>
                  {time === '09:00 - 10:00' ? ('Break') : (
                    timetableData[day] && timetableData[day][rowIndex > 2 ? rowIndex - 1 : rowIndex] && (
                      <>
                        {timetableData[day][rowIndex > 2 ? rowIndex - 1 : rowIndex].subject}
                        <br />
                        {props.log === "Student" && timetableData[day][rowIndex > 2 ? rowIndex - 1 : rowIndex].teacher && (
                          <h4>{timetableData[day][rowIndex > 2 ? rowIndex - 1 : rowIndex].teacher}</h4>
                        )}
                        {props.log === "Faculty" && timetableData[day][rowIndex > 2 ? rowIndex - 1 : rowIndex].roomNumber && (
                          <h4>{timetableData[day][rowIndex > 2 ? rowIndex - 1 : rowIndex].roomNumber}</h4>
                        )}
                        {props.log === "Faculty" && timetableData[day][rowIndex > 2 ? rowIndex - 1 : rowIndex].class && (
                          <h4>{timetableData[day][rowIndex > 2 ? rowIndex - 1 : rowIndex].class}</h4>
                        )}
                      </>
                    )
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Timetable;
