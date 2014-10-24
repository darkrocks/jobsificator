'use strict';

describe('presenter.data module', function () {
  var $httpBackend;
  var $rootScope;
  var requestHandler;
  var presentationsDataService;

  beforeEach(module('presenter.data', function($provide) {
    $provide.constant("dataUrls", { presentations: '/api/presentations' });
  }));

  beforeEach(inject(function (_$httpBackend_, _$rootScope_, presentationsData) {
    $httpBackend = _$httpBackend_;
    $rootScope = _$rootScope_;
    requestHandler = $httpBackend.when('GET', '/api/presentations')
                       .respond({ userId: 'userX' }, { 'A-Token': 'xxx' });
    presentationsDataService = presentationsData;
  }));

  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  describe('presentationsData service', function () {

    it('should fetch api/presentations', function () {
      $httpBackend.expectGET('/api/presentations');
      presentationsDataService.getAll();
      $httpBackend.flush();
    });

  });
});