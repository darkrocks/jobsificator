'use strict';

angular.module('presenter.top-menu.add-presentation-modal', [])
  .directive('addPresentationModal', [function () {
    return {
      restrict: 'E',
      templateUrl: 'components/top-menu/add-presentation-modal.html'
    };
  }]);