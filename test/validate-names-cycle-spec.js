var benv = require('benv');
var join = require('path').join;
var angularPath = join(__dirname, '../bower_components/angular/angular.min.js');
var checkPath = join(__dirname, '../node_modules/check-types/src/check-types.js');
require('lazy-ass');

describe('validating names with cycle', function () {
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
    angular.module('d', ['a']);
  });

  var count = 0;
  function singleLetter(str) {
    count += 1;
    return str.length === 1;
  }

  it('can validate module names', function (done) {
    setTimeout(function () {
      la(count === 4, 'there should be 4 modules', count);
      done();
    }, 50);

    window.validateAngularModuleNames('a', {
      isValidModuleName: singleLetter,
      verbose: false
    });
  });

});
