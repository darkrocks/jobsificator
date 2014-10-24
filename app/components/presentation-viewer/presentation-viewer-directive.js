/// <reference path="presentation-viewer-directive.html" />
'use strict';

angular.module('presenter.presentation-viewer.presentation-viewer-directive', [])
.constant('controlPanelHeight', 50)
.constant('aspectRatio', 1.3333)
	.directive('presentationViewer', ['controlPanelHeight', 'aspectRatio', function (controlPanelHeight, aspectRatio) {

		return {
			restrict: 'E',
			templateUrl: 'components/presentation-viewer/presentation-viewer-directive.html',
			scope: {
			  presentation: '=',
			  viewerHeight: '='
			},
			link: function (scope, element, attrs) {
				scope.currentSlideNumber = 1;
				var $svg = $(element).find('svg');

				function setSlide() {
				  var $slideContent = $(scope.presentation.slides[scope.currentSlideNumber - 1]);
				  var slideHeight = scope.viewerHeight - controlPanelHeight;
				  var slideWidth = slideHeight * aspectRatio;
				  $svg.attr('height', slideHeight);
				  $svg.attr('width', slideWidth);
				  
				  $svg.html($slideContent.html());
			    
			  }

			  scope.$watch("presentation", function (n, o) {
				  if (scope.presentation && scope.presentation.slides && scope.currentSlideNumber <= scope.presentation.slides.length && scope.currentSlideNumber >= 1) {
				    setSlide();
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

				setSlide();
			}
		};
	}]);