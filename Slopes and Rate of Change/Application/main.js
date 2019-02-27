let graph = new Graph(10, 10); //Create a new instance of a graph with rows and columns
graph.change_x_axis_label('Time (Seconds)', 'seconds');
graph.change_y_axis_label('Distance (Meters)', 'meters');

let sidebar = new Sidebar(graph);
