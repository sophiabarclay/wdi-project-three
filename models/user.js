const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
  username: String,
  email: String,
  password: {type: String,
    validate: [
      {
        validator: (pwd) => pwd.match(/^(?=\w{8,})(?=.*\d)(?=.*[A-Z]+).*$/),
        message: '{VALUE} does not match all fields. Must contain uppercase, lowercase and numeric characters, as well as being at least 8 characters long.'
      }
    ]},
  image: String,
  isVenue: Boolean,
  address: String,
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

userSchema.set('toJSON', {
  virtuals: true
});

const userModel = mongoose.model('User', userSchema);
module.exports = userModel;
