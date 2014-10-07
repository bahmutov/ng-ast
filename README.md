# ng-ast

> Builds abstract syntax tree from runtime AngularJs module: required modules, services, factories, etc

[![NPM info][nodei.co]](https://npmjs.org/package/ng-ast)

[![Build status][ci-image]][ci-url]
[![dependencies][dependencies-image]][dependencies-url]
[![devdependencies][ng-ast-devdependencies-image] ][ng-ast-devdependencies-url]

## Install and use

    bower install ng-ast
    // include bower_components/ng-ast/ng-ast.js
    var root = ngAst('Foo');
    // builds tree starting with module Foo

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
