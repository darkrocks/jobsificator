/// <reference path="presentation-viewer-directive.html" />
'use strict';

angular.module('presenter.presentation-viewer.presentation-viewer-directive', [])
.constant('horisontalIndent', 345)
.constant('virticalIndent', 130)
.constant('svgAspectRatio', 1.7774)

	.directive('presentationViewer', ['$sce', 'horisontalIndent', 'virticalIndent', 'svgAspectRatio', function ($sce, horisontalIndent, virticalIndent, svgAspectRatio) {

	  return {
	    restrict: 'E',
	    templateUrl: 'components/presentation-viewer/presentation-viewer-directive.html',
	    scope: {
	      presentation: '=',
       close: '=onClose'
	    },
	    link: function (scope, element, attrs) {
	      scope.htmls = ['<p>one</p>', '<p>due</p>'];
	      scope.toTrusted = function(html) {
	       return $sce.trustAsHtml(html);
	      };
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

	      scope.setCurrentSlide = function (slideNumber) {
	        if (slideNumber < 1 || slideNumber > scope.presentation.slides.length) {
	          return;
	        }

	        scope.currentSlideNumber = slideNumber;
	        setSlide();
	      };

	      fitSizes();
	      $(window).resize(fitSizes);

	      scope.$watch("presentation", function (n, o) {
	        if (scope.presentation && scope.presentation.slides && scope.currentSlideNumber <= scope.presentation.slides.length && scope.currentSlideNumber >= 1) {
	          setSlide();
	        }
	      }, true);

	      if (!scope.presentation) {
	        return;
	      }
	      if (!scope.presentation || !scope.presentation.slides || !scope.presentation.slides.length) {
	        throw Error('Wrong presentation format');
	      }

	      if (scope.currentSlideNumber > scope.presentation.slides.length || scope.currentSlideNumber < 1) {
	        throw Error('Incurrect current slide number');
	      }

	      setSlide();


	      function fitSizes() {
         // svg
	        var maxWidth = $(window).width() - horisontalIndent;
	        var maxHeight = $(window).height() - virticalIndent;

	        var svgWidth = maxWidth;
	        var svgHeight = maxHeight;
	        if (maxWidth / maxHeight > svgAspectRatio) {
	          svgWidth = (maxHeight * svgAspectRatio);
	        } else {
	          svgHeight = (maxWidth / svgAspectRatio);
	        }

	        $svg.attr('height', svgHeight);
	        $svg.attr('width', svgWidth);

	        // sidebar
	        var $sidebar = $('.navigation-sidebar');
	        $sidebar.height(svgHeight + 43);

	        $(element).find('.presentation-viewer-navbar').width(svgWidth - 2);
	      }

	      function setSlide() {
	        fitSizes();
	        $svg.html(scope.presentation.slides[scope.currentSlideNumber - 1]);
	      }

	    }


	  };
	}]);