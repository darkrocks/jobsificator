'use strict';

angular.module('presenter.top-menu-directive', [])
  .directive('topMenu', [function() {
    return {
      restrict: 'E',
    templateUrl: 'components/top-menu/top-menu.html'
  };
}]);