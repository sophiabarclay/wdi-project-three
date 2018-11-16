const router = require('express').Router();
const env = require('../config/environment');
const eventController = require('../controllers/eventController');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const commentController = require('../controllers/commentController');
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
  .post(authController.register);

router.route('/login')
  .post(authController.login);

router.route('/events')
  .get(eventController.index)
  .post(eventController.create);

router.route('/events/:id')
  .get(eventController.show)
  .put(eventController.update)
  .delete(eventController.delete);

router.route('/events/:eventId/comments')
  .post(commentController.create);

router.route('/events/:eventId/comments/:commentId')
  .delete(commentController.delete);

router.route('/users/:id')
  .get(userController.show);

module.exports = router;
