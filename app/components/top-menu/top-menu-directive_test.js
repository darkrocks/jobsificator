'use strict';

describe('presenter.top-menu module', function () {
  beforeEach(module('presenter.top-menu'));
  beforeEach(module('templates'));

  describe('top-menu directive', function () {
    it('should contail navbar element', function () {

      inject(function ($compile, $rootScope) {
        var element = angular.element( '<top-menu></top-menu>');
        $compile(element)($rootScope);
        $rootScope.$digest();

        var navbars = element.find('div.navbar');
        expect(navbars.length).not.toBe(0);
      });
    });
  });
});
