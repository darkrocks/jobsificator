'use strict';

angular.module('presenter.presentation-viewer.trustify-html-filter', [])
    .filter('trustifyHtml', ['$sce', '_', function ($sce, _) {
      return function (htmls) {
        return _.map(htmls, function (html) {  return $sce.trustAsHtml(html); });
      };
    }]);