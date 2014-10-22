'use strict';

// Declare app level module which depends on views, and components
angular.module('presenter', [
  'ngRoute',
  'presenter.viewer',
  'presenter.view2',
  'presenter.version',
  'presenter.top-menu'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/'});
}]);
