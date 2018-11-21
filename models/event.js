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

eventSchema.virtual('status')
  .get(function() {
    if(new Date() > this.date) return 'past';
    if(new Date() < this.date) return 'upcoming';
  });

eventSchema.set('toJSON', {
  virtuals: true
});

const eventModel = mongoose.model('Event', eventSchema);
module.exports = eventModel;

// attendedBy
