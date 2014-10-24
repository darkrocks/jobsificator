'use strict';

angular.module('presenter.add-presentation-modal.add-presentation-modal-directive', ['ui.grid', 'ui.grid.selection', 'presenter.data'])
  .directive('addPresentationModal', ['$timeout', '$http', '$log', '_', 'presentationsData', function ($timeout, $http, $log, _, presentationsData) {
  	return {
  		restrict: 'E',
  		scope: {
  			visible: '=',
  			selectedPresentations: '=',
  			closed: '&onClosed'
  		},
  		templateUrl: 'components/add-presentation-modal/add-presentation-modal-directive.html',
  		link: function (scope, element, attrs) {
  			var selectedPresentationsDirty;
  			if (scope.selectedPresentations) {
  				selectedPresentationsDirty = angular.copy(scope.selectedPresentations);
  			}
  			else {
  				selectedPresentationsDirty = [];
  			}

  			scope.modalId = 'add-presentation-modal' + (new Date().getTime());

  			var modalId = '#' + scope.modalId;
  			scope.$watch("visible", function (n, o) {
  				if (scope.visible) {
  					$(modalId).modal('show');
  				} else {
  					$(modalId).modal('hide');
  				}
  			}, true);

  			$timeout(function () {
  				$(modalId).on('hidden.bs.modal', function (e) {

  					scope.closed();

  				});
  			});

  			scope.okClicked = function () {
  				scope.selectedPresentations = selectedPresentationsDirty;
  				scope.visible = 0;
  			};

  			scope.cancelClicked = function () {
  				selectedPresentationsDirty = scope.selectedPresentations;
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

  			scope.gridOptions.onRegisterApi = function (gridApi) {
  				scope.gridApi = gridApi;
  				gridApi.selection.on.rowSelectionChanged(scope, function (row) {
  					var entity = presentationsData.normalizeEntity(row.entity);
  					var found = _.findWhere(selectedPresentationsDirty, { id: entity.id });
  					if (!found && row.isSelected) {
  						selectedPresentationsDirty.push(entity);
  					}
  					else if (found && !row.isSelected) {
  						selectedPresentationsDirty.slice(entity);
  					}
  				});
  			};

  			presentationsData.getAll().then(function (presentations) {
  				scope.gridOptions.data = presentations;
  			}, function (reason) {
  				$log.error(reason);
  			});

  		}
  	};
  }]);