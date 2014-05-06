function DonutChart(element, options) {
  this.options = options;
  this.archtype = Raphael(element, options.width, options.height);
  this.archtype.customAttributes.arc = function(xloc, yloc, value, total, R) {
    var alpha = 360 / total * (total-value),
    a = (90 - alpha) * Math.PI / 180,
    x = xloc - R * Math.cos(a),
    y = yloc - R * Math.sin(a),
    path;
    if (total == value) {
      path = [
        ["M", xloc, yloc - R],
        ["A", R, R, 0, 1, 1, xloc - 0.01, yloc - R]
      ];
    } else {
      path = [
        ["M", xloc, yloc - R],
        ["A", R, R, 0, +(alpha < 180), 1, x, y]
      ];
    }
    return {
      path: path
    };
  };
}

DonutChart.prototype.draw = function(value) {
  this.archtype.path().attr({
    "stroke": this.options.barColor,
    "stroke-width": this.options.lineWidth-2,
    arc: [parseInt(this.options.width)/2,parseInt(this.options.height)/2, 100, 100, this.options.radius]
  });

  var arc = this.archtype.path().attr({
    "stroke": this.options.trackColor,
    "stroke-width": this.options.lineWidth,
    arc: [parseInt(this.options.width)/2,parseInt(this.options.height)/2, 100, 100, this.options.radius]
  });

  arc.animate({
    arc: [parseInt(this.options.width)/2,parseInt(this.options.height)/2, 100-value, 100, this.options.radius]
  }, this.options.animate, "linear");
}