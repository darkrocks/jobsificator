/// <reference path="presentation-viewer-directive.html" />
'use strict';

angular.module('presenter.presentation-viewer.presentation-viewer-directive', [])
  .constant('horisontalIndent', 345)
  .constant('virticalIndent', 130)
  .constant('fullscreenHorisontalIndent', 50)
  .constant('fullscreenVirticalIndent', 50)
  .constant('svgAspectRatio', 1.7774)
  .directive('presentationViewer', [
    '$sce', 'horisontalIndent', 'virticalIndent', 'fullscreenHorisontalIndent', 'fullscreenVirticalIndent', 'svgAspectRatio', function ($sce, horisontalIndent, virticalIndent, fullscreenHorisontalIndent, fullscreenVirticalIndent, svgAspectRatio) {
      return {
        restrict: 'E',
        templateUrl: 'components/presentation-viewer/presentation-viewer-directive.html',
        scope: {
          presentation: '=',
          close: '=onClose'
        },
        link: function (scope, element, attrs) {
          var $mainSvg = $(element).find('.main-svg');
          var $fullscreenControlPanel = $(element).find('.fullscreen-control-panel');
          scope.currentSlideNumber = 1;
          scope.isFullscreenMode = false;
          scope.prevButtonDisabled = false;
          scope.nextButtonDisabled = false;

 
          fitSize();
          $(window).resize(function () {
            if (scope.isFullscreenMode) {
              fitSizeFullscreen();
            } else {
              fitSize();
            }
          });

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

          scope.toggleFullscreenMode = function () {
            if (scope.isFullscreenMode) {
              stopFullScreenMode();
            } else {
              startFullScreenMode();
            }
          };

          function startFullScreenMode() {
            $mainSvg.attr('class', function (index, classNames) {
              return classNames + ' show-on-fullscreen';
            });

            $fullscreenControlPanel.addClass('show-on-fullscreen');
            $fullscreenControlPanel.find('*').addClass('show-on-fullscreen');

            $mainSvg.css('position', 'absolute');

            $("*").not('.show-on-fullscreen').addClass('hide-on-fullscreen');
            fullScreenOn();
            fitSizeFullscreen();
            window.scrollTo(0, 0);

            document.onkeydown = function (event) {
              scope.$apply(function () {
                switch (event.which) {
                  // left
                  case 37:
                    // down
                  case 40:
                    scope.prevSlide();
                    break;
                    // right
                  case 39:
                    // up
                  case 38:
                    scope.nextSlide();
                    break;
                    // esc
                  case 27:
                    stopFullScreenMode();
                    break;

                };
              });
            };
            scope.isFullscreenMode = true;
          };

          function stopFullScreenMode() {
            $mainSvg.attr('class', function (index, classNames) {
              return classNames.replace('show-on-fullscreen', '');
            });

            $fullscreenControlPanel.removeClass('show-on-fullscreen');
            $fullscreenControlPanel.find('*').removeClass('show-on-fullscreen');

            $mainSvg.css('position', 'relative');

            $("*").removeClass('hide-on-fullscreen');
            fullScreenOff();
            fitSize();
            window.scrollTo(0, 0);
            scope.isFullscreenMode = false;
            document.onkeydown = null;
          };

          function fullScreenOn() {
            if (!document.fullscreenElement &&
              !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
              if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
              } else if (document.documentElement.msRequestFullscreen) {
                document.documentElement.msRequestFullscreen();
              } else if (document.documentElement.mozRequestFullScreen) {
                document.documentElement.mozRequestFullScreen();
              } else if (document.documentElement.webkitRequestFullscreen) {
                document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
              }
            }
          };

          function fullScreenOff() {
            if (document.exitFullscreen) {
              document.exitFullscreen();
            } else if (document.msExitFullscreen) {
              document.msExitFullscreen();
            } else if (document.mozCancelFullScreen) {
              document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
              document.webkitExitFullscreen();
            }
          };

          scope.toTrusted = function (html) {
            return $sce.trustAsHtml(html);
          };

          scope.nextSlide = function () {
            if (scope.currentSlideNumber + 1 > scope.presentation.slides.length) {
              scope.nextButtonDisabled = true;
              return;
            }
            scope.currentSlideNumber += 1;
            setSlide();
          };

          scope.prevSlide = function () {
            if (scope.currentSlideNumber - 1 < 1) {
              scope.prevButtonDisabled = true;
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

          function getSvgSize(hIdent, vIdent) {
            var maxWidth = $(window).width() - hIdent;
            var maxHeight = $(window).height() - vIdent;

            var svgWidth = maxWidth;
            var svgHeight = maxHeight;
            if (maxWidth / maxHeight > svgAspectRatio) {
              svgWidth = (maxHeight * svgAspectRatio);
            } else {
              svgHeight = (maxWidth / svgAspectRatio);
            }

            return {
              width: svgWidth,
              height: svgHeight
            };
          }

          function fitSize() {
            var size = getSvgSize(horisontalIndent, virticalIndent);
            $mainSvg.width(size.width).height(size.height).css('left', 0).css('top', 0);
            var $sidebar = $('.navigation-sidebar');
            $sidebar.height(size.height + 45);

            $(element).find('.presentation-viewer-navbar').width(size.width);
          }

          function fitSizeFullscreen() {
            var size = getSvgSize(fullscreenHorisontalIndent, fullscreenVirticalIndent);

            var top = ($(window).height() - size.height) / 2;
            var left = ($(window).width() - size.width) / 2;
            $mainSvg.width(size.width).height(size.height).css('left', left).css('top', top);
          }

          function setSlide() {
              scope.prevButtonDisabled = false;
              scope.nextButtonDisabled = false;

              if (scope.currentSlideNumber + 1 > scope.presentation.slides.length) {
                scope.nextButtonDisabled = true;
              }
              if (scope.currentSlideNumber - 1 < 1) {
                scope.prevButtonDisabled = true;
              }

              if (scope.isFullscreenMode) {
                fitSizeFullscreen();
              } else {
                fitSize();
              }
              $mainSvg.html(scope.presentation.slides[scope.currentSlideNumber - 1]);

          }
        }
      };
    }
  ]);