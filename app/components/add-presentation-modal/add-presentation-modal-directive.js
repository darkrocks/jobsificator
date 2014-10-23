﻿'use strict';

angular.module('presenter.add-presentation-modal.add-presentation-modal-directive', ['ui.grid'])
  .constant("$", window.jQuery)
  .directive('addPresentationModal', ['$timeout', function ($timeout) {
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

        $timeout(function() {
          $(modalId).on('hidden.bs.modal', function (e) {
            scope.closed();
          });
        });

        scope.myData = [{ name: "Moroni", age: 50 },
                    { name: "Tiancum", age: 43 },
                    { name: "Jacob", age: 27 },
                    { name: "Nephi", age: 29 },
                    { name: "Enos", age: 34 }];
        scope.gridOptions = { data: 'myData' };
      }
    };
  }]);