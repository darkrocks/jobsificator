'use strict';

describe('presenter.viewer module', function() {
  var $compile;
  var $rootScope;
  var $controller;

  beforeEach(module('presenter.viewer'));
  beforeEach(inject(function (_$compile_, _$rootScope_, _$controller_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $controller = _$controller_;
  }));

  describe('viewer controller', function(){

    it('should ....', function() {
      //spec body
      var viewerCtrl = $controller('ViewerCtrl', { $scope: $rootScope });
      expect(viewerCtrl).toBeDefined();
    });

  });
});