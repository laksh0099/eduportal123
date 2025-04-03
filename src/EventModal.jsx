import React from 'react';
import Modal from 'react-modal';

const EventModal = ({ isOpen, onClose, date, events }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Event Details Modal"
      ariaHideApp={false} // This is important to prevent the app from being hidden by the modal
    >
      <h2>Events on {date}</h2>
      {events.map((event, index) => (
        <div key={index}>
          <p>{event.title}</p>
          <button onClick={() => handleDelete(event.id)}>Delete</button>
        </div>
      ))}
      <button onClick={onClose}>Close</button>
    </Modal>
  );
};

export default EventModal;
