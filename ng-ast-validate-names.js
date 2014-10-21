/* global ngAst, check */
(function setupNameValidation() {
  var validTemplateBundle = /^k\-[\w\-]+\.templates$/;
  var validTemplate = /^[a-z\/\-]+\.tpl\.html$/;
  var validJadeTemplate = /^[a-z\/\-]+\.tpl\.jade$/;
  var validName = /^\$?[a-zA-Z]+$/;
  // TODO(gleb): do not allow camel case constants, only caps with underscores
  var validConstant = /^([a-z][a-zA-Z]*|[A-Z_]+)$/;

  function isValid3rdPartyName(name) {
    return ['pasvaz.bindonce', 'ui-rangeSlider'].indexOf(name) !== -1;
  }

  function isValidName(name) {
    return validTemplateBundle.test(name) ||
      validTemplate.test(name) ||
      validJadeTemplate.test(name) ||
      validName.test(name) ||
      isValid3rdPartyName(name);
  }

  function isValidConstant(str) {
    return validConstant.test(str);
  }

  function validateModuleNames(options, n) {
    la(n, 'missing module');
    if (options.verbose) {
      console.log('validating module', n.name);
    }

    // TODO(gleb): stop if this module has been already validated
    if (options.isValidModuleName) {
      la(options.isValidModuleName(n.name), 'invalid module name', n.name);
    }

    la(n.values.every(isValidName), 'invalid values names in module', n.name, n.values);
    la(n.constants.every(isValidConstant), 'invalid constants in module', n.name, n.constants);
    la(n.services.every(isValidName), 'invalid services in module', n.name, n.services);
    la(n.factories.every(isValidName), 'invalid factories in module', n.name, n.factories);
    // TODO(gleb): validate controller and directive names

    setTimeout(function validateChildrenModules() {
      n.children.forEach(validateModule);
    }, 0);
  }

  var validateModule;


  function validateAngularModuleNames(rootModuleName, options) {
    options = options || {};

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
