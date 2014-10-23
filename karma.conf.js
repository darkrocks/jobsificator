module.exports = function(config){
  config.set({

    basePath : './',
    preprocessors: {
      "app/components/**/*.html": ["ng-html2js"]
    },
    files: [
      'app/third_party_components/jquery/dist/jquery.js',
      'app/third_party_components/angular/angular.js',
      'app/third_party_components/angular-route/angular-route.js',
      'app/third_party_components/angular-mocks/angular-mocks.js',
      'app/components/**/*.js',
      'app/view*/**/*.js',
      "app/components/**/*.html"
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Firefox'],

    plugins : [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter',
            'karma-ng-html2js-preprocessor'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    },


    ngHtml2JsPreprocessor: {
      stripPrefix: 'app/',
      //cacheIdFromPath: function (filepath) {
      //  return 'app' + filepath;
      //},
      moduleName: "inlinetemplates"
    },



  });
};
