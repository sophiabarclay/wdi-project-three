// const User = require('../models/user');
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
  Event
    .findById(req.params.eventId)
    .then(event => {
      event.attendees.push(userId);
      return event.save();
    })
    .then(event => res.json(event))
    .catch(next);
}

module.exports = {
  indexRoute: indexRoute,
  createRoute: createRoute
};
