'use strict';

// Declare app level module which depends on views, and components
angular.module('presenter', [
  'ngRoute',
  'presenter.view1',
  'presenter.view2',
  'presenter.version',
  'presenter.top-menu-directive'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/view1'});
}]);
