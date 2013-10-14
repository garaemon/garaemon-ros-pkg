$(function() {
    var plot = new ROSLIB.RWTPlot({
        max_data: 100
    });
    plot.initializePlot("#plot-area", {
        yaxis: {
            max: 100
        }
    });
    for (var i = 0; i < 100; i++)
        plot.addData(i);
    plot.draw();
});