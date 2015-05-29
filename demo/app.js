var routeApp = angular.module('routeApp', ['ngRoute']);


routeApp.controller('ListController', ['$scope', '$http',
    function ($scope, $http) {
        $scope.listTitle = 'A list of Havaianas';
        $http.get('products/products.json').success(function (data) {
            $scope.products = data;
            $scope.orderProp = 'name'
        });
    }]);

routeApp.controller('DetailsController', ['$scope', '$routeParams', '$http',
    function ($scope, $routeParams, $http) {
        $http.get('products/' + $routeParams.name + '.json').success(function (data) {
            $scope.product = data;
            console.log('DetailsController $http.get is done');
        });

        console.log('DetailsController function is done');
    }]);


routeApp.config(['$routeProvider',
    function ($routeProvider) {
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


routeApp.factory('githubInfoService', ['$http', function ($http) {
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

//routeApp.$inject = ['$scope', 'githubInfoService'];

routeApp.controller('reposInfoCntrl', function ($scope, githubInfoService) {
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
        githubInfoService.getUserRepos(username).then(function (result) {
            $scope.ReposData = result.data;
            console.log(result);
        }, function (result) {
            alert("Error: No data returned");
        });
    };
});

// injector creation

var injector = angular.injector(['routeApp', 'ng']);

var githubInfoService = injector.get('githubInfoService');
var userName = 'egch';
githubInfoService.getUserRepos(userName).then(function (result) {
    console.log(userName + ' has ' + (angular.isArray(result.data) ? result.data.length : 0) + ' active project(s)');
}, function (result) {
    alert("Error: No data returned");
});











