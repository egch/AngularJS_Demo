
 var routeApp = angular.module('routeApp',['ngRoute']);


 routeApp.controller('ListController', ['$scope', '$http',
     function($scope, $http) {
         $http.get('products/products.json').success(function(data) {
             $scope.products = data;
             $scope.orderProp = 'name'
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
             when('/github', {
                 templateUrl: 'templates/github/repos.html'
             }).
             otherwise({
				 redirectTo: '/'
			 });
	 }]);


 /* ************************************************ */


 routeApp.controller('reposInfoCntrl', function ($scope, GithubInfoService) {
     $scope.devs = [{
         name: 'enrico giurin',
         githubLogin: 'egch'
     }, {
         name: 'enrico mezzato',
         githubLogin: 'mezzato'
     }, {
         name: 'lucio benfante',
         githubLogin: 'benfante'
     }, {
         name: 'michele franzin',
         githubLogin: 'fuzziness'
     }];

     $scope.getUserRepos = function (username) {
         GithubInfoService.getUserRepos(username).then(function (result) {
             $scope.ReposData = result.data;
             console.log(result);
         }, function (result) {
             alert("Error: No data returned");
         });
     };
 });

 routeApp.$inject = ['$scope', 'GithubInfoService'];

 routeApp.factory('GithubInfoService', ['$http', function ($http) {
     var factory = {
         getUserRepos: function (username) {
             var data = $http({
                 method: 'GET',
                 url: "https://api.github.com/users/" + username + "/repos"
             });
             return data;
         }
     }
     return factory;
 }]);









