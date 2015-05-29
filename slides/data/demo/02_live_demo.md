!SLIDE left ===================

# Live demo, browse to:

    http://localhost:8000/demo/

!SLIDE left ======================

## The logical workflow

---
Define a module:

    var routeApp = angular.module('routeApp',['ngRoute']);

---
Define a controller:

     routeApp.controller('ListController', ['$scope', '$http',
         function($scope, $http) {...
     }]);

!SLIDE left ===================

## Note

1. The module variable definition:
    https://docs.angularjs.org/api/ng/function/angular.module

1. The controller defined with a module method
1. The dependency injection:

        myModule.myMethod('myObjName',['firstDependency','firstDependency',
            function(firstDependencyVar,secondDependencyVar){ // code
        }]);

1. Read carefully: https://docs.angularjs.org/guide/di

!SLIDE left ===================

## Module loading

https://docs.angularjs.org/guide/module#module-loading-dependencies

A module is a collection of configuration and run blocks which get applied to the application during the bootstrap process.

There are two phases:

- **configuration** blocks:

    get executed during the provider registrations and configuration phase. Only providers and constants can be injected.

    (with the exception of the services in the AUTO module--$provide and $injector).

- **run** blocks:

    get executed after the injector is created and are used to kickstart the application. Only instances and constants can be injected.

!SLIDE left ======================

## Configuration Blocks

They define:

- providers: which will create instances of services

- constants

!SLIDE left ======================

## Configuration Blocks

    angular.module('myModule', []).
      value('a', 123).
      factory('a', function() { return 123; }).
      directive('directiveName', ...).
      filter('filterName', ...).
      controller('MainController', function($scope) {
        // ...
      });

    // is same as

    angular.module('myModule', []).
      config(function($provide, $compileProvider, $filterProvider, $controllerProvider) {
        $provide.value('a', 123);
        $provide.factory('a', function() { return 123; });
        $compileProvider.directive('directiveName', ...);
        $filterProvider.register('filterName', ...);
        $controllerProvider.register('MainController', function($scope) {
            // ...
        });
      });

!SLIDE left ======================

## Configuration Blocks

The $provide service is responsible for telling Angular how to create new injectable things; these things are called services.

Services are defined by things called providers, which is what you're creating when you use $provide.

Defining a provider is done via the provider method on the $provide service, and you can get hold of the $provide service by asking for it to be injected into an application's config function

Bootstrapping AngularJS apps automatically using the ngApp directive is very easy and suitable for most cases. In advanced cases, such as when using script loaders, you can use the imperative / manual way to bootstrap the app.

!SLIDE left ======================

## Bootstrapping

https://docs.angularjs.org/tutorial/step_00

There are 3 important things that happen during the app bootstrap:

* The injector that will be used for dependency injection is created.

* The injector will then create the root scope that will become the context for the model of our application.

* Angular will then "compile" the DOM starting at the ngApp root element, processing any directives and bindings found along the way.


!SLIDE left ======================

## A live controller

---
JS

    routeApp.controller('ListController', ['$scope', '$http',
        function($scope, $http) {
            $http.get('products/products.json').success(function(data) {
                $scope.products = data;
                $scope.orderProp = 'name'
            });
    }]);

---
HTML

    <div ng-controller="MyController">
      <button ng-click="sayHello()">Hello</button>
    </div>

---
### or **use the routing!**

!SLIDE left ======================

## The routing

---
JS

     routeApp.config(['$routeProvider',
         function($routeProvider) {
             $routeProvider.
                 when('/', {
                     templateUrl: 'templates/menu.html'
                 }).
                 when('/list', {
                     templateUrl: 'templates/havaianas/list.html',
                     controller: 'ListController'
                 })...;
         }]);

---
HTML

    <div ng-view></div>

!SLIDE left ======================
## The routing

- Defines a **route**: Default hashbang URLs: see https://docs.angularjs.org/guide/$location

- Defines a **template**

- Defines a **controller**

!SLIDE left ======================
## $scope

https://docs.angularjs.org/guide/scope

Scope is the glue between application controller and the view (HTML)

- **2-way databinding** (not just MVC) between HTML and controller

- **hierarchical**: if a property is not found, look up the parent scope

- **unique source of truth**: use it for backend updates (REST) etc.

!SLIDE left ======================
## $scope

---
JS

    $scope.listTitle = 'A list of Havaianas';

---
HTML

    <!-- 1-way binding -->
    <h3>{{listTitle}}</h3>

    <!-- 2-way binding -->
    <p>Change title: <input type="text" ng-model="listTitle"/>

!SLIDE left ======================
## Services in AngularJS, **$http** example



### **Learn Angular promises**!

https://docs.angularjs.org/api/ng/service/$http

https://docs.angularjs.org/api/ng/service/$q

**NOTE**: Things happen at a later stage, possibly

!SLIDE left ======================
## Promises in AngularJS

     routeApp.controller('DetailsController', ['$scope', '$routeParams', '$http',
         function($scope, $routeParams, $http) {
             $http.get('products/' + $routeParams.name + '.json').success(function(data) {
                 $scope.product = data;
                 console.log('DetailsController $http.get is done');
             });

             console.log('DetailsController function is done');
         }]);

!SLIDE left ======================
## Extend AngularJS: define services

https://docs.angularjs.org/guide/services

    routeApp.factory('githubInfoService', ['$http', function ($http) { ...

    }]);

!SLIDE left ======================
## And there more room for expansion

- directives
https://docs.angularjs.org/guide/directive

- filters
https://docs.angularjs.org/guide/filter

- watches