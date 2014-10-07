var benv = require('benv');
var join = require('path').join;
var angularPath = join(__dirname, '../bower_components/angular/angular.min.js');

describe('basic', function () {
  beforeEach(function setupEnvironment(done) {
    benv.setup(function () {
      benv.expose({
        angular: benv.require(angularPath, 'angular')
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

  it('has module foo', function () {
    var m = angular.module('foo');
    console.assert(m);
  });
});
