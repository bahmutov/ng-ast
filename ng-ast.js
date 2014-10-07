/* global window */
(function (root) {

  function valueProvider(row) {
    return Array.isArray(row) &&
      row[1] === 'value';
  }

  function providerName(row) {
    return row[2][0];
  }

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
      values: m._invokeQueue
        .filter(valueProvider).map(providerName)
    };
  }

  root.ngAst = ngAst;
}(typeof window === 'object' ? window : this));
