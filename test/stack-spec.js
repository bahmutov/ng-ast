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

  var n = 5000;
  beforeEach(function loadMyApp() {
    var k;
    for(k = 0; k < n; k += 1) {
      var prev = k > 0 ? ['m' + (k - 1)] : [];
      angular.module('m' + k, prev)
        .value('foo', 'bar');
    }
  });

  it('grabs long dependency tree', function (done) {
    this.timeout(10000);
    ast('m' + (n - 1)).then(function (root) {
      la(root);
      la(root.children.length === 1);
      done();
    });
  });

});
