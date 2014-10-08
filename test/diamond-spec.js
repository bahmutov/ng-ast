var benv = require('benv');
var join = require('path').join;
var angularPath = join(__dirname, '../bower_components/angular/angular.min.js');
require('lazy-ass');
var check = require('check-more-types');

describe('diamond dependencies pointing at same module', function () {
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
    angular.module('a', ['b', 'c']);
    angular.module('b', ['d']);
    angular.module('c', ['d']);
    angular.module('d', []);
  });

  it('only has d module once', function () {
    var node = ast('a');
    la(node.name === 'a');
    la(node.children.length === 2);
    var b = node.children[0];
    var c = node.children[1];
    la(check.not.same(b, c));
    la(b.children.length === 1, 'b has 1 child');
    la(c.children.length === 1, 'c has 1 child');
    var d1 = b.children[0];
    var d2 = c.children[0];
    la(d1.name === 'd', 'b has d');
    la(d2.name === 'd', 'c has d');
    la(check.same(d1, d2), 'only single d module node');
  });

});
