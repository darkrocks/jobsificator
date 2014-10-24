'use strict';

angular.module('presenter.data', [])
  .constant("dataUrls", { presentations: '/api/presentations' })
  .factory('presentationsData', ['$http', '$q', 'dataUrls', function ($http, $q, dataUrls) {
    var presentations;

  return {
    getAll: function () {
      var deferred = $q.defer();

      if (!presentations) {
        $http.get(dataUrls.presentations).
           success(function (data, status, headers, config) {
             presentations = data;
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
    },
    
    normalizeEntity: function(entity) {
      return {
        id: entity.id,
        name: entity.name,
        slides: entity.slides,
        slidesCount: entity.slidesCount
      };
    }
  };
}]);