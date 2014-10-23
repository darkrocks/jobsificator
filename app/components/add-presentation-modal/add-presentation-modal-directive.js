'use strict';

angular.module('presenter.add-presentation-modal.add-presentation-modal-directive', ['ui.grid', 'presenter.data'])
  .constant("$", window.jQuery)
  .directive('addPresentationModal', ['$timeout', '$http','$log', 'presentationsData', function ($timeout, $http, $log, presentationsData) {
    return {
      restrict: 'E',
      scope: {
        visible: '=',
        closed: '&onClosed'
      },
      templateUrl: 'components/add-presentation-modal/add-presentation-modal-directive.html',
      link: function (scope, element, attrs) {
        scope.modalId = 'add-presentation-modal' + (new Date().getTime());

        var modalId = '#' + scope.modalId;
        scope.$watch("visible", function (n, o) {
          if (scope.visible) {
            $(modalId).modal('show');
          }
        }, true);

        $timeout(function () {
          $(modalId).on('hidden.bs.modal', function (e) {
            scope.closed();
          });
        });

        presentationsData.get().then(function(presentations) {
          scope.presentations = presentations;
        }, function(reason) {
          $log.error(reason);
        });

          scope.gridOptions = { data: 'presentations' };
      }
    };
  }]);