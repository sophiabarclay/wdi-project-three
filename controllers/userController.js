const User = require('../models/user');

function showRoute(req, res, next) {
  User
    .findById(req.params.id)
    // SB clickAttending
    .populate('eventsCreated', 'eventsAttending')
    .select('-password')
    .then(user => {
      res.json(user);
    })
    .catch(next);
}

module.exports = {
  showRoute: showRoute
};
