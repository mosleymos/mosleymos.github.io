angular.module('decode',['ngRoute'])
.directive('articlesfooter', function(){
	return {
		restrict:'AE', 
		replace: 'true',
		templateUrl:'templates/directives/articlefooter.html'
	};
})


.config(function($routeProvider){
	$routeProvider
	// Routes principales
	.when('/', { templateUrl:'templates/home.html' })
	.when('/projects', { templateUrl:'templates/projects.html' })
	.when('/articles', {templateUrl:'templates/articles.html'})
	.when('/about', {templateUrl: 'templates/about.html', cache:true})
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
		redirectTo:'/404.html'
	});
});
