class Sidebar {
  constructor(graph) {
    this.graph = graph;
    this.div = d3.select('#applet svg');
    this.container = this.div.append('g');
    this.formula_in_text = 'y = mx + b';
    this.background_elements = this.container.append('g');
    this.slop = graph.slope;
    this.graph_size = graph.scale;
    this.num_rows = graph.numRows;
    this.num_cols = graph.numCols;
    this.max_values = {x: graph.max_values.x, y: graph.max_values.y}
    this.min_values = {x: graph.min_values.x, y: graph.min_values.y}

    this.initialize_content();
  }

  initialize_content() {
    //Create the text and input elements
    let fo = this.background_elements.append('foreignObject') //the foreignObject for the HTML input elements to go in
      .attr('x', '70%')
      .attr('y', '0')
      .attr('width', '30%')
      .attr('height', '100%');
    let sidebar_div = fo.append('xhtml:div') //Div to hold all of the inputs
      .attr('class', 'sidebar')
      .attr('xmlns', 'http://www.w3.org/1999/xhtml');


    let holder = sidebar_div.append('xhtml:div') //Div to hold all of the inputs
      .attr('class', 'sidebar_box')
      .attr('xmlns', 'http://www.w3.org/1999/xhtml');
    holder.append('text') //Graph Size
      .attr('font-family', 'sans-serif')
      .attr('font-size', 20)
      .attr('class', 'sidebar_text')
      .text('Graph Size');
    holder.append('input') //Graph Size
      .attr('x', 30)
      .attr('y', 50)
      .attr('max', 3)
      .attr('min', 1)
      .attr('width', '40%')
      .attr('font-family', 'sans-serif')
      .attr('font-size', 20)
      .attr('class', 'sidebar_input')
      .attr('type', 'number')
      .attr('value', this.graph_size / 100 - 3)
      .on('input', function() {
        let numToPass = this.value;
        if(this.value <= 0)
          numToPass = 1;
        else if(this.value > 3) {
          this.value = 3;
          numToPass = 3;
        }
        graph.change_graph_size(Number(numToPass) + 3);
      });

    //Div for graphs x-axis labeling
    holder = sidebar_div.append('xhtml:div') //Div to hold all of the inputs
      .attr('class', 'sidebar_box')
      .attr('xmlns', 'http://www.w3.org/1999/xhtml');
    holder.append('text') //Graph Size
      .attr('font-family', 'sans-serif')
      .attr('font-size', 20)
      .attr('class', 'sidebar_text')
      .text('x-axis label');
     holder.append('input') //Graph Size
      .attr('font-family', 'sans-serif')
      .attr('font-size', 20)
      .attr('class', 'sidebar_input')
      .attr('type', 'string')
      .attr('value', this.graph.x_axis_label)
      .on('input', function() {
        graph.change_x_axis_label(this.value);
      });

    //Div for graphs y-axis labeling
    holder = sidebar_div.append('xhtml:div') //Div to hold all of the inputs
      .attr('class', 'sidebar_box')
      .attr('xmlns', 'http://www.w3.org/1999/xhtml');
    holder.append('text') //Graph Size
      .attr('font-family', 'sans-serif')
      .attr('font-size', 20)
      .attr('class', 'sidebar_text')
      .text('y-axis label');
    holder.append('input') //Graph Size
      .attr('font-family', 'sans-serif')
      .attr('font-size', 20)
      .attr('class', 'sidebar_input')
      .attr('type', 'string')
      .attr('value', this.graph.y_axis_label)
      .on('input', function() {
        graph.change_y_axis_label(this.value);
      });

    //Div for graphs x-axis units
    holder = sidebar_div.append('xhtml:div') //Div to hold all of the inputs
      .attr('class', 'sidebar_box')
      .attr('xmlns', 'http://www.w3.org/1999/xhtml');
    holder.append('text') //Graph Size
      .attr('font-family', 'sans-serif')
      .attr('font-size', 20)
      .attr('class', 'sidebar_text')
      .text('x-axis units');
    holder.append('input') //Graph Size
      .attr('font-family', 'sans-serif')
      .attr('font-size', 20)
      .attr('class', 'sidebar_input')
      .attr('type', 'string')
      .attr('value', this.graph.x_units)
      .on('input', function() {
        graph.change_x_axis_unit(this.value);
      });

    //Div for graphs y-axis units
    holder = sidebar_div.append('xhtml:div') //Div to hold all of the inputs
      .attr('class', 'sidebar_box')
      .attr('xmlns', 'http://www.w3.org/1999/xhtml');
    holder.append('text') //Graph Size
      .attr('font-family', 'sans-serif')
      .attr('font-size', 20)
      .attr('class', 'sidebar_text')
      .text('y-axis units');
    holder.append('input') //Graph Size
      .attr('font-family', 'sans-serif')
      .attr('font-size', 20)
      .attr('class', 'sidebar_input')
      .attr('type', 'string')
      .attr('value', this.graph.y_units)
      .on('input', function() {
        graph.change_y_axis_unit(this.value);
      });

    //Div for changing the graphs x-max
    holder = sidebar_div.append('xhtml:div') //Div to hold all of the inputs
      .attr('class', 'sidebar_box')
      .attr('xmlns', 'http://www.w3.org/1999/xhtml');
    holder.append('text') //Graph Size
      .attr('font-family', 'sans-serif')
      .attr('font-size', 20)
      .attr('class', 'sidebar_text')
      .text('x-max');
    holder.append('input') //Graph Size
      .attr('font-family', 'sans-serif')
      .attr('font-size', 20)
      .attr('class', 'sidebar_input')
      .attr('type', 'number')
      .attr('value', this.graph.max_values.x)
      .on('input', function() {
        graph.change_x_max(this.value);
      });

    //Div for changing the graphs x-min
    holder = sidebar_div.append('xhtml:div') //Div to hold all of the inputs
      .attr('class', 'sidebar_box')
      .attr('xmlns', 'http://www.w3.org/1999/xhtml');
    holder.append('text') //Graph Size
      .attr('font-family', 'sans-serif')
      .attr('font-size', 20)
      .attr('class', 'sidebar_text')
      .text('x-min');
    holder.append('input') //Graph Size
      .attr('font-family', 'sans-serif')
      .attr('font-size', 20)
      .attr('class', 'sidebar_input')
      .attr('type', 'number')
      .attr('value', this.graph.min_values.x)
      .on('input', function() {
        graph.change_x_min(this.value);
      });

    //Div for changing the graphs y-max
    holder = sidebar_div.append('xhtml:div') //Div to hold all of the inputs
      .attr('class', 'sidebar_box')
      .attr('xmlns', 'http://www.w3.org/1999/xhtml');
    holder.append('text') //Graph Size
      .attr('font-family', 'sans-serif')
      .attr('font-size', 20)
      .attr('class', 'sidebar_text')
      .text('y-max');
    holder.append('input') //Graph Size
      .attr('font-family', 'sans-serif')
      .attr('font-size', 20)
      .attr('class', 'sidebar_input')
      .attr('type', 'number')
      .attr('value', this.graph.max_values.y)
      .on('input', function() {
        graph.change_y_max(this.value);
      });

    //Div for changing the graphs y-min
    holder = sidebar_div.append('xhtml:div') //Div to hold all of the inputs
      .attr('class', 'sidebar_box')
      .attr('xmlns', 'http://www.w3.org/1999/xhtml');
    holder.append('text') //Graph Size
      .attr('font-family', 'sans-serif')
      .attr('font-size', 20)
      .attr('class', 'sidebar_text')
      .text('y-min');
    holder.append('input') //Graph Size
      .attr('font-family', 'sans-serif')
      .attr('font-size', 20)
      .attr('class', 'sidebar_input')
      .attr('type', 'number')
      .attr('value', this.graph.min_values.y)
      .on('input', function() {
        graph.change_y_min(this.value);
      });
  }
}

function rightRoundedRect(x, y, width, height, radius) {
  return "M" + x + "," + y
       + "h" + (width - radius)
       + "a" + radius + "," + radius + " 0 0 1 " + radius + "," + radius
       + "v" + (height - 2 * radius)
       + "a" + radius + "," + radius + " 0 0 1 " + -radius + "," + radius
       + "h" + (radius - width)
       + "z";
}
