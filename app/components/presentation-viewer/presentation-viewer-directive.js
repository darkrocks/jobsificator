/// <reference path="presentation-viewer-directive.html" />
'use strict';

angular.module('presenter.presentation-viewer.presentation-viewer-directive', [])
	.directive('presentationViewer', [function () {
		return {
			restrict: 'E',
			templateUrl: 'components/presentation-viewer/presentation-viewer-directive.html',
			scope: {
				presentation: '='
			},
			link: function (scope, element, attrs) {
				scope.currentSlideNumber = 1;
				var $svg = $(element).find('svg');
			  
				scope.$watch("presentation", function (n, o) {
				  if (scope.presentation && scope.presentation.slides && scope.currentSlideNumber <= scope.presentation.slides.length && scope.currentSlideNumber >= 1) {
				    $svg.html(scope.presentation.slides[scope.currentSlideNumber - 1]);
				  }
				}, true);

				if (!scope.presentation) {
					return;
				}
				if (!scope.presentation || !scope.presentation.slides || !scope.presentation.slides.count) {
					throw Error('Wrong presentation format');
				}

				if (scope.currentSlideNumber > scope.presentation.slides.length || scope.currentSlideNumber < 1) {
					throw Error('Incurrect current slide number');
				}

				$svg.html(scope.presentation.slides[scope.currentSlideNumber - 1]);
			}
		};
	}]);