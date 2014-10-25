'use strict';

angular.module('presenter.data', [])
  .constant("dataUrls", { presentations: '/api/presentations' })
  .factory('presentationsData', ['$http', '$q',  '_', 'dataUrls', function ($http, $q,  _, dataUrls) {
    var presentations;

   function normalizeEntities(rawData) {
      return _.map(rawData, function(rawPresentation) {
        var presentation = {
          id: rawPresentation.id,
          name: rawPresentation.name,
          slidesCount: rawPresentation.slidesCount
        };

        presentation.slides = _.map(rawPresentation.slides, function(rawSlide) {
          return rawSlide;
        });

        return presentation;
      });
    }

  return {
    getAll: function () {
      var deferred = $q.defer();

      if (!presentations) {
        $http.get(dataUrls.presentations).
           success(function (data, status, headers, config) {
             presentations = normalizeEntities(data);
             deferred.resolve(presentations);
           }).
           error(function (data, status, headers, config) {
             deferred.reject(status);
           });
      }
      else {
        deferred.resolve(presentations);
      }

      return deferred.promise;
    }
  };
}]);