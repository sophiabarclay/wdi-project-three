import eventsIndexCtrl from '../controllers/events/indexCtrl';
import eventsNewCtrl from '../controllers/events/newCtrl';
import eventsShowCtrl from '../controllers/events/showCtrl';
import loginCtrl from '../controllers/loginCtrl';
import profileCtrl from '../controllers/profileCtrl';
import registerCtrl from '../controllers/registerCtrl';
import eventsEditCtrl from '../controllers/events/editCtrl';

// SB Flash
function secureRoute($auth, $state, Flash) {
  if (!$auth.isAuthenticated()) {
    Flash.create('info', 'Please log in');
    $state.go('login');
  }
}

function Router($urlRouterProvider, $stateProvider) {
  $stateProvider
    .state('home', {
      templateUrl: './views/home.html',
      url: '/'
    })
    .state('login', {
      templateUrl: './views/login.html',
      url: '/login',
      controller: loginCtrl
    })
    .state('register', {
      templateUrl: './views/register.html',
      url: '/register',
      controller: registerCtrl
    })
    .state('eventsIndex', {
      templateUrl: './views/events/index.html',
      url: '/events',
      controller: eventsIndexCtrl
    })
    .state('eventsNew', {
      url: '/events/new',
      templateUrl: './views/events/new.html',
      controller: eventsNewCtrl,
      resolve: { secureRoute }
    })
    .state('eventsEdit', {
      templateUrl: './views/events/edit.html',
      url: '/events/:id/edit',
      controller: eventsEditCtrl,
      resolve: { secureRoute }
    })
    .state('eventsShow', {
      templateUrl: './views/events/show.html',
      url: '/events/:id',
      controller: eventsShowCtrl
    })
    .state('profile', {
      templateUrl: './views/profile.html',
      url: '/profile/:id',
      controller: profileCtrl
    });

  $urlRouterProvider.otherwise('/');
}

export default Router;
