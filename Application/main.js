let footer = new Footer();
let graph = new Graph(10, 10, footer); //Create a new instance of a graph with rows and columns
footer.setGraph(graph);
graph.change_x_axis_label('Time');
graph.change_y_axis_label('Distance');
graph.change_x_axis_unit('Seconds');
graph.change_y_axis_unit('Meters');

let sidebar = new Sidebar(graph);
