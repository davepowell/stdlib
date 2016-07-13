# Plotting

---

# Exploratory Data Analysis

The first, and most important, element of numeric computing.

---

# History

---

# Playfair

![Playfair](/img/william_playfair_time_series.png)

---

# Minard

![Minard](/img/minard_napoleans_march.png)

---

# Nightingale

[coxcomb](https://github.com/stdlib-js/stdlib/tree/develop/lib/node_modules/%40stdlib/datasets/nightingales-rose)

---

# Modern Day

---

# Spreadsheets

[example](https://docs.google.com/spreadsheets/d/1YCSgTTZRPdIv0nDZmEeD_ERxs-rFczFtVdb1bmX7zM8/edit#gid=0)

---

# MATLAB

``` matlab
figure
plot( linspace(0,10), randn(10) );
ylabel( 'random numbers' );
```

---

# gnuplot

``` text
set title "Some Math Functions"
set xrange [-10:10]
set yrange [-2:2]
set zeroaxis
plot (x/4)**2, sin(x), 1/x
```

---

# Python

``` python
import matplotlib.pyplot as plt
plt.plot([1,2,3,4])
plt.ylabel('some numbers')
plt.show()
```

---

# R

``` r
plot( 1:10, 1:10, ylab="some numbers" )
```

---

# Julia

``` julia
Pkg.add( "PyPlot" );
using PyPlot

x = linspace( 0, 2*pi, 1000 );
y = sin( 3*x + 4*cos(2*x) );

plot( x, y, color="red", linewidth=2.0, linestyle="--" );
```

---

# Web

---

* Rendering engine
* Performance
* Distribution
* Ubiquity

---

# Raphael

[SVG](http://dmitrybaranovskiy.github.io/raphael/analytics.html)


---

# Processing

[example](https://processing.org/examples/sinewave.html)


---

# Highcharts

[example](http://jsfiddle.net/gh/get/jquery/1.9.1/highslide-software/highcharts.com/tree/master/samples/highcharts/demo/line-basic/)


---

# Protovis

[example](http://mbostock.github.io/protovis/ex/line.html)


---

# Crossfilter

[demo](http://square.github.io/crossfilter/)


---

# D3

[gallery](https://github.com/d3/d3/wiki/Gallery)

[example](http://bl.ocks.org/mbostock/3883245)

``` javascript
var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var formatDate = d3.time.format("%d-%b-%y");

var x = d3.time.scale()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var line = d3.svg.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.close); });

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.tsv("data.tsv", type, function(error, data) {
  if (error) throw error;

  x.domain(d3.extent(data, function(d) { return d.date; }));
  y.domain(d3.extent(data, function(d) { return d.close; }));

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Price ($)");

  svg.append("path")
      .datum(data)
      .attr("class", "line")
      .attr("d", line);
});

function type(d) {
  d.date = formatDate.parse(d.date);
  d.close = +d.close;
  return d;
}
```

---

# Vega

[example](http://vega.github.io/vega-editor/index.html?spec=index_chart)

[polestar](https://vega.github.io/polestar/)

[Lyra](https://github.com/vega/lyra)


---

# MetricsGraphics

[example](http://metricsgraphicsjs.org/examples.htm)

``` javascript
data = MG.convert.date( data, 'date' );
MG.data_graphic({
    'title': 'Line Plot',
    'description': 'Description.',
    'data': data,
    'width': 600,
    'height': 200,
    'right': 40,
    'target': document.getElementById( 'plot' ),
    'x_accessor': 'date',
    'y_accessor': 'value'
});
```

---

# Plot.ly

[demo](https://plot.ly/javascript/)

---

EOF