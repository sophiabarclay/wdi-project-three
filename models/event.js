const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
  title: String,
  artist: String,
  venue: String,
  date: Date,
  description: String,
  image: String,
  usersAttending: [String],
  comments: [
    {
      text: String,
      user: { type: mongoose.Schema.ObjectId, ref: 'User' }
    }
  ],
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User' }
});

// NOTE: Virtuals yet to do

const eventModel = mongoose.model('Event', eventSchema);
module.exports = eventModel;
