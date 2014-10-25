'use strict';

angular.module('presenter.presentation-viewer', ['presenter.presentation-viewer.presentation-viewer-directive', 'presenter.presentation-viewer.trustify-html-filter'])
.constant("$", window.jQuery)
.constant("_", window._);
