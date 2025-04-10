import React, { useState } from 'react';

const EventForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    date: '',
    cost: '',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'cost' ? (value === '' ? '' : Number(value)) : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name.trim()) {
      alert('Event name is required');
      return;
    }
    
    // Convert empty string cost to 0 for submission
    const submissionData = {
      ...formData,
      cost: formData.cost === '' ? 0 : formData.cost
    };
    
    onSubmit(submissionData);
    
    // Reset form
    setFormData({
      name: '',
      location: '',
      date: '',
      cost: '',
      description: ''
    });
  };

  return (
    <div className="event-form">
      <h2>Create New Event</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Event Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="cost">Cost ($)</label>
          <input
            type="number"
            id="cost"
            name="cost"
            value={formData.cost}
            onChange={handleChange}
            min="0"
            step="0.01"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
          />
        </div>
        
        <button type="submit">Create Event</button>
      </form>
    </div>
  );
};

export default EventForm;