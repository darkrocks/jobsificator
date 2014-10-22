'use strict';

angular.module('presenter.top-menu.top-menu-directive', ['presenter.top-menu.add-presentation-modal'])
  .directive('topMenu', [function() {
    return {
      restrict: 'E',
    templateUrl: 'components/top-menu/top-menu.html'
  };
}]);