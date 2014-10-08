var benv = require('benv');
var join = require('path').join;
var angularPath = join(__dirname, '../bower_components/angular/angular.min.js');
require('lazy-ass');
var check = require('check-more-types');

describe('two modules', function () {
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
    angular.module('bar', ['foo']);
    angular.module('foo', []);
  });

  it('has both modules', function () {
    console.assert(angular.module('foo'), 'has foo');
    console.assert(angular.module('bar'), 'has bar');
  });

  it('creates tree', function () {
    var node = ast('bar');
    console.assert(node, 'formed tree from bar');
  });

  it('has child module name', function () {
    var node = ast('bar');
    console.assert(node.name === 'bar', 'has name');
    console.assert(Array.isArray(node.dependencies));
    console.assert(node.dependencies.length === 1, 'has 1 dependency');
    console.assert(node.dependencies[0] === 'foo', 'has name');
  });

  it('has child module', function () {
    var node = ast('bar');
    la(check.array(node.children), 'has children array');
    la(node.children.length === 1, 'has 1 child');
    la(node.children[0].name === 'foo', 'has name');
  });

});
