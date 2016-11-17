var app= angular.module('my-app', ['ui.router']);
app.factory('MovieService', function($http) {
  var service = {};
  var API_KEY = '77c37b9d1bc2bbb900a85a5aa374c89d';
  service.movieSearch = function(name) {
  var url ='http://api.themoviedb.org/3/search/movie';
  return $http({
    method: 'GET',
    url: url,
    params: { api_key: API_KEY,
    query: name }
  });
};
service.movieDetails = function(movieId) {
var url ='http://api.themoviedb.org/3/search/movie/' + movieId;
return $http({
  method: 'GET',
  url: url,
  params: { api_key: API_KEY}
});
};
return service;
});

app.controller('SearchResultsController', function($scope, $stateParams, $state, MovieService){

$scope.movieSearchFunc = function() {
  console.log("hello");
    $state.go('searchView', {searchResults: $scope.movieText});
    };
$scope.pageName = $stateParams.searchResults;
console.log($scope.pageName);
MovieService.movieSearch($scope.pageName)
      .success(function(data) {
        console.log(data);
        $scope.movieResults = data.results;
      });
});
app.controller('MainSearchController', function($scope, $stateParams, $state){
  $scope.movieSearchFunc = function() {
    console.log("hello");
      $state.go('searchView', {searchResults: $scope.movieText});
      };
  });
  app.controller('MovieController', function($scope, $stateParams, $state, MovieService){
    $scope.movieId = $stateParams.searchId;
    $scope.movieDetailsFunc = function() {
      MovieService.movieDetails($scope.movieId)
      .success(function(data) {
        console.log(data);
          $scope.movieResultInfo = data.results;
      });
        // $state.go('movieInfo', {searchId: $scope.yayMovies});
        };
    });

    app.config(function($stateProvider, $urlRouterProvider) {
      $stateProvider

      .state({
        name: 'search',
        url: '/',
        templateUrl: 'search.html',
        controller: 'MainSearchController'
      })

      .state({
        name: 'searchView',
        url: '/{searchResults}',
        templateUrl: 'searchResults.html',
        controller: 'SearchResultsController'
      })

      .state({
        name: 'movieInfo',
        url: '/{searchId}',
        templateUrl: 'movieinfo.html',
        controller: 'MovieController'
      });
      $urlRouterProvider.otherwise('/');
    });
