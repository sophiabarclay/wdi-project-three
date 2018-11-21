const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
  username: String,
  email: String,
  password: String,
  image: String,
  // eventsAttending: [String],
  isVenue: Boolean,
  openingHours: String
});

userSchema.pre('save', function() {
  this.password = bcrypt.hashSync(this.password, 8);
});

userSchema.methods.validatePassword = function(attemptedPassword) {
  return bcrypt.compareSync(attemptedPassword, this.password);
};

userSchema.virtual('eventsCreated', {
  ref: 'Event',
  localField: '_id',
  foreignField: 'createdBy'
});

userSchema.virtual('eventsAttending', {
  ref: 'Event',
  localField: '_id',
  foreignField: 'attendees'
});

// SB clickAttending
// userSchema.virtual('eventsAttending', {
//   ref: 'Event',
//   localField: '_id',
//   foreignField: 'attendees'
// });

userSchema.set('toJSON', {
  virtuals: true
});

const userModel = mongoose.model('User', userSchema);
module.exports = userModel;
