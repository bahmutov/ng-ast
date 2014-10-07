var benv = require('benv');
var join = require('path').join;
var angularPath = join(__dirname, '../bower_components/angular/angular.min.js');

describe('module with values', function () {
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
    angular.module('foo', [])
      .value('bar', 'baz');
  });

  it('has value foo', function () {
    var injector = angular.injector(['foo']);
    console.assert(injector.has('bar'));
  });

  it('module foo provides value foo', function () {
    var node = ast('foo');
    console.assert(Array.isArray(node.values));
    console.assert(node.values.length === 1);
    console.assert(node.values[0] === 'bar');
  });
});
