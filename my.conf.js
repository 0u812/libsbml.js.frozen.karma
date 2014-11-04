// Karma configuration
// Generated on Mon Oct 27 2014 18:39:42 GMT-0700 (PDT)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      {pattern: 'pre.js', watched: true, served: true, included: true},
      {pattern: 'libsbml.js', watched: true, served: true, included: true},
      {pattern: 'mem/libsbml.js.mem', watched: false, served: true, included: false},
      {pattern: 'libsbml-basic.js', watched: true, served: true, included: true},
      {pattern: 'libsbml-repressilator.js', watched: true, served: true, included: true},
      {pattern: 'models/decayModel.xml', watched: false, served: true, included: false},
      {pattern: 'models/BIOMD0000000012.xml', watched: false, served: true, included: false}
    ],

    proxies: {
      '/': '/base/',
      '/mem': '/base/mem'
    },


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Firefox'],
//     browsers: ['Chrome'],

    plugins: [
      'karma-firefox-launcher',
      'karma-chrome-launcher',
      'karma-jasmine'
    ],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
