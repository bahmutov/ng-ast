# ng-ast

> Builds abstract syntax tree from runtime AngularJs module: required modules, services, factories, etc

[![NPM info][nodei.co]](https://npmjs.org/package/ng-ast)

[![Build status][ci-image]][ci-url]
[![dependencies][dependencies-image]][dependencies-url]
[![devdependencies][ng-ast-devdependencies-image] ][ng-ast-devdependencies-url]

## Install

    bower install ng-ast
    // include bower_components/ng-ast/ng-ast.js
    var root = ngAst('Foo');
    // builds tree starting with module Foo

Each node has name, dependencies, values, services, etc. (strings).
A node also has `children` array pointing at required modules.

## Example

### basic usage

    angular.module('foo', [])
        .value('a', 'value a')
        .service('b', function() {});
    angular.module('bar', ['foo'])
        .constant('aConst', 4)
        .factory('aFactory', function() {});
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
    isEqual(root, expected); // true

### finds constants with short names

    angular.module('foo', [])
        .constant('a', 'value a')
        .service('aService', function() {});
    angular.module('bar', ['foo'])
        .constant('b', 4)
        .factory('aFactory', function() {});
    function isValidName(name) {
      return name.length > 1;
    }
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
    check.raises(verifyBar); // true
    // exception has module name and constants

## Small print

Author: Gleb Bahmutov &copy; 2014
[@bahmutov](https://twitter.com/bahmutov) [glebbahmutov.com](http://glebbahmutov.com)

License: MIT - do anything with the code, but don't blame me if it does not work.

Spread the word: tweet, star on github, etc.

Support: if you find any problems with this module, email / tweet / open issue on Github

[ci-image]: https://travis-ci.org/bahmutov/ng-ast.png?branch=master
[ci-url]: https://travis-ci.org/bahmutov/ng-ast
[nodei.co]: https://nodei.co/npm/ng-ast.png?downloads=true
[dependencies-image]: https://david-dm.org/bahmutov/ng-ast.png
[dependencies-url]: https://david-dm.org/bahmutov/ng-ast
[ng-ast-devdependencies-image]: https://david-dm.org/bahmutov/ng-ast/dev-status.png
[ng-ast-devdependencies-url]: https://david-dm.org/bahmutov/ng-ast#info=devDependencies
