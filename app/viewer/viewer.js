'use strict';

angular.module('presenter.viewer', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'viewer/viewer.html',
    controller: 'ViewerCtrl'
  });

  $routeProvider.when('/viewer', {
    templateUrl: 'viewer/viewer.html',
    controller: 'ViewerCtrl'
  });
}])

.controller('ViewerCtrl', [function() {

}]);