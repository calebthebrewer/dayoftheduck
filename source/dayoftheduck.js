(function() {
	var appid = "W48Q3K-3YJ8W5TJ9E";

	var buildings = [],
		buildingCount = 30,
		maxHeight = 30,
		minHeight = 10,
		maxWidth = 30,
		minWidth = 20,
		cursor = 0;

	function random(min, max) {
		return Math.floor((Math.random() * (max - min)) + min);
	}

	function variableHeight(min, max, x) {
		return Math.floor(Math.sin(x) * (max - min) + min) + random(-10, 10);
	}

	function variableWidth(min, max, x) {
		return Math.floor((Math.sin(x + Math.PI) + 1) * (max - min) + min) + random(-5, 5);
	}

	for (var i = 1; i <= buildingCount; i++) {
		var height = variableHeight(minHeight, maxHeight, i * (Math.PI / buildingCount)),
			width = variableWidth(minWidth, maxWidth, i * (Math.PI / buildingCount)),
			building = {
				x: cursor,
				y: 0,
				width: width,
				height: height
			};



		cursor += width + variableWidth(0, 10, i * (Math.PI / buildingCount));
		buildings.push(building);
	}

	var city = d3.select(".city");
	window.cityBuildings = city.selectAll("rect")
		.data(buildings)
		.enter()
		.append("rect")
		.attr("class", "building")
		.attr({
			x: function (d) { return d.x; },
			y: function (d) { return d.y; },
			width: function (d) { return d.width; },
			height: function (d) { return d.height; },
			fill: "url('images/stressed_linen.png')"
		})
		.transition()
		.delay(500)
		.ease("cubic-out")
		.duration(1000)
		.attr("y", function() {
			return 0 - d3.select(this).attr("height");
		});
/*
	cityBuildings.each(function(d, i) {
		d.selectAll("rect")
			.data(d.windows)
			.append("rect")
			.attr("class", "window");
	});
*/
})();

