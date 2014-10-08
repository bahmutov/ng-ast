var benv = require('benv');
var join = require('path').join;
var angularPath = join(__dirname, '../bower_components/angular/angular.min.js');
require('lazy-ass');
var isEqual = require('lodash.isequal');

describe('examples', function () {
  /* global ngAst */
  beforeEach(function setupEnvironment(done) {
    benv.setup(function () {
      benv.expose({
        angular: benv.require(angularPath, 'angular'),
        ngAst: benv.require('../ng-ast.js', 'ngAst')
      });

      done();
    });
  });

  afterEach(function () {
    benv.teardown(true);
  });

  it('basic', function () {
    angular.module('foo', [])
      .value('a', 'value a')
      .service('b', function () {});

    angular.module('bar', ['foo'])
      .constant('aConst', 4)
      .factory('aFactory', function () {});

    var expected = {
      name: 'bar',
      dependencies: ['foo'],
      values: [],
      constants: ['aConst'],
      services: [],
      factories: ['aFactory'],
      children: [
        {
          name: 'foo',
          dependencies: [],
          values: ['a'],
          constants: [],
          services: ['b'],
          factories: [],
          children: []
        }
      ]
    };
    var root = ngAst('bar');
    la(isEqual(root, expected), root, expected);
  });

});
