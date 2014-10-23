'use strict';

describe('presenter.add-presentation-modal module', function () {
  var $compile;
  var $rootScope;
  var element;

  beforeEach(module('presenter.add-presentation-modal'));
  beforeEach(module('templates'));
  beforeEach(inject(function (_$compile_, _$rootScope_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));
  beforeEach(function() {
    element = angular.element('<add-presentation-modal></add-presentation-modal>');
    $compile(element)($rootScope);
    $rootScope.$digest();
  });

  describe('add-presentation-modal directive', function () {
    it('should contain div.modal element', function () {
      var as = element.find('div.modal');
      expect(as.length).not.toBe(0);
    });
  });
});
