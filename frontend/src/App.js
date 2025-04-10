import React, { useState, useEffect } from 'react';
import './App.css';
import EventList from './components/EventList';
import EventForm from './components/EventForm';
import EventDetail from './components/EventDetail';

function App() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const API_URL = 'http://localhost:5000/api/events';

  // Fetch all events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_URL);
        
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        
        const data = await response.json();
        setEvents(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch events. Is the server running?');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Create new event
  const handleCreateEvent = async (eventData) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const newEvent = await response.json();
      setEvents([...events, newEvent]);
      setShowForm(false);
      setError(null);
    } catch (err) {
      setError('Failed to create event');
      console.error(err);
    }
  };

  // Suggest time for an event
  const handleSuggestTime = async (eventId, timeData) => {
    try {
      const response = await fetch(`${API_URL}/${eventId}/suggest-time`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(timeData),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const updatedEvent = await response.json();
      
      // Update events list with the updated event
      setEvents(events.map(event => 
        event._id === updatedEvent._id ? updatedEvent : event
      ));
      
      // Update selectedEvent if it's the one being updated
      if (selectedEvent && selectedEvent._id === updatedEvent._id) {
        setSelectedEvent(updatedEvent);
      }
      
      setError(null);
    } catch (err) {
      setError('Failed to suggest time');
      console.error(err);
    }
  };

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
  };

  const handleBackToList = () => {
    setSelectedEvent(null);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>PlanIt</h1>
        <p>Plan your events with ease!</p>
      </header>

      <main className="App-main">
        {error && <div className="error-message">{error}</div>}
        
        {!selectedEvent ? (
          <>
            <div className="actions">
              <button onClick={() => setShowForm(!showForm)}>
                {showForm ? 'Cancel' : 'Create New Event'}
              </button>
            </div>

            {showForm && <EventForm onSubmit={handleCreateEvent} />}

            {loading ? (
              <p>Loading events...</p>
            ) : (
              <EventList events={events} onSelectEvent={handleSelectEvent} />
            )}
          </>
        ) : (
          <EventDetail 
            event={selectedEvent} 
            onBack={handleBackToList} 
            onSuggestTime={handleSuggestTime}
          />
        )}
      </main>
    </div>
  );
}

export default App;