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

.controller('ViewerCtrl', ['$scope', function ($scope) {
	$scope.selectedPresentations = [];
	$scope.addPresentationModalVisible = 0;
  $scope.presentation = null;
	
  $scope.$watch('selectedPresentations', function (newValue, oldValue) {
	  if (newValue.length > 0) {
	  	$scope.presentation = newValue[0];
	  } else {
		  $scope.presentation = null;
	  }
  }, true);

  $scope.addPresentationClick = function () {
    $scope.addPresentationModalVisible = 1;
  };

  $scope.addPresentationModalClosed = function () {
    $scope.$apply(function() {
      $scope.addPresentationModalVisible = 0;
    });
  };
}]);