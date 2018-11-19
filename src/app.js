import angular from 'angular';
import '@uirouter/angularjs';
import Router from './config/router';
import 'satellizer';
import 'bulma';
import './scss/main.scss';
import mainCtrl from './controllers/mainCtrl';

angular.module('yourAppName', ['ui.router', 'satellizer'])
  .config(Router)
  .controller('mainCtrl', mainCtrl)
  .config(function($authProvider) {
    $authProvider.signupUrl = '/api/register';
    $authProvider.loginUrl = '/api/login';
  });
