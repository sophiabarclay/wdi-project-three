const router = require('express').Router();
const env = require('../config/environment');
const eventController = require('../controllers/eventController');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const commentController = require('../controllers/commentsController');
const jwt = require('jsonwebtoken');


function secureRoute(req, res, next) {
  if (!req.headers.authorization)
    res.status(401).json({ message: 'unauthorised'});
  const token = req.headers.authorization.replace('Bearer ', '');
  jwt.verify(token, env.secret, function(err) {
    if (err) {
      res.status(401).json({ message: 'Unauthorised!' });
    } else {
      req.tokenUserId = jwt.decode(token).sub;
      next();
    }
  });
}

router.route('/register')
  .post(authController.registerRoute);

router.route('/login')
  .post(authController.loginRoute);

router.route('/events')
  .get(eventController.indexRoute)
  .post(secureRoute, eventController.createRoute);

router.route('/events/:id')
  .get(eventController.showRoute)
  .put(secureRoute, eventController.updateRoute)
  .delete(secureRoute, eventController.deleteRoute);

router.route('/events/:eventId/comments')
  .post(secureRoute, commentController.createRoute);

router.route('/events/:eventId/comments/:commentId')
  .delete(secureRoute, commentController.deleteRoute);

router.route('/users/:id')
  .get(userController.showRoute);

module.exports = router;
