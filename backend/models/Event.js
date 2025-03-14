const mongoose = require('mongoose');

const timeSuggestionSchema = new mongoose.Schema({
  suggestedBy: String,  // Optional for now; later we can use user info
  date: String,         // Format: 'YYYY-MM-DD'
  time: String          // Format: 'HH:mm'
});

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: String,
  date: String,        // Event date
  cost: Number,
  timeSuggestions: [timeSuggestionSchema]
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);
