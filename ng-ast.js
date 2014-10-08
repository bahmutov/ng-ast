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

  var valueProvider, constantProvider, serviceProvider, factoryProvider;

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
      children: []
    };
    _modules[name] = node;

    m.requires.forEach(function (depName) {
      node.children.push(moduleToNode(depName));
    });

    return node;
  }


  function ngAst(name) {
    _modules = {};

    valueProvider = angular.bind(null, isProvider, 'value');
    constantProvider = angular.bind(null, isProvider, 'constant');
    serviceProvider = angular.bind(null, isProvider, 'service');
    factoryProvider = angular.bind(null, isProvider, 'factory');

    return moduleToNode(name);
  }

  root.ngAst = ngAst;
}(typeof window === 'object' ? window : this));
