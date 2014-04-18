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
		}]);

	DayOfTheDuck.controller("Navigation", ["$scope", "$http", function($scope, $http) {

		$http.get("https://api.github.com/users/calebthebrewer/repos?type=public")
			.success(function(data) {
				var filteredRepositories = [];
				angular.forEach(data, function(repository) {
					//ignore repos with fork=true
					if (!repository.fork) filteredRepositories.push(repository);
				});
				$scope.repositories = filteredRepositories;
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

	DayOfTheDuck.directive("marked", function() {

		return {
			link: function(scope, element, attrs) {
				scope.$watch("readme", function(readme) {
					element.html(marked(readme));
				});
			}
		};
	});

})();
