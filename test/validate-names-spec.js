var benv = require('benv');
var join = require('path').join;
var angularPath = join(__dirname, '../bower_components/angular/angular.min.js');
var checkPath = join(__dirname, '../node_modules/check-types/src/check-types.js');
require('lazy-ass');
var check = require('check-more-types');

describe.only('validating all names', function () {
  /* global window */
  beforeEach(function setupEnvironment(done) {
    benv.setup(function () {
      benv.expose({
        angular: benv.require(angularPath, 'angular'),
        ngAst: benv.require('../ng-ast.js', 'ngAst'),
        check: require(checkPath),
        validateAngularModuleNames: benv.require('../ng-ast-validate-names.js')
      });

      done();
    });
  });

  afterEach(function () {
    benv.teardown(true);
  });

  beforeEach(function loadMyApp() {
    angular.module('a', ['b', 'c']);
    angular.module('b', ['d']);
    angular.module('c', ['d']);
    angular.module('d', []);
  });

  function singleLetter(str) {
    return str.length === 1;
  }

  function notd(str) {
    return str !== 'd';
  }

  it('has validate function', function () {
    la(check.has(window, 'validateAngularModuleNames'));
  });

  it('can validate module names', function () {
    return window.validateAngularModuleNames('a', {
      isValidModuleName: singleLetter
    });
  });

  it.skip('raises exception if module name is invalid', function () {
    return window.validateAngularModuleNames('a', {
      isValidModuleName: notd
    }).catch(function (err) {
      console.log('failed to validate module names', err);
    });
  });

});
