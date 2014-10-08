var benv = require('benv');
var join = require('path').join;
var angularPath = join(__dirname, '../bower_components/angular/angular.min.js');
require('lazy-ass');

describe('deep nesting', function () {
  /* global ast */
  beforeEach(function setupEnvironment(done) {
    benv.setup(function () {
      benv.expose({
        angular: benv.require(angularPath, 'angular'),
        ast: benv.require('../ng-ast.js', 'ngAst')
      });

      done();
    });
  });

  afterEach(function () {
    benv.teardown(true);
  });

  beforeEach(function loadMyApp() {
    var k, n = 1000;
    for(k = 0; k < n; k += 1) {
      var prev = k > 0 ? ['m' + (k - 1)] : [];
      angular.module('m' + k, prev);
    }
  });

  it('only has d module once', function () {
    var root = ast('m999');
    la(root);
    la(root.children.length === 1);
  });

});
