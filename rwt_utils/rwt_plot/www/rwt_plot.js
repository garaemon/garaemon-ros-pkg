// rwt_plot.js

// jquery, jquery.flot, lodash.js and roslib.js are required to be loaded before.

// class
ROSLIB.RWTPlot = function(spec) {
    this.max_data = spec.max_data || 100; // defaults to 100
    this.data = [];
    this.plot = null;
};

ROSLIB.RWTPlot.prototype.initializePlot = function($content, spec, data) {
    // creating plot object integrating with jquery object
    // `spec' is the spec for jquery.flot
    var default_y_axis = {
        min: 0,
        //max: 1.0,
        show: true
    };
    var default_x_axis = {
        min: 0,
        max: this.max_data,
        show: true
    };
    var spec_x_axis = _.extend(default_x_axis, spec.xaxis || {});
    var spec_y_axis = _.extend(default_y_axis, spec.yaxis || {});
    if (spec_x_axis.auto_scale) {
        this.x_auto_scale = true;
        spec_x_axis.min = null;
        spec_x_axis.max = null;
    }
    if (spec_y_axis.auto_scale) {
        this.y_auto_scale = true;
        spec_y_axis.min = null;
        spec_y_axis.max = null;
    }
    var new_spec = _.extend(spec, {xaxis: spec_x_axis, yaxis: spec_y_axis});
    this.plot = $.plot($content, [[[0, 200]]], new_spec);
};

ROSLIB.RWTPlot.prototype.addData = function(data) {
    // cut this.data if the data is longer than this.max_data
    if (this.data.length > this.max_data) {
        this.data = this.data.slice(1);
    }

    // check the dimension
    var data_dimension = _.isArray(data) ? data.length : 1;
    if (data_dimension == 1)
        data = [data];          // force to encapsulate into array
    this.data.push(data);

    // auto scalling
    
    var plot_data = [];
    // plot_data := [[[x1, y1], [x1, y2], [x1, y3], ...], [[x1, z1], [x1, z2], ...], ...]
    for (var i = 0; i < this.data.length; i++) { // x_i := i
        for (var j = 0; j < this.data[i].length; j++) {
            var value = this.data[i][j];
            var new_data = [i, value]; // [x1, y1] or [x1, z1]
            if (!(plot_data.length > j)) {
                // adding new empty array to plot_data
                plot_data.push([]);
            }
            plot_data[j].push(new_data);
        }
    }
    if (this.plot) {
        this.plot.setData(plot_data);
    }
};

ROSLIB.RWTPlot.prototype.draw = function() {
    if (this.plot) {
        this.plot.setupGrid();
        this.plot.draw();
    }
};
