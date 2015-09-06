var articlesList = [

	{title:'Hello World', urlLink:'/articles/helloworld'},
	{title:'FizzBuzz', urlLink:'/articles/ruby_training'},
	{title:'Jedi Jihad', urlLink:'/articles/jedi_jihad'},
	{title:'Jeet css', urlLink:'/articles/jeet_css'},
	{title:'Codelab css', urlLink:'/articles/codelab_css_testing'},
	{title:'Corpore sano', urlLink:'/articles/corpore_sano'},
	{title:'Codelab css', urlLink:'/articles/codelab_css_testing'},
	{title:'Javascript PC', urlLink:'/articles/javascript_linux_emulation'},
	{title:'Movie News', urlLink:'/articles/movie_news'},
	{title:'Ruby Grep', urlLink:'/articles/ruby_grep'},
	{title:'Test en css', urlLink:'/articles/css_testing'}

];


angular.module('decode',['ngRoute'])

.controller('ArticlesListCtrl',['$scope', function($scope){
        $scope.articles = articlesList;
}])

.directive('articlesfooter', function(){
	return {
		restrict:'AE', 
		replace: true,
		templateUrl:'../../templates/directives/articlesfooter.html'
	};
})

.directive('disqus', function(){
	return {
	        restrict:'AE', 
		replace: false,
		templateUrl: '../../templates/directives/disqus.html'
	};
})


.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
	$routeProvider
	// Routes principales
	.when('/', { templateUrl:'templates/home.html' })
	.when('/projects', { templateUrl:'templates/projects.html' })
	.when('/articles', {templateUrl:'templates/articles.html'})
	.when('/about', {templateUrl: 'templates/about.html', cache:true})
	.when('/rss', {templateUrl:'templates/rss.html'})
	.when('/404', {templateUrl: 'templates/404.html'})
	// Articles routes
	
	.when('/articles/codelab_css_testing', {templateUrl: 'templates/articles/codelab_css_testing.html'})
	.when('/articles/corpore_sano', {templateUrl: 'templates/articles/corpore_sano.html'})
	.when('/articles/css_testing', {templateUrl: 'templates/articles/css_testing.html'})
	.when('/articles/helloworld', {templateUrl: 'templates/articles/helloworld.html'})
	.when('/articles/javascript_linux_emulation', {templateUrl: 'templates/articles/javascript_linux_emulation.html'})
	.when('/articles/jedi_jihad', {templateUrl: 'templates/articles/jedi_jihad.html'})
	.when('/articles/jeet_css', {templateUrl: 'templates/articles/jeet_css.html'})
	.when('/articles/movie_news', {templateUrl: 'templates/articles/movie_news.html'})
	.when('/articles/ruby_grep', {templateUrl: 'templates/articles/ruby_grep.html'})
	.when('/articles/ruby_training', {templateUrl: 'templates/articles/ruby_training.html'})


	// 404 si moindre probleme
	.otherwise({
		redirectTo:'/404'
	});

	// Remove the hashtag
	$locationProvider.html5Mode(true);

}]);
