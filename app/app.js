'use strict';

// Declare app level module which depends on views, and components
angular.module('jobsificator', [
    'ngRoute',
    'jobsificator.viewer',
    'jobsificator.top-menu',
    'jobsificator.add-presentation-modal',
    'jobsificator.presentation-viewer'
  ])
  .constant("$", window.jQuery)
  .constant("_", window._)
  .config([
    '$routeProvider', function($routeProvider) {
      $routeProvider.otherwise({ redirectTo: '/' });
    }
  ]);