import React, { useState } from 'react';

const EventDetail = ({ event, onBack, onSuggestTime }) => {
  const [showSuggestionForm, setShowSuggestionForm] = useState(false);
  const [suggestion, setSuggestion] = useState({
    suggestedBy: '',
    date: '',
    time: ''
  });

  const handleSuggestionChange = (e) => {
    const { name, value } = e.target;
    setSuggestion({
      ...suggestion,
      [name]: value
    });
  };

  const handleSuggestionSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!suggestion.suggestedBy.trim() || !suggestion.date || !suggestion.time) {
      alert('All fields are required');
      return;
    }
    
    onSuggestTime(event._id, suggestion);
    
    // Reset form
    setSuggestion({
      suggestedBy: '',
      date: '',
      time: ''
    });
    
    setShowSuggestionForm(false);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not specified';
    
    // If it's already in YYYY-MM-DD format
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
    
    return dateString;
  };

  return (
    <div className="event-detail">
      <button className="secondary" onClick={onBack}>← Back to Events</button>
      
      <h2>{event.name}</h2>
      
      <div className="meta">
        {event.location && <p><strong>Location:</strong> {event.location}</p>}
        {event.date && <p><strong>Date:</strong> {formatDate(event.date)}</p>}
        {event.cost !== undefined && <p><strong>Cost:</strong> ${event.cost}</p>}
        {event.description && (
          <div>
            <strong>Description:</strong>
            <p>{event.description}</p>
          </div>
        )}
      </div>
      
      <div className="time-suggestions">
        <div className="actions">
          <button onClick={() => setShowSuggestionForm(!showSuggestionForm)}>
            {showSuggestionForm ? 'Cancel' : 'Suggest Time'}
          </button>
        </div>
        
        {showSuggestionForm && (
          <div className="suggestion-form">
            <h3>Suggest a Time</h3>
            <form onSubmit={handleSuggestionSubmit}>
              <div className="form-group">
                <label htmlFor="suggestedBy">Your Name *</label>
                <input
                  type="text"
                  id="suggestedBy"
                  name="suggestedBy"
                  value={suggestion.suggestedBy}
                  onChange={handleSuggestionChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="date">Date *</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={suggestion.date}
                  onChange={handleSuggestionChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="time">Time *</label>
                <input
                  type="time"
                  id="time"
                  name="time"
                  value={suggestion.time}
                  onChange={handleSuggestionChange}
                  required
                />
              </div>
              
              <button type="submit">Submit Suggestion</button>
            </form>
          </div>
        )}
        
        {event.timeSuggestions && event.timeSuggestions.length > 0 ? (
          <div className="suggestions-list">
            <h3>Time Suggestions</h3>
            {event.timeSuggestions.map((suggestion, index) => (
              <div key={index} className="suggestion-item">
                <p><strong>Suggested by:</strong> {suggestion.suggestedBy}</p>
                <p><strong>Date:</strong> {formatDate(suggestion.date)}</p>
                <p><strong>Time:</strong> {suggestion.time}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No time suggestions yet. Be the first to suggest a time!</p>
        )}
      </div>
    </div>
  );
};

export default EventDetail;