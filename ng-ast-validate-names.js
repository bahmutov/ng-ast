/* global ngAst, check */
(function setupNameValidation() {
  var checkedModules, validateModule;

  function validateModuleNames(options, n) {
    la(n, 'missing module');
    la(check.unemptyString(n.name), 'module is missing name');
    if (checkedModules[n.name]) {
      return;
    }

    if (options.verbose) {
      console.log('validating module', n.name);
    }

    checkedModules[n.name] = true;
    if (options.isValidModuleName) {
      la(options.isValidModuleName(n.name), 'invalid module name', n.name);
    }

    if (options.isValidValueName) {
      la(n.values.every(options.isValidValueName),
        'invalid values names in module', n.name, n.values);
    }

    if (options.isValidConstantName) {
      la(n.constants.every(options.isValidConstantName),
        'invalid constants in module', n.name, n.constants);
    }

    if (options.isValidServiceName) {
      la(n.services.every(options.isValidServiceName),
        'invalid services in module', n.name, n.services);
    }

    if (options.isValidFactoryName) {
      la(n.factories.every(options.isValidFactoryName),
        'invalid factories in module', n.name, n.factories);
    }
    // TODO(gleb): validate controller and directive names

    setTimeout(function validateChildrenModules() {
      n.children.forEach(validateModule);
    }, 0);
  }

  function validateAngularModuleNames(rootModuleName, options) {
    options = options || {};
    checkedModules = {};

    la(check.unemptyString(rootModuleName), 'expected root module name', rootModuleName);
    validateModule = angular.bind(null, validateModuleNames, options);

    return ngAst(rootModuleName).then(function startNameValidation(node) {
      la(node, 'could not find angular module', rootModuleName);
      validateModule(node);
    });
  }
  /* global window */
  window.validateAngularModuleNames = validateAngularModuleNames;
}());
