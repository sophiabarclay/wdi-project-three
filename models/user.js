const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
  username: String,
  email: String,
  password: String,
  image: String,
  eventsAttending: [String],
  isVenue: Boolean,
  address: String,
  openingHours: String
});

// userSchema.pre('save', function() {
//   this.password = bcrypt.hashSync(this.password, 8);
// });

// userSchema.methods.validatePassword = function(attemptedPassword) {
//   return bcrypt.compareSync(attemptedPassword, this.password);
// };

const userModel = mongoose.model('User', userSchema);
module.exports = userModel;
