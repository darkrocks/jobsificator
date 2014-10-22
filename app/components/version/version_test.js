'use strict';

describe('presenter.version module', function() {
  beforeEach(module('presenter.version'));

  describe('version service', function() {
    it('should return current version', inject(function(version) {
      expect(version).toEqual('0.1');
    }));
  });
});
