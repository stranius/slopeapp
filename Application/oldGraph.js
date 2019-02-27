class Graph {
	constructor(r, c) {
		this.svg = d3.select("#applet svg");
		this.container = this.svg.append('g');
		this.endPointA = {x: 1, y: 9};
		this.endPointB = {x: 9, y: 1};
		//Declare the groups for each unique set of objects
		this.graph_container = this.container.append("g");
		this.graph_details = this.container.append('g');
		this.dxdy = this.graph_details.append('g');
		this.formulas = this.graph_details.append('g');
		this.texts = this.graph_details.append('g');
		this.slopeLine = this.container.append("g");
		this.handles = this.container.append("g");
		//Handle the rest of the information to be stored in the Graph
		this.scale = 55;
		this.offset = {x: 80, y: 30};
		this.max_values = {x: 20, y: 40};
		this.min_values = {x: 0, y: 0};
		this.formula = {slope: 0, y_intercept: 0, x_intercept: 0};
		this.text_sizes = {large: this.scale / 4 * 3, normal: this.scale / 5 * 2, small: this.scale / 7 * 2};
		this.numRows = r;
		this.numCols = c;
		this.unit_per_square = {x: (this.max_values.x / this.numCols), y: (this.max_values.y / this.numRows)};
		this.x_axis_label = "x-axis";
		this.x_units = 'Undefined';
		this.y_axis_label = "y-axis";
		this.y_units = 'Undefines';

		this.createGraph();
		this.createLabels(this.x_axis_label, this.y_axis_label);
		this.createSublines(2, 2);
		this.createHandle(this.endPointA, '#30c1ff');
		this.createHandle(this.endPointB, '#218cff');
		this.update();
	}

	getSlope() {
		return this.formula.slope;
	}

	change_x_axis_label(label, units) {
		this.x_axis_label = label;
		this.x_units = units;
		this.createLabels(this.x_axis_label, this.y_axis_label);
	}

	change_y_axis_label(label, units) {
		this.y_axis_label = label;
		this.y_units = units;
		this.createLabels(this.x_axis_label, this.y_axis_label);
	}

	//This function creates the graph to be drawn
	createGraph() {
		for(let i = 0; i < this.numRows; i++) {
			for(let j = 0; j < this.numCols; j++) {
				let line = this.graph_container.append('rect')
					.attr('transform', `translate(${i * this.scale + this.offset.x} ${j * this.scale + this.offset.y})`)
					.attr('width', this.scale)
					.attr('height', this.scale)
					.attr('fill', 'white')
					.attr('stroke', 'gray')
					.attr('stroke-opacity', .3);
			}
		}
		//Now create the details such as bolded x and y lines, labeling, etc.
		this.graph_details.append('line') //Left side line
			.attr('x1', this.offset.x)
			.attr('y1', this.offset.y)
			.attr('x2', this.offset.x)
			.attr('y2', this.numRows * this.scale + this.offset.y)
			.attr('stroke-width', 1.5)
			.attr('stroke', '#3f3f3f');
		this.graph_details.append('line') //Botton line
			.attr('x1', this.offset.x)
			.attr('y1', this.numRows * this.scale + this.offset.y)
			.attr('x2', this.numRows * this.scale + this.offset.x)
			.attr('y2', this.numRows * this.scale + this.offset.y)
			.attr('stroke-width', 1.5)
			.attr('stroke', '#3f3f3f');
	}

	//Creates sublines amount of lines along the x and y axis
	createSublines(every_x, every_y) {
		//Loop for making the lines along the x axis
		for(let i = 0; i <= this.numCols; i+=every_x) {
			this.graph_details.append('line') //Bottom lines of the graph
				.attr('x1', i * this.scale + this.offset.x)
				.attr('y1', this.numCols * this.scale + this.offset.y)
				.attr('x2', i * this.scale + this.offset.x)
				.attr('y2', this.numCols * this.scale + this.offset.y + this.scale / 3)
				.attr('stroke-width', 1.5)
				.attr('stroke', '#3f3f3f');
			this.graph_details.append('text') //Text below the lines on the bottom on the graph
				.attr('x', i * this.scale + this.offset.x + this.scale / 10)
				.attr('y', this.numCols * this.scale + this.offset.y + this.scale / 2)
				.attr('font-family', 'sans-serif')
				.attr('font-size', this.text_sizes.normal)
				.text(this.max_values.x / this.numCols * i);
		}
		for(let i = 0; i <= this.numRows; i+=every_y) {
			this.graph_details.append('line') //Left side lines of the graph
				.attr('x1', this.offset.x - this.scale / 3)
				.attr('y1', i * this.scale + this.offset.y)
				.attr('x2', this.offset.x)
				.attr('y2', i * this.scale + this.offset.y)
				.attr('stroke-width', 1.5)
				.attr('stroke', '#3f3f3f');
			this.graph_details.append('text') //Text on the left side lines of the graph
				.attr('x', this.offset.x - this.scale / 2)
				.attr('y', i * this.scale + this.offset.y - this.scale / 10)
				.attr('font-family', 'sans-serif')
				.attr('font-size', this.text_sizes.normal)
				.text(this.max_values.y - this.max_values.y / this.numRows * i);
		}
	}

	//This function creates a handle to grab and drag across the graph
	createHandle(point, color) {
		let graph = this;
		let moving = false;
		if(color == undefined) {
			color = '#6ba2f9';
		}
		let circle = this.handles.append("circle")
			.attr('class', 'draggable')
			.attr('r', this.scale*.15)
			.attr('fill', color)
			.on('mouseenter', function() {
				d3.select(this)
					.transition()
					.attr('r', graph.scale*.3);
			})
			.on('touchstart', function() {
				d3.select(this)
					.transition()
					.attr('r', graph.scale*.3);
			})
			.on('mouseleave', function() {
				if(!moving) {
					d3.select(this)
					.transition()
					.attr('r', graph.scale*.15);
				}
			})
			.on('touchend', function() {
				d3.select(this)
					.transition()
					.attr('r', graph.scale*.15);
			})
			.on('touchmove', onDrag)
			.call(d3.drag().on('drag', onDrag).on('end', function() {
				moving = false;
				d3.select(this)
				.transition()
				.attr('r', graph.scale*.15);
			}));

		//This updates the circles attribute for where it's actually drawing on the screen
		function updatePosition() {
			circle.attr('transform', `translate(${point.x * graph.scale + graph.offset.x} ${point.y * graph.scale + graph.offset.y})`);
		}

		//The function that gets called when dragging the circle on the screen
		function onDrag() {
			//Gets the top left corner of square that you're in (x, y)
			moving = true;
			let x_check = Math.floor((d3.event.x - graph.offset.x + graph.scale / 2) / graph.scale);
			let y_check = Math.floor((d3.event.y - graph.offset.y + graph.scale / 2) / graph.scale);
			if(x_check <= 0) {
				point.x = 0;
			} else if(x_check >= graph.numCols) {
				point.x = graph.numCols;
			} else {
				point.x = x_check;
			}
			if(y_check <= 0) {
				point.y = 0;
			} else if(y_check >= graph.numRows) {
				point.y = graph.numRows;
			} else {
				point.y = y_check;
			}
			updatePosition();
			graph.update();
		}

		updatePosition();
	}

	//Create the d(x) and d(y) lines
	dxdy_lines() {
		//Now add the lines and text underneath and on the side of the slope line so show d(x) and d(y)
		let oldLines = this.dxdy.selectAll('line');
		oldLines.remove();
		let oldText = this.dxdy.selectAll('text');
		oldText.remove();
		//Line for d(x)
		let left = this.endPointA, right = this.endPointB;
		let high = this.endPointA, low = this.endPointB;
		if(this.endPointB.x < this.endPointA.x) {
			left = this.endPointB;
			right = this.endPointA;
		}
		if(this.endPointA.y > this.endPointB.y) {
			low = this.endPointA;
			high = this.endPointB;
		}
		//Dealing with the bottom d(x) lines and text
		this.dxdy.append('line') //Bottom Left x line
			.attr('x1', left.x * this.scale + this.offset.x)
			.attr('y1', low.y * this.scale + this.offset.y + this.scale / 3)
			.attr('x2', left.x * this.scale + this.offset.x)
			.attr('y2', low.y * this.scale + this.offset.y + this.scale / 3 * 2)
			.attr('stroke', '#595959');
		this.dxdy.append('line') //Bottom Right x line
			.attr('x1', right.x * this.scale + this.offset.x)
			.attr('y1', low.y * this.scale + this.offset.y + this.scale / 3)
			.attr('x2', right.x * this.scale + this.offset.x)
			.attr('y2', low.y * this.scale + this.offset.y + this.scale / 3 * 2)
			.attr('stroke', '#595959');
		this.dxdy.append('line') //Bottom x line
			.attr('x1', left.x * this.scale + this.offset.x)
			.attr('y1', low.y * this.scale + this.offset.y + this.scale / 2)
			.attr('x2', right.x * this.scale + this.offset.x)
			.attr('y2', low.y * this.scale + this.offset.y + this.scale / 2)
			.attr('stroke', '#595959');
		this.dxdy.append('text')
			.attr('x', (left.x * this.scale + this.offset.x) + (right.x - left.x) * this.scale / 2 - 5)
			.attr('y', low.y * this.scale + this.offset.y + this.scale)
			.attr('font-family', 'sans-serif')
			.attr('font-size', this.text_sizes.normal)
			.text(Number(Math.abs(left.x - right.x) * this.unit_per_square.x).toFixed(0));

		//Dealing with the side d(y) lines and text
		let side = left;
		let side_multiplier = -1;
		if(left.y > right.y) { //Find out which side to draw this line on
			side = right;
			side_multiplier = 1;
		}
		this.dxdy.append('line') //Top Side y line
			.attr('x1', side.x * this.scale + this.offset.x + this.scale / 3 * 2 * side_multiplier)
			.attr('y1', high.y * this.scale + this.offset.y)
			.attr('x2', side.x * this.scale + this.offset.x + this.scale / 3 * side_multiplier)
			.attr('y2', high.y * this.scale + this.offset.y)
			.attr('stroke', '#595959');
		this.dxdy.append('line') //Bottom Side y line
			.attr('x1', side.x * this.scale + this.offset.x + this.scale / 3 * 2 * side_multiplier)
			.attr('y1', low.y * this.scale + this.offset.y)
			.attr('x2', side.x * this.scale + this.offset.x + this.scale / 3 * side_multiplier)
			.attr('y2', low.y * this.scale + this.offset.y)
			.attr('stroke', '#595959');
		this.dxdy.append('line') //Side y line
			.attr('x1', side.x * this.scale + this.offset.x + this.scale / 2 * side_multiplier)
			.attr('y1', high.y * this.scale + this.offset.y)
			.attr('x2', side.x * this.scale + this.offset.x + this.scale / 2 * side_multiplier)
			.attr('y2', low.y * this.scale + this.offset.y)
			.attr('stroke', '#595959');
		this.dxdy.append('text')
			.attr('x', (side.x * this.scale + this.offset.x + this.scale * side_multiplier))
			.attr('y', (high.y * this.scale + this.offset.y) + (low.y - high.y) * this.scale / 2)
			.attr('font-family', 'sans-serif')
			.attr('font-size', this.text_sizes.normal)
			.text(Number(Math.abs(low.y - high.y) * this.unit_per_square.y).toFixed(0));
	}

	//Creates the labels for the x-axis and y-axis
	createLabels(x_label, y_label) {
		let oldText = this.texts.selectAll('text');
		oldText.remove();
		this.texts.append('text')
			.attr('x', this.offset.x + this.scale * this.numCols / 2 - this.scale)
			.attr('y', this.offset.y + (this.scale * this.numRows) + this.scale)
			.attr('font-family', 'sans-serif')
			.attr('font-size', this.text_sizes.normal)
			.text(x_label);
		this.texts.append('text')
			.attr('transform', `rotate(-90)`)
			.attr('x', -(this.offset.y + (this.scale * this.numRows) / 2 + this.scale))
			.attr('y', this.offset.x - this.scale)
			.attr('font-family', 'sans-serif')
			.attr('font-size', this.text_sizes.normal)
			.text(y_label);
	}

	//Updates the formulas
	updateFormulas() {
		let oldTexts = this.formulas.selectAll('text');
		oldTexts.remove();
		this.formulas.append('text')
			.attr('x', this.offset.x + (this.scale * this.numRows) + 30)
			.attr('y', this.offset.y + this.scale * 2)
			.attr('font-family', 'sans-serif')
			.attr('font-size', this.text_sizes.normal)
			.text('y = mx + b');
		let sign = this.formula.y_intercept < 0 ? '' : '+';
		this.formulas.append('text')
			.attr('x', this.offset.x + (this.scale * this.numRows) + 30)
			.attr('y', this.offset.y + this.scale * 3)
			.attr('font-family', 'sans-serif')
			.attr('font-size', this.text_sizes.normal)
			.text('m = ' + Number(this.formula.slope.toFixed(2)));
		this.formulas.append('text')
			.attr('x', this.offset.x + (this.scale * this.numRows) + 30)
			.attr('y', this.offset.y + this.scale * 4)
			.attr('font-family', 'sans-serif')
			.attr('font-size', this.text_sizes.normal)
			.text('b = ' + Number(this.formula.y_intercept.toFixed(2)));
		this.formulas.append('text')
			.attr('x', this.offset.x + (this.scale * this.numRows) + 30)
			.attr('y', this.offset.y + 20)
			.attr('font-family', 'sans-serif')
			.attr('font-size', this.text_sizes.normal)
			.attr('contentEditable', true)
			.text('If John can run ' + Number(this.formula.slope.toFixed(2)) + ' ' + this.y_units + ' / ' + this.x_units + ', how far has John traveled after ' + Number(Math.abs(this.endPointA.x - this.endPointB.x) * this.unit_per_square.x).toFixed(0) + ' ' + this.x_units + '?')
			.call(wrap, this.scale * 10);

	}

	//Updates the inforamtion inside of Graph
	update() {
		//Update the functions slope and y-axis intercept
		this.formula.slope = -((this.endPointB.y - this.endPointA.y) * this.unit_per_square.y) / ((this.endPointB.x - this.endPointA.x) * this.unit_per_square.x); //Inverse the slope because 0,0 starts at top left, not bottom left
		this.formula.y_intercept = -(this.formula.slope * this.endPointA.x - (this.numRows - this.endPointA.y)); //Inverse the slope because 0,0 starts at top left, not bottom left
		this.formula.x_intercept = 0;
		//Update the line that connects the two points
		let lines = this.slopeLine.selectAll('line');
		lines.remove();
		this.slopeLine.append("line")
			.attr('x1', this.endPointA.x * this.scale + this.offset.x)
			.attr('y1', this.endPointA.y * this.scale + this.offset.y)
			.attr('x2', this.endPointB.x * this.scale + this.offset.x)
			.attr('y2', this.endPointB.y * this.scale + this.offset.y)
			.attr('stroke', 'black');


		//Update the formula
		this.updateFormulas();

		this.dxdy_lines();
	}
}

//Function for wrapping text to certain bounds on screen
function wrap(text, width) {
    text.each(function () {
        var text = d3.select(this),
            words = text.text().split(/\s+/).reverse(),
            word,
            line = [],
            lineNumber = 0,
            lineHeight = 1.1, // ems
            x = text.attr("x"),
            y = text.attr("y"),
            dy = 0, //parseFloat(text.attr("dy")),
            tspan = text.text(null)
                        .append("tspan")
                        .attr("x", x)
                        .attr("y", y)
                        .attr("dy", dy + "em");
        while (word = words.pop()) {
            line.push(word);
            tspan.text(line.join(" "));
            if (tspan.node().getComputedTextLength() > width) {
                line.pop();
                tspan.text(line.join(" "));
                line = [word];
                tspan = text.append("tspan")
                            .attr("x", x)
                            .attr("y", y)
                            .attr("dy", ++lineNumber * lineHeight + dy + "em")
                            .text(word);
            }
        }
    });
}
