const mongoose = require('mongoose');

const timeSuggestionSchema = new mongoose.Schema({
  suggestedBy: String,  // Optional for now; later we can use user info
  date: String,         // Format: 'YYYY-MM-DD'
  time: String          // Format: 'HH:mm'
});

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: String,
  date: String,
  cost: Number,
  description: String,
  rsvpDeadline: String,
  maxParticipants: Number,
  tags: [],
  isPublic: { type: Boolean, default: true },
  bannerImage: String,
  itinerary: [{
    day: String,
    activities: [{
      time: String,
      activity: String,
      location: String
    }]
  }],
  timeSuggestions: [timeSuggestionSchema] // Add this line
});   

module.exports = mongoose.model('Event', eventSchema);
