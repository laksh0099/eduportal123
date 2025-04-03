import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
// import MuiAlert from '@material-ui/lab/Alert'
// import { Message, Notification } from 'rsuite';
// import 'rsuite/dist/rsuite.min.css'
import { ReactNotifications, Store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css'

const Dashboard = (props) => {
  const [events, setEvents] = useState([]);
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventId, setNewEventId] = useState('');
  const [newEventType, setNewEventType] = useState('');
  const [newEventDate, setNewEventDate] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://localhost:5000/api/auth/getevents');
        const fetchedEvents = response.data.map(event => ({
          id: event.id,
          title: event.title,
          date: new Date(event.dateAndTime),
          type: event.type,
        }));
        setEvents(fetchedEvents);
        setLoaded(true);
      } catch (error) {
        console.log("Error fetching events:", error);
      }
    };

    fetchData();
  }, []);

  // const Alert = (props) => {
  //   return (<MuiAlert elevation={6} variant='filled' {...props}></MuiAlert>);
  // }

  const addEvent = async () => {
    if (newEventTitle && newEventDate && newEventType) {
      const newEvent = {
        title: newEventTitle,
        date: newEventDate,
        type: newEventType
      };
      try {
        const response = await axios.post('http://localhost:5000/api/auth/setevents', {Title: newEventTitle, DateTime: newEventDate, Type: newEventType});
        if(response.data)
        {
          setEvents([...events, newEvent]);
          Store.addNotification({
            title: "Event added",
            message: "Your event was successfully added.",
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
        }
        else
          Store.addNotification({
            title: "Error",
            message: "Events of past or present cannot be set.",
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
      } catch (error) {
        console.log("Error fetching events:", error);
      }
      setNewEventTitle('');
      setNewEventDate(null);
      setNewEventType('');
    }
    else {
      // Alert.error('Please fill all the details');
      // Notification.open({title: 'Error', description: 'Please fill all the fields'});
      Store.addNotification({
        title: "Warning",
        message: "Please fill all the fields.",
        type: "warning",
        insert: "top",
        container: "top-center",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 1000,
          onScreen: true
        }
      });
      // {document.getElementsById('dashboard-form').appendChild(<Message type='error' className='alert' description={<p>'Sample alert message.'</p>} closable><p>This is a sample alert message.</p></Message>);}
    }
  };
  const deleteCalendarEvent = (id) => {
    setEvents(events => events.filter(item => item.id !== id))
  };
  const deleteEvent = async (id) => {
    setNewEventId(id);
    console.log(newEventId);
    if (newEventId) {
      const newEvent = {
        Id: newEventId,
      };
      try {
        const response = await axios.post('http://localhost:5000/api/auth/removeevents', { Id : newEventId});
        if(response.data){
          {events.map((event, i) => (
            <div
              index={i}
              key={event.id}
              title={event.title}
              date={event.date}
              type={event.type}
              handleDelete={deleteCalendarEvent(newEventId)}
            />
          ))}
        }
      } catch (error) {
        console.log("Error deleting events:", error);
      }
      setNewEventId('');
    }
  };

  const renderEventContent = (eventInfo) => {
    const handleDelete = () => {
      setNewEventId(eventInfo.event.id);
      deleteEvent(eventInfo.event.id);
    }
    return (
      <div style={{display: "flex", width: "fit-content"}}>
        {eventInfo.event.extendedProps.type == "Holiday" && <div style={{color: "white", backgroundColor: "green", borderRadius: "5px", paddingInline: "15px", height: "20px", marginRight: "5px"}}>{eventInfo.event.title}</div>}
        {eventInfo.event.extendedProps.type == "Exam" && <div style={{color: "white", backgroundColor: "red", borderRadius: "5px", paddingInline: "15px", height: "20px", marginRight: "5px"}}>{eventInfo.event.title}</div>}
        {eventInfo.event.extendedProps.type == "Submission" && <div style={{border: "1px solid blue", borderRadius: "5px", paddingInline: "15px", height: "20px", marginRight: "5px"}}>{eventInfo.event.title}</div>}
        {eventInfo.event.extendedProps.type == "Event" && <div style={{color: "white", backgroundColor: "blue", borderRadius: "5px", paddingInline: "15px", height: "20px", marginRight: "5px"}}>{eventInfo.event.title}</div>}
        {props.log == "Faculty" && <button onClick={handleDelete} style={{ backgroundColor: "#33333300", border: "none", height: "20px", marginTop: "0px", paddingBlock: "0px"}}><h6 style={{marginTop: "0px"}}>Delete event</h6></button>}
      </div>
    );
  };

  

  return (
    <div style={{position: 'relative', width: "100%", display: "block"}}>
      <ReactNotifications />
      {loaded ? (
        <div className='dashboard-main'>
          {/* <Alert severity='success'>Sample success message.</Alert>
          <Alert severity='error'>Sample error message.</Alert> */}
          {props.log == 'Faculty' && 
            <div style={{ height: "600px", paddingTop: "10%", width: "25%" }} id='dashboard-form'>
              {/* <Message type='error' className='alert' description={<p>'Sample alert message.'</p>} closable><p>This is a sample alert message.</p></Message> */}
                <input type="text" placeholder="Event Title" value={newEventTitle} onChange={(e) => setNewEventTitle(e.target.value)} required/>
                <DatePicker selected={newEventDate} onChange={(date) => setNewEventDate(date)} placeholderText="Select Date" className='custom-datepicker' required=''/><br />
                <select value={newEventType} onChange={(e) => setNewEventType(e.target.value)} style={{ height: "35px", width: "300px" }}>
                  <option value="none">None</option>
                  <option value="Holiday">Holiday</option>
                  <option value="Exam">Exam</option>
                  <option value="Event">Event</option>
                  <option value="Submission">Submission</option>
                </select>
                <button type='submit' onClick={addEvent}>Add Event</button><br /><br />
                {/* <div className="alert alert-danger alert-dismissible fade show" role="alert"> This is a danger alert—check it out! 
                  <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                 </button>
                </div> */}
            </div>
          }
          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView='dayGridMonth'
            weekends={true}
            events={events}
            eventContent={renderEventContent}
          />
        </div>
        ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default Dashboard;
