const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
  title: String,
  artist: String,
  venue: String,
  address: String,
  date: Date,
  description: String,
  image: String,
  comments: [
    {
      text: String,
      user: { type: mongoose.Schema.ObjectId, ref: 'User' }
    }
  ],
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User' },
  attendees: [
    { type: mongoose.Schema.ObjectId, ref: 'User' }
  ]
});

const eventModel = mongoose.model('Event', eventSchema);
module.exports = eventModel;

// attendedBy
