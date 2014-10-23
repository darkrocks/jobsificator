'use strict';

angular.module('presenter.top-menu.top-menu-directive', [])
  .directive('topMenu', [function() {
  return {
    restrict: 'E',
    templateUrl: 'components/top-menu/top-menu-directive.html',
    scope: {
      'addPresentationClick': '&onAddPresentationClick'
    }
};
}]);