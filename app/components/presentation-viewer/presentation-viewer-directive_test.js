'use strict';

describe('jobsificator.presentation-viewer module', function() {
  var $compile;
  var $rootScope;
  var $httpBackend;
  var requestHandler;
  var element;
  var scope;

  beforeEach(module('jobsificator.presentation-viewer'));
  beforeEach(module('templates'));
  beforeEach(inject(function(_$compile_, _$rootScope_, _$httpBackend_) {
    $httpBackend = _$httpBackend_;
    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));

  describe('jobsificator.presentation-viewer directive', function() {
    it('should throw an error when presentation slides are undefined', function() {
      scope = $rootScope.$new();
      scope.presentation = {
        slides: undefined
      };

      expect(function() {
        $compile('<presentation-viewer presentation="presentation"></presentation-viewer>')(scope);
        scope.$apply();
      }).toThrow(new Error('Wrong presentation format'));

      scope.presentation = {
        slides: []
      };

      expect(function() {
        $compile('<presentation-viewer presentation="presentation"></presentation-viewer>')(scope);
        scope.$apply();
      }).toThrow(new Error('Wrong presentation format'));
    });
  });
});