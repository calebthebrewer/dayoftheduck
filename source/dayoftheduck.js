App = Ember.Application.create();

App.Router.map(function() {
	this.resource("blog", {path: "/posts"}, function() {
		this.resource("post", {path: "/posts/:post_id"});
	});
	this.resource("projects", function() {
		this.resource("project", {path: "/projects/:project_id"});
	});
});

App.ApplicationController = Ember.Controller.extend({
	currentPathDidChange: function(route) {
		this.set("searchRoute", route.currentPath);
	}.observes("currentPath"),
	searchRoute: ""
});

App.IndexRoute = Ember.Route.extend({
	model: function() {
		return {
			links: [
				"projects",
				"blog"
			]
		};
	}
});

(function() {
	var appid = "W48Q3K-3YJ8W5TJ9E";

	var buildings = [],
		buildingCount = 22,
		maxHeight = 30,
		minHeight = 2,
		maxWidth = 7,
		minWidth = 4,
		cursor = 0,
		floorHeight = 2,
		roofHeight = 3,
		hallWidth = 3,
		windowHeight = 2,
		windowWidth = 1;

	function random(min, max) {
		return Math.round((Math.random() * (max - min)) + min);
	}

	function variableHeight(min, max, x) {
		var height = Math.round(Math.sin(x) * (max - min) + min) + random(-2, 4);
		return height < min ? min : height;
	}

	function variableWidth(min, max, x) {
		var width = Math.round((Math.sin(x + Math.PI) + 1) * (max - min) + min) + random(-2, 2);
		return width < min ? min : (width > max ? max : width);
	}

	for (var i = 0; i < buildingCount; i++) {
		var height = variableHeight(minHeight, maxHeight, (i + 1) * (Math.PI / buildingCount)),
			width = variableWidth(minWidth, maxWidth, (i + 1) * (Math.PI / buildingCount)),
			building = {
				x: cursor,
				y: 0,
				width: hallWidth * width,
				height: floorHeight * height + roofHeight,
				windows: new Array(width * height)
			};

		cursor += hallWidth * width + variableWidth(-2, 20, (i + 1) * (Math.PI / buildingCount));
		buildings.push(building);
	}

	var city = d3.select(".city");
	city.selectAll("building")
		.data(buildings)
		.enter()
		.append("rect")
		.attr("class", "walls")
		.attr({
			x: function (d) { return d.x; },
			y: 0,
			width: function (d) { return d.width; },
			height: function (d) { return d.height; },
			//fill: "url('images/stressed_linen.png')"
			fill: "url(#windows)"
		})
		.transition()
		.delay(500)
		.ease("cubic-out")
		.duration(1000)
		.attr("y", function() {
			return 0 - d3.select(this).attr("height");
		});

	d3.select("#windows")
		.select("line")
		.transition()
		.delay(2000)
		.duration(500)
		.attr("stroke-width", 11);
})();

