'use strict';

angular.module('jobsificator.top-menu.top-menu-directive', [])
  .directive('topMenu', [
    function() {
      return {
        restrict: 'E',
        templateUrl: 'components/top-menu/top-menu-directive.html',
        scope: {
          'addPresentationClick': '&onAddPresentationClick',
          'closeAllClick': '&onCloseAllClick'
        }
      };
    }
  ]);