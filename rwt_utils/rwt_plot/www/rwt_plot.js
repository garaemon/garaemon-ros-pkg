// rwt_plot.js

// jquery, jquery.flot, lodash.js and roslib.js are required to be loaded before.

// class
ROSLIB.RWTPlot = function(spec) {
    this.max_data = spec.max_data || 100; // defaults to 100
    this.data = [];
    this.plot = null;
};

ROSLIB.RWTPlot.prototype.initializePlot = function($content, spec) {
    // creating plot object integrating with jquery object
    // `spec' is the spec for jquery.flot
    var default_y_axis = {
        min: 0,
        max: 1.0,
        show: true
    };
    var default_x_axis = {
        min: 0,
        max: this.max_data,
        show: true
    };
    var spec_x_axis = _.extend(default_x_axis, spec.xaxis || {});
    var spec_y_axis = _.extend(default_y_axis, spec.yaxis || {});
    var new_spec = _.extend(spec, {xaxis: spec_x_axis, yaxis: spec_y_axis});
    this.plot = $.plot($content, [], new_spec);
};

ROSLIB.RWTPlot.prototype.addData = function(data) {
    // cut this.data if the data is longer than this.max_data
    if (this.data.length > this.max_data) {
        this.data = this.data.slice(1);
    }
    this.data.push(data);
    var plot_data = [];
    for (var i = 0; i < this.data.length; i++) {
        plot_data.push([i, this.data[i]]);
    }
    if (this.plot) {
        this.plot.setData([plot_data]);
    }
};

ROSLIB.RWTPlot.prototype.draw = function() {
    if (this.plot)
        this.plot.draw();
};
