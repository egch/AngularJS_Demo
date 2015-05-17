
 var routeApp = angular.module('routeApp',['ngRoute']);


 routeApp.controller('ListController', ['$scope', '$http',
     function($scope, $http) {
         $http.get('products/products.json').success(function(data) {
             $scope.products = data;
         });
     }]);

 routeApp.controller('DetailsController', ['$scope', '$routeParams', '$http',
     function($scope, $routeParams, $http) {
         $http.get('products/' + $routeParams.name + '.json').success(function(data) {
             $scope.product = data;
         });
     }]);

 routeApp.config(['$routeProvider',
	 function($routeProvider) {
		 $routeProvider.
			 when('/list', {
				 templateUrl: 'list.html',
                 controller: 'ListController'
			 }).
             when('/list/:name', {
                 templateUrl: 'details.html',
                 controller: 'DetailsController'
             }).

			 otherwise({
				 redirectTo: '/list'
			 });
	 }]);









