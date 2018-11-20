const User = require('../models/user');
const Event = require('../models/event');
const jwt = require('jsonwebtoken');
const { secret } = require('../config/environment');
let token;
let userId;

function getTokenFromHttpRequest(req) {
  token = req.headers.authorization.replace('Bearer ', '');
  function retrieveUserIdFromToken(err, result) {
    userId = result.sub;
  }
  jwt.verify(token, secret, retrieveUserIdFromToken);
}


function indexRoute(req, res, next) {
  Event
    .findById(req.params.eventId)
    .populate('attendees')
    .then(event => res.json(event.attendees))
    .catch(next);
}

function createRoute(req, res, next) {
  getTokenFromHttpRequest(req);
  User
    .findById(userId)
    .then(() => {
      console.log('===========>', req.params.eventId);
      Event
        .findById(req.params.eventId)
        .then(event => {
          console.log('------------->', event);
          event.attendees.push(userId);
          return event.save();
        });
    })
    .then(user => {
      user.eventsAttending.push(req.params.eventId);
      return user.save();
    })
    .then(user => res.json(user))
    .catch(next);
}



module.exports = {
  indexRoute: indexRoute,
  createRoute: createRoute
};
