var benv = require('benv');
var join = require('path').join;
var angularPath = join(__dirname, '../bower_components/angular/angular.min.js');
require('lazy-ass');
var isEqual = require('lodash.isequal');
var check = require('check-more-types');

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

  it('finds constants with short names', function () {
    angular.module('foo', [])
      .constant('a', 'value a')
      .service('aService', function () {});

    angular.module('bar', ['foo'])
      .constant('b', 4)
      .factory('aFactory', function () {});

    function isValidName(name) { return name.length > 1; }

    function verifyConstants(node) {
      if (!node.constants.every(isValidName)) {
        throw new Error('module ' + node.name + ' has invalid constants ' + node.constants);
      }
      node.children.forEach(verifyConstants);
    }

    function verifyBar() {
      var root = ngAst('bar');
      verifyConstants(root);
    }

    la(check.raises(verifyBar));
  });

});
