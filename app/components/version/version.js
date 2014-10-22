'use strict';

angular.module('presenter.version', [
  'presenter.version.interpolate-filter',
  'presenter.version.version-directive'
])

.value('version', '0.1');
