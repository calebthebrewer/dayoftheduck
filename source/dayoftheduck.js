(function() {

	"use strict";

	var DayOfTheDuck = angular.module("DayOfTheDuck", ["ui.bootstrap", "ngRoute"])
		.config(["$routeProvider", function($routeProvider) {
			$routeProvider.when("/", {
				templateUrl: "templates/duck.html"
			});
			$routeProvider.when("/projects/:project", {
				templateUrl: "templates/project.html",
				controller: "Project"
			});
			$routeProvider.when("/blog/:post", {
				templateUrl: "templates/post.html",
				controller: "Post"
			});
		}]);

	DayOfTheDuck.controller("Navigation", ["$scope", "$http", "$location", "$window", function($scope, $http, $location, $window) {

		$scope.miniNavOpen = false;
		$scope.currentSubnav = "";
		$scope.toggleSubnav = function(subnav) {
			$scope.currentSubnav = $scope.currentSubnav == subnav ? "" : subnav;
		};

		$scope.$on('$viewContentLoaded', function(event) {
			$window.ga.push(['_trackPageview', $location.path()]);
		});

		$http({
			method: "GET",
			url: "https://api.github.com/users/calebthebrewer/repos?type=public",
			cache: true
		})
			.success(function(data) {
				var filteredRepositories = [];
				angular.forEach(data, function(repository) {
					//ignore repos with fork=true
					if (!repository.fork) filteredRepositories.push(repository);
				});
				$scope.repositories = filteredRepositories;
			});

		//TODO: this is only going to work for six more blog posts (limit 10)
		$http.get("get.php?url=" + "http://blog.dayoftheduck.com/api/get_posts/")
			.success(function(data) {
				$scope.posts = data.posts;
			})
			.error(function(data) {
				$scope.posts = [
					{
						name: "Sample Post",
						slug: "sample-post",
						excerpt: "Some stuff about the post should go here."
					}
				];
			});

		$scope.$on('$routeChangeSuccess', function () {
			$scope.miniNavOpen = false;
		});

	}]);

	DayOfTheDuck.controller("Project", ["$scope", "$http", "$routeParams", "$templateCache", function($scope, $http, $routeParams, $templateCache) {

		$scope.url = "https://github.com/calebthebrewer/" + $routeParams.project;
		$scope.readme = "";

		var readmeUrl = "https://api.github.com/repos/calebthebrewer/" + $routeParams.project + "/readme",
			readme = $templateCache.get(readmeUrl);

		$http({
			method: "GET",
			url: readmeUrl,
			cache: true
		}).success(function(data) {
			if (data.encoding == "base64") {
				var content = atob(data.content);
				$templateCache.put(readmeUrl, content);
				$scope.readme = content;

			}
		});
	}]);

	DayOfTheDuck.controller("Post", ["$scope", "$http", "$routeParams", "$templateCache", function($scope, $http, $routeParams, $templateCache) {

		$scope.post = "";

		$http({
			method: "GET",
			url: "get.php?url=" + "http://blog.dayoftheduck.com/api/get_post/?slug=" + $routeParams.post,
			cache: true
		}).success(function(data) {
			$scope.post = data.post;
		});
	}]);

	DayOfTheDuck.directive("marked", function() {

		return {
			link: function(scope, element, attrs) {
				scope.$watch("readme", function(readme) {
					element.html(marked(readme));
				});
			}
		};
	});

	DayOfTheDuck.directive("htmled", function() {

		return {
			link: function(scope, element, attrs) {
				scope.$watch("post.content", function(content) {
					element.html(content);
				});
				scope.$watch("p.excerpt", function(content) {
					element.html(content);
				});
			}
		};
	});

})();
