var benv = require('benv');
var join = require('path').join;
var angularPath = join(__dirname, '../bower_components/angular/angular.min.js');

describe('basic', function () {
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

  beforeEach(function checkAngular() {
    console.assert(angular, 'cannot find angular');
  });

  beforeEach(function loadMyApp() {
    angular.module('foo', []);
  });

  it('has function', function () {
    console.assert(typeof ast === 'function');
  });

  it('has module foo', function () {
    var m = angular.module('foo');
    console.assert(m);
  });

  it('creates single node tree', function () {
    var node = ast('foo');
    console.assert(node);
  });

  it('has no dependencies', function () {
    var node = ast('foo');
    console.assert(Array.isArray(node.dependencies));
    console.assert(!node.dependencies.length);
  });
});
