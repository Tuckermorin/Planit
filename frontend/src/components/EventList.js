import React from 'react';

const EventList = ({ events, onSelectEvent }) => {
  if (events.length === 0) {
    return <p>No events found. Create a new event to get started!</p>;
  }

  return (
    <div className="event-list">
      {events.map(event => (
        <div 
          key={event._id} 
          className="event-card"
          onClick={() => onSelectEvent(event)}
        >
          <h3>{event.name}</h3>
          {event.location && <p><strong>Location:</strong> {event.location}</p>}
          {event.date && <p><strong>Date:</strong> {event.date}</p>}
          {event.cost !== undefined && <p><strong>Cost:</strong> ${event.cost}</p>}
          
          {event.timeSuggestions && event.timeSuggestions.length > 0 && (
            <p><strong>Time suggestions:</strong> {event.timeSuggestions.length}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default EventList;