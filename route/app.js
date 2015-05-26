
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

 routeApp.controller('GithubController', ['$scope', '$routeParams', '$http',
     function($scope, $routeParams, $http) {
         $http.get("https://api.github.com/users/"+ $routeParams.user+ "/repos").success(function(data) {
             $scope.repos = data;
         });
     }]);

 routeApp.config(['$routeProvider',
	 function($routeProvider) {
		 $routeProvider.
             when('/', {
                 templateUrl: 'templates/menu.html'
             }).
			 when('/list', {
				 templateUrl: 'templates/havaianas/list.html',
                 controller: 'ListController'
			 }).
             when('/list/:name', {
                 templateUrl: 'templates/havaianas/details.html',
                 controller: 'DetailsController'
             }).
             when('/github/:user', {
                 templateUrl: 'templates/github/repos.html',
                 controller: 'GithubController'
             }).
             otherwise({
				 redirectTo: '/'
			 });
	 }]);









