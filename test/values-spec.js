var benv = require('benv');
require('lazy-ass');
var join = require('path').join;
var angularPath = join(__dirname, '../bower_components/angular/angular.min.js');

var check = require('check-more-types');
check.verify.fn(la, 'missing lazy-ass function');

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

  it('has value', function () {
    var injector = angular.injector(['foo']);
    la(injector.has('bar'));
  });

  it('module foo provides value bar', function () {
    var node = ast('foo');
    la(check.array(node.values));
    la(node.values.length === 1);
    la(node.values[0] === 'bar');
  });
});

describe('module with constant', function () {
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
      .constant('bar', 'baz');
  });

  it('has constant', function () {
    var injector = angular.injector(['foo']);
    la(injector.has('bar'));
  });

  it('module foo provides constant bar', function () {
    var node = ast('foo');
    la(check.array(node.constants));
    la(node.constants.length === 1);
    la(node.constants[0] === 'bar');
  });
});

describe('module with service', function () {
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
      .value('foo', 'foo value')
      .service('bar', function (foo) {
        return foo;
      });
  });

  it('has service bar', function () {
    var injector = angular.injector(['foo']);
    la(injector.has('bar'));
  });

  it('module foo provides service bar', function () {
    var node = ast('foo');
    la(check.array(node.services));
    la(node.services.length === 1);
    la(node.services[0] === 'bar');
  });
});

describe('module with factory', function () {
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
      .value('foo', 'foo value')
      .factory('bar', function (foo) {
        return foo;
      });
  });

  it('has factory bar', function () {
    var injector = angular.injector(['foo']);
    la(injector.has('bar'));
  });

  it('module foo provides factory bar', function () {
    var node = ast('foo');
    la(check.array(node.factories));
    la(node.factories.length === 1);
    la(node.factories[0] === 'bar');
  });
});
