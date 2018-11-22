import angular from 'angular';
import '@uirouter/angularjs';
import 'angular-flash-alert';
import 'angular-flash-alert/dist/angular-flash.min.css';
import Router from './config/router';
import 'satellizer';
import 'bulma';
import './scss/main.scss';
import mainCtrl from './controllers/mainCtrl';

angular.module('GigHub', ['ui.router', 'satellizer', 'ngFlash'])
  .config(Router)
  .controller('mainCtrl', mainCtrl)
  .config(function($authProvider) {
    $authProvider.signupUrl = '/api/register';
    $authProvider.loginUrl = '/api/login';
  });
