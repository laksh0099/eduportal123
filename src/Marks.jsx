import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Marks(props) {
  const [data, setData] = useState([]);
  const [loadedmarks, setLoadedmarks] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://localhost:5000/api/auth/getmarks', { username: props.user, password: props.pass });
        setData(response.data);
        console.log(data);
      } catch (error) {
        console.log("Error fetching marks:", error);
      }
    };

    if (!loadedmarks) {
      setLoadedmarks(true);
      fetchData();
    }
  }, [loadedmarks, props.user, props.pass]);

  if (!data || data.length === 0) {
    return (
      <div>
          <h2 style={{marginTop: "0px", backgroundColor: "#05a", border: "2px solid #05a", borderRadius: "10px 10px 0px 0px"}}>You have not given any test</h2>
      </div>
    );
  }

  return (
    <div className="marks-container">
        <h2 style={{marginTop: "0px", backgroundColor: "#05a", border: "2px solid #05a", borderRadius: "10px 10px 0px 0px"}}>Marks</h2>
        {data.map((marks, ind) => (
        <div key = {ind}>
            <h2>Standard: {marks.standard}</h2>
            <table style={{width: "95%", marginInline: "auto"}}>
                <thead>
                <tr>
                    <th>Subject</th>
                    <th>Marks</th>
                </tr>
                </thead>
                <tbody>
                {Object.keys(marks).map((subject, index) => (
                  (
                    (subject == "id" || subject == "studentId" || subject == "standard") ? null :
                      <tr key={index}>
                        <td>{subject.toUpperCase()}</td>
                        <td>{marks[subject]}</td>
                      </tr>
                  )
                ))}
                </tbody>
            </table>
        </div>
        ))}
    </div>
  );
}

export default Marks;
