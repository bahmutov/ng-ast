/* global window */
(function (root) {

  function isProvider(type, row) {
    return Array.isArray(row) &&
      row[1] === type;
  }
  var valueProvider = isProvider.bind(null, 'value');
  var constantProvider = isProvider.bind(null, 'constant');
  var serviceProvider = isProvider.bind(null, 'service');
  var factoryProvider = isProvider.bind(null, 'factory');

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
        .filter(valueProvider).map(providerName),
      constants: m._invokeQueue
        .filter(constantProvider).map(providerName),
      services: m._invokeQueue
        .filter(serviceProvider).map(providerName),
      factories: m._invokeQueue
        .filter(factoryProvider).map(providerName),
      children: m.requires.map(ngAst)
    };
  }

  root.ngAst = ngAst;
}(typeof window === 'object' ? window : this));
