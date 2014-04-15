//(function() {
	var appid = "W48Q3K-3YJ8W5TJ9E";

	var buildings = [],
		buildingCount = 22,
		maxHeight = 15,
		minHeight = 2,
		maxWidth = 7,
		minWidth = 4,
		cursor = 0,
		floorHeight = 2,
		roofHeight = 3,
		hallWidth = 3;
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

		cursor += hallWidth * width + variableWidth(-2, 20, i * (Math.PI / buildingCount));
		buildings.push(building);
	}

	var city = d3.select(".city");
	window.cityBuildings = city.selectAll("g")
		.data(buildings)
		.enter()
		.append("g")
		.attr("class", "building")
		.attr({
			x: function (d) { return d.x; },
			y: function (d) { return d.y; },
			width: function (d) { return d.width; },
			height: function (d) { return d.height; },
			//fill: "url('images/stressed_linen.png')"
			fill: "gray"
		})
		.transition()
		.delay(500)
		.ease("cubic-out")
		.duration(1000)
		.attr("y", function() {
			return 0 - d3.select(this).attr("height");
		});

	cityBuildings[0].forEach(function(d, i) {
		d3.select(d).selectAll("rect")
			.data(buildings[i].windows)
			.append("rect")
			.attr("class", "window")
			.attr({
				width: windowWidth,
				height: windowHeight
			});
	});

//})();

