const Event = require('../models/event');

function indexRoute(req, res, next) {
  Event
    .find()
    .then(events =>
      res.json(events))
    .catch(next);
}

function showRoute(req, res, next) {
  Event
    .findById(req.params.id)
    // .populate('createdBy comments.user')
    .then(event => res.json(event))
    .catch(next);
}

function createRoute(req, res, next) {
  Event
    .create(req.body)
    .then(event => res.json(event))
    .catch(next);
}

function updateRoute(req, res, next) {
  Event
    .findById(req.params.id)
    .then(event => event.set(req.body))
    .then(event => event.save())
    .then(event => res.json(event))
    .catch(next);
}

function deleteRoute(req, res, next) {
  Event
    .findByIdAndDelete(req.params.id)
    .then(() => res.sendStatus(204))
    .catch(next);
}

module.exports = {
  index: indexRoute,
  show: showRoute,
  create: createRoute,
  update: updateRoute,
  delete: deleteRoute
};
