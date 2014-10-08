/* global window */
(function (root) {

  function isProvider(type, row) {
    return Array.isArray(row) &&
      row[1] === type;
  }

  function providerName(row) {
    return row[2][0];
  }

  // all found modules by name
  var _modules = {};

  function moduleToNode(name) {
    if (!name) {
      throw new Error('Expected angular module name');
    }
    if (_modules[name]) {
      return _modules[name];
    }

    var m = angular.module(name);
    if (!m) {
      throw new Error('Cannot find module ' + name);
    }

    var valueProvider = angular.bind(null, isProvider, 'value');
    var constantProvider = angular.bind(null, isProvider, 'constant');
    var serviceProvider = angular.bind(null, isProvider, 'service');
    var factoryProvider = angular.bind(null, isProvider, 'factory');
    // console.log(m._invokeQueue);

    var node = {
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
      children: m.requires.map(moduleToNode)
    };
    _modules[name] = node;
    return node;
  }

  function ngAst(name) {
    _modules = {};
    return moduleToNode(name);
  }

  root.ngAst = ngAst;
}(typeof window === 'object' ? window : this));
