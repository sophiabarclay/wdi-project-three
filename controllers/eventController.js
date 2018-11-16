// Sophia
const Event = require('../models/event');

function showRoute(req, res, next) {
  Event
    .findById(req.params.id)
    // .populate('createdBy comments.User')
    .then(event => res.json(event))
    .catch(next);
}

function createRoute(req, res, next) {
  Event
    .create(req.body)
    .then(event => res.json(event))
    .catch(next);
}

function deleteRoute(req, res, next) {
  Event
    .findByIdAndDelete(req.params.id)
    .then(() => res.sendStatus(204))
    .catch(next);
}

// Lucia
console.log('hello Sophia!');
