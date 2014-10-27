'use strict';

angular.module('jobsificator.add-presentation-modal.add-presentation-modal-directive', ['ui.grid', 'ui.grid.selection', 'jobsificator.data'])
  .directive('addPresentationModal', [
    '$timeout', '$http', '$log', '_', 'presentationsData', function($timeout, $http, $log, _, presentationsData) {
      return {
        restrict: 'E',
        scope: {
          visible: '=',
          selectedPresentations: '=',
          closed: '&onClosed',
          dataLoaded: '&onDataLoaded'
        },
        templateUrl: 'components/add-presentation-modal/add-presentation-modal-directive.html',
        link: function(scope, element, attrs) {
          var selectedPresentationsDirty;
          if (scope.selectedPresentations) {
            selectedPresentationsDirty = angular.copy(scope.selectedPresentations);
          } else {
            selectedPresentationsDirty = [];
          }

          scope.modalId = 'add-presentation-modal' + (new Date().getTime());

          var modalId = '#' + scope.modalId;
          scope.$watch("visible", function(n, o) {
            if (scope.visible) {
              $(modalId).modal('show');
            } else {
              $(modalId).modal('hide');
            }
          }, true);


          $timeout(function() {
            $(modalId).on('hidden.bs.modal', function(e) {

              scope.closed();

            });
          });

          scope.okClicked = function() {
            scope.selectedPresentations = selectedPresentationsDirty;
            scope.visible = 0;
          };

          scope.cancelClicked = function() {
            selectedPresentationsDirty = angular.copy(scope.selectedPresentations);
          };

          scope.gridOptions = {
            enableRowSelection: true,
            enableRowHeaderSelection: true,
            enableSelectAll: true,
            multiSelect: true
          };

          scope.gridOptions.columnDefs = [
            { name: 'id', visible: false },
            { name: 'name' },
            { name: 'slidesCount' },
            { name: 'slides', visible: false }
          ];

          scope.gridOptions.onRegisterApi = function(gridApi) {
            scope.gridApi = gridApi;

            scope.$watch("selectedPresentations", function(n, o) {
              if (scope.selectedPresentations) {
                selectedPresentationsDirty = angular.copy(scope.selectedPresentations);

                _.each(scope.gridOptions.data, function(row) {
                  var selectedPres = _.find(scope.selectedPresentations, function(selectedPresentation) { return selectedPresentation.id == row.id; });
                  if (selectedPres) {
                    gridApi.selection.selectRow(row);
                  } else {
                    gridApi.selection.unSelectRow(row);
                  }
                });
              }
            }, true);

            gridApi.selection.on.rowSelectionChanged(scope, function(row) {
              var entity = normalizeEntity(row.entity);
              var found = _.findWhere(selectedPresentationsDirty, { id: entity.id });
              if (!found && row.isSelected) {
                selectedPresentationsDirty.push(entity);
              } else if (found && !row.isSelected) {
                selectedPresentationsDirty = _.filter(selectedPresentationsDirty, function(selectedPresentation) { return selectedPresentation.id != entity.id; });
              }
            });
          };

          presentationsData.getAll().then(function(presentations) {
            scope.gridOptions.data = presentations;
            scope.dataLoaded();
          }, function(reason) {
            $log.error(reason);
          });

          function normalizeEntity(entity) {
            return {
              id: entity.id,
              name: entity.name,
              slides: entity.slides,
              slidesCount: entity.slidesCount
            };
          }

        }
      };
    }
  ]);