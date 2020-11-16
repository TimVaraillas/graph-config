<template>
  <v-container id="map-container">
    <v-card-title>Sentiment de sécurité des habitants de chaque pays en 2018</v-card-title>
    <v-card-subtitle>(source : Gallup Report 2018 - Global Law and Order)</v-card-subtitle>
    <div id="map"></div>
  </v-container>
</template>

<script>
import * as d3 from 'd3';

export default {
  name: 'Map',
  data() {
    return {
      width: 0,
      height: 800,
      legendCellSize: 30,
      colors: ['#d4eac7', '#c6e3b5', '#b7dda2', '#a9d68f', '#9bcf7d', '#8cc86a', '#7ec157', '#77be4e', '#70ba45', '#65a83e', '#599537', '#4e8230', '#437029', '#385d22', '#2d4a1c', '#223815']
    };
  },
  mounted() {
    this.width = document.getElementById("map-container").offsetWidth * 0.95;
    this.svg = d3.select('#map').append("svg")
      .attr("id", "svg")
      .attr("width", this.width)
      .attr("height", this.height)
      .attr("class", "svg");

    this.createDataViz();
  },
  methods: {
    createDataViz() {
      let projection = d3.geoNaturalEarth1().scale(1).translate([0, 0]);
      let path = d3.geoPath().pointRadius(2).projection(projection);
      let cGroup = this.svg.append("g");

      let promises = [
        d3.json("world-countries-no-antartica.json"),
        d3.csv("data.csv")
      ];

      Promise.all(promises).then((values) => {
        let geojson = values[0];
        let scores = values[1];

        let b  = path.bounds(geojson),
            s = .80 / Math.max((b[1][0] - b[0][0]) / this.width, (b[1][1] - b[0][1]) / this.height),
            t = [(this.width - s * (b[1][0] + b[0][0])) / 2, (this.height - s * (b[1][1] + b[0][1])) / 2];

        projection.scale(s).translate(t);
        
        cGroup.selectAll("path")
            .data(geojson.features)
            .enter()
            .append("path")
            .attr("d", path)
            .attr("id", d => "code" + d.id)
            .attr("class", "country");
              
          // Traitement du fichier CSV réalisé ici
          let min = d3.min(scores, d =>  +d.score),
              max = d3.max(scores, d =>  +d.score);

          let quantile = d3.scaleQuantile().domain([min, max])
            .range(this.colors);

          let legend = this.addLegend(min, max);
          let tooltip = this.addTooltip();

          scores.forEach(country => {
            var countryPath = d3.select("#code" + country.code);
            countryPath
              .attr("scorecolor", quantile(+country.score))
              .style("fill", quantile(+country.score))
              .on("mouseover", () => {
                  countryPath.style("fill", "#9966cc");
                  tooltip.style("display", null);
                  tooltip.select('#tooltip-country').text(this.shortCountryName(country.frenchCountry));
                  tooltip.select('#tooltip-score').text(country.score);
                  legend.select("#cursor")
                      .attr('transform', 'translate(' + (this.legendCellSize + 5) + ', ' + (this.getColorIndex(quantile(+country.score)) * this.legendCellSize) + ')')
                      .style("display", null);
              })
              .on("mouseout", () => {
                  countryPath.style("fill", quantile(+country.score));
                  tooltip.style("display", "none");
                  legend.select("#cursor").style("display", "none");
              });

        });
      });
    },

    addTooltip() {
      var tooltip = this.svg.append("g") // Group for the whole tooltip
        .attr("id", "tooltip")
        .style("display", "none");
      
      tooltip.append("polyline") // The rectangle containing the text, it is 210px width and 60 height
        .attr("points","0,0 210,0 210,60 0,60 0,0")
        .style("fill", "#222b1d")
        .style("stroke","black")
        .style("opacity","0.9")
        .style("stroke-width","1")
        .style("padding", "1em");
      
      tooltip.append("line") // A line inserted between country name and score
        .attr("x1", 40)
        .attr("y1", 25)
        .attr("x2", 160)
        .attr("y2", 25)
        .style("stroke","#929292")
        .style("stroke-width","0.5")
        .attr("transform", "translate(0, 5)");
      
      var text = tooltip.append("text") // Text that will contain all tspan (used for multilines)
        .style("font-size", "13px")
        .style("fill", "#c1d3b8")
        .attr("transform", "translate(0, 20)");
      
      text.append("tspan") // Country name udpated by its id
        .attr("x", 105) // ie, tooltip width / 2
        .attr("y", 0)
        .attr("id", "tooltip-country")
        .attr("text-anchor", "middle")
        .style("font-weight", "600")
        .style("font-size", "16px");
      
      text.append("tspan") // Fixed text
        .attr("x", 105) // ie, tooltip width / 2
        .attr("y", 30)
        .attr("text-anchor", "middle")
        .style("fill", "929292")
        .text("Score : ");
      
      text.append("tspan") // Score udpated by its id
        .attr("id", "tooltip-score")
        .style("fill","#c1d3b8")
        .style("font-weight", "bold");
      
      return tooltip;
    },

    addLegend(min, max) {
      let legend = this.svg.append('g')
        .attr('transform', 'translate(40, 50)');
    
      legend.selectAll()
        .data(d3.range(this.colors.length))
        .enter()
        .append('svg:rect')
        .attr('height', this.legendCellSize + 'px')
        .attr('width', this.legendCellSize + 'px')
        .attr('x', 5)
        .attr('y', d => d * this.legendCellSize)
        .style("fill", d => this.colors[d]);

      let legendScale = d3.scaleLinear().domain([min, max]) // replace [0,340] par [min,max]
        .range([0, this.colors.length * this.legendCellSize]);
        
      legend.append("g")
          .attr("class", "axis")
          .call(d3.axisLeft(legendScale));

      return legend;
    },

    shortCountryName(country) {
      return country.replace("Démocratique", "Dem.").replace("République", "Rep.");
    },

    getColorIndex(color) {
      for (var i = 0; i < this.colors.length; i++) {
        if (this.colors[i] === color) {
          return i;
        }
      }
      return -1;
    }
  }
}
</script>
