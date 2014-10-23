'use strict';

describe('presenter.add-presentation-modal module', function () {
  var $compile;
  var $rootScope;
  var $httpBackend;
  var requestHandler;
  var element;
  var scope;

  beforeEach(module('presenter.add-presentation-modal'));
  beforeEach(module('templates'));
  beforeEach(inject(function (_$compile_, _$rootScope_, _$httpBackend_) {
    $httpBackend = _$httpBackend_;
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    requestHandler = $httpBackend.when('GET', '/api/presentations').respond(null);
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

  //  it('should be hide when visible=0', function () {
  //    scope = $rootScope.$new();
  //    scope.vis = 0;
  //    element = $compile('<add-presentation-modal visible="vis"></add-presentation-modal>')(scope);
  //    scope.$apply();
  //    console.log(element);

  //    var div = element.find('div.modal');
  //    expect(div.css('display')).toBe('none');
  //  });
  });


});
