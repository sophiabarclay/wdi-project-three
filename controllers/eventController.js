// Sophia
console.log('hello lucia!!!!');

// Lucia
function indexRoute(req, res, next) {
  Event
    .find()
    .then(events =>
      res.json(events))
    .catch(next);
}

function updateRoute(req, res, next) {
  Event.findById(req.params.id)
    .then(event => event.set(req.body))
    .then(event => event.save())
    .then(event => res.json(event))
    .catch(next);
}

module.exports = {
  index: indexRoute,
  show: showRoute,
  create: createRoute,
  update: updateRoute,
  delete: deleteRoute
};
