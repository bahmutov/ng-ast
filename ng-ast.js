/* global window */
(function (root) {

  function ngAst(name) {
    if (!name) {
      throw new Error('Expected angular module name');
    }

    var m = angular.module(name);
    if (!m) {
      throw new Error('Cannot find module ' + name);
    }

    // console.log(m._invokeQueue);

    return {
      name: name,
      dependencies: m.requires,
      values: []
    };
  }

  root.ngAst = ngAst;
}(typeof window === 'object' ? window : this));
