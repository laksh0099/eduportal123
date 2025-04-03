import React, { useState } from "react";
import axios from "axios";
import { ReactNotifications, Store } from "react-notifications-component";
import 'react-notifications-component/dist/theme.css'

const Give_marks = (props) => {
    const [student, setStudent] = useState('');
    const [standard, setStandard] = useState(1);
    const [maths, setMaths] = useState(1);
    const [science, setScience] = useState(1);
    const [english, setEnglish] = useState(1);
    const [ss, setSs] = useState(1);
    const [hindi, setHindi] = useState(1);
    const [gujarati, setGujarati] = useState(1);
    const [pe, setPe] = useState(1);
    const [extra, setExtra] = useState(1);
    
    const enterMarks = async(event) => {
        event.preventDefault();
        if(Number(standard) > 12 || Number(standard) < 1 ||
            Number(maths) > 100 || Number(maths) < 0 ||
            Number(science) > 100 || Number(science) < 0 ||
            Number(english) > 100 || Number(english) < 0 ||
            Number(ss) > 100 || Number(ss) < 0 ||
            Number(hindi) > 100 || Number(hindi) < 0 ||
            Number(gujarati) > 100 || Number(gujarati) < 0 ||
            Number(pe) > 100 || Number(pe) < 0 ||
            Number(extra) > 100 || Number(extra) < 0)
            alert('Please enter valid details');
        else{
            try{
                const response = await axios.post('http://localhost:5000/api/auth/setmarks', {
                    studentId: student,
                    standard: Number(standard),
                    maths: Number(maths),
                    science: Number(science),
                    english: Number(english),
                    sS: Number(ss),
                    hindi: Number(hindi),
                    pE: Number(pe),
                    extra: Number(extra)
                });
                if(response.data == true)
                    Store.addNotification({
                        title: "Success",
                        message: "Marks entered successfully.",
                        type: "success",
                        insert: "top",
                        container: "top-center",
                        animationIn: ["animate__animated", "animate__fadeIn"],
                        animationOut: ["animate__animated", "animate__fadeOut"],
                        dismiss: {
                          duration: 1000,
                          onScreen: true
                        }
                      });
                else
                    Store.addNotification({
                        title: "Failed",
                        message: "Error entering marks.",
                        type: "danger",
                        insert: "top",
                        container: "top-center",
                        animationIn: ["animate__animated", "animate__fadeIn"],
                        animationOut: ["animate__animated", "animate__fadeOut"],
                        dismiss: {
                        duration: 1000,
                        onScreen: true
                        }
                    });
            }
            catch(e){
                console.log("Error:" + e);
            }
        }
    }

    return (
        <div>
            {props.data.hod && 
            <div className="form-popup" id="myForm" style={{margin: "0%", overflowY: "scroll", scrollbarWidth: "none"}}>
                <ReactNotifications />
                <h2 style={{margin: "0px", textAlign: "center", marginBottom: "0%", backgroundColor: "#05a", width: "30%", marginInline: "auto", border: "2px solid #05a", borderRadius: "10px 10px 0px 0px", padding: "10px"}}>Marks form</h2>
                <form onSubmit={enterMarks} className='form-con'>
                    <label htmlFor="student">Student ID</label>
                    <input type="text" placeholder='Enter Id' id="student" value={student} onChange={(e) => setStudent(e.target.value)} required />
                    <label htmlFor="standard">Standard</label>
                    <input type="text" placeholder='Enter standard' id="standard" value={standard} onChange={(e) => setStandard(e.target.value)} required />
                    <label htmlFor="maths">Maths</label>
                    <input type="number" placeholder='Enter marks' id="maths" value={maths} onChange={(e) => setMaths(e.target.value)} required />
                    <label htmlFor="science">Science</label>
                    <input type="number" placeholder='Enter marks' id="science" value={science} onChange={(e) => setScience(e.target.value)} required />
                    <label htmlFor="english">English</label>
                    <input type="number" placeholder='Enter marks' id="english" value={english} onChange={(e) => setEnglish(e.target.value)} required />
                    <label htmlFor="ss">Social Science</label>
                    <input type="number" placeholder='Enter marks' id="ss" value={ss} onChange={(e) => setSs(e.target.value)} required />
                    <label htmlFor="hindi">Hindi</label>
                    <input type="number" placeholder='Enter marks' id="hindi" value={hindi} onChange={(e) => setHindi(e.target.value)} required />
                    <label htmlFor="gujarati">Gujarati</label>
                    <input type="number" placeholder='Enter marks' id="gujarati" value={gujarati} onChange={(e) => setGujarati(e.target.value)} required />
                    <label htmlFor="pe">Physical education</label>
                    <input type="number" placeholder='Enter marks' id="pe" value={pe} onChange={(e) => setPe(e.target.value)} required />
                    <label htmlFor="extra">Extra</label>
                    <input type="number" placeholder='Enter marks' id="extra" value={extra} onChange={(e) => setExtra(e.target.value)} required />
                    <div />
                    <div>
                        <button type="submit" value="Login" className='btn' style={{backgroundColor: "#05a"}}>Submit</button>
                    </div>
                </form>
            </div>
            }
            {!props.data.hod && 
            <div>
                <h2 style={{backgroundColor: "#05a", borderRadius: "10px", width: "50%", marginInline: "auto"}}>Only H.O.D. can give marks.</h2>
            </div>
            }
        </div>
    );
}

export default Give_marks;