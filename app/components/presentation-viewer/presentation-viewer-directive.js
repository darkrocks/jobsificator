/// <reference path="presentation-viewer-directive.html" />
'use strict';

angular.module('presenter.presentation-viewer.presentation-viewer-directive', [])
.constant('horisontalIndent', 300)
.constant('virticalIndent', 130)
.constant('svgAspectRatio', 1.7774)

	.directive('presentationViewer', ['horisontalIndent', 'virticalIndent', 'svgAspectRatio', function (horisontalIndent, virticalIndent, svgAspectRatio) {

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

	      scope.nextSlide = function() {
	        if (scope.currentSlideNumber + 1 > scope.presentation.slides.length) {
	          return;
	        }

	        scope.currentSlideNumber += 1;
	        setSlide();
	      };

	      scope.prevSlide = function () {
	        if (scope.currentSlideNumber - 1 < 1) {
	          return;
	        }

	        scope.currentSlideNumber -= 1;
	        setSlide();
	      };


	      fitSvgSize();
	      $(window).resize(fitSvgSize);

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


	      function fitSvgSize() {
	        var maxWidth = $(window).width() - horisontalIndent;
	        var maxHeight = $(window).height() - virticalIndent;

	        var svgWidth = maxWidth;
	        var svgHeight = maxHeight;
	        if (maxWidth / maxHeight > svgAspectRatio) {
	          svgWidth = maxHeight * svgAspectRatio;
	        } else {
	          svgHeight = maxWidth / svgAspectRatio;
	        }

	        $svg.attr('height', svgHeight);
	        $svg.attr('width', svgWidth);
	      }

	      function setSlide() {
	        fitSvgSize();
	        var $slideContent = $(scope.presentation.slides[scope.currentSlideNumber - 1]);
	        $svg.html($slideContent.html());
	      }

	    }
	  };
	}]);