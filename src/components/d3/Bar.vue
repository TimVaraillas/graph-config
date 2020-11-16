<template>
  <v-container id="bar-container">
    <v-card-title>Pays les plus peuplés au monde</v-card-title>
    <v-card-subtitle>Nombre d'habitants</v-card-subtitle>
    <div id="bar"></div>
  </v-container>
</template>

<script>
import * as d3 from 'd3';

export default {
  name: 'Map',
  data() {
    return {
      width: 0,
      height: 500,
      margin: {top: 20, right: 60, bottom: 90, left: 120},
    };
  },
  mounted() {
    this.width = document.getElementById("bar-container").offsetWidth - (this.margin.left + this.margin.right);
    
    const x = d3.scaleBand().range([0, this.width]).padding(0.1);
    const y = d3.scaleLinear().range([this.height, 0]);

    const svg = d3.select("#bar").append("svg")
      .attr("id", "svg")
      .attr("width", this.width + this.margin.left + this.margin.right)
      .attr("height", this.height + this.margin.top + this.margin.bottom)
      .append("g")
      .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

    // const div = d3.select("body").append("div")
    //   .attr("class", "tooltip")         
    //   .style("opacity", 0);

    d3.json("countries-data.json").then((data) => {      // Conversion des caractères en nombres
      console.log(data)

      // Mise en relation du scale avec les données de notre fichier
      // Pour l'axe X, c'est la liste des pays
      // Pour l'axe Y, c'est le max des populations
      x.domain(data.map(d => d.country));
      y.domain([0, d3.max(data, d => d.population)]);
      
      // Ajout de l'axe X au SVG
      // Déplacement de l'axe horizontal et du futur texte (via la fonction translate) au bas du SVG
      // Selection des noeuds text, positionnement puis rotation
      svg.append("g")
          .attr("transform", "translate(0," + this.height + ")")
          .call(d3.axisBottom(x).tickSize(0))
          .selectAll("text")	
              .style("text-anchor", "end")
              .attr("dx", "-.8em")
              .attr("dy", ".15em")
              .attr("transform", "rotate(-65)");
      
      // Ajout de l'axe Y au SVG avec 6 éléments de légende en utilisant la fonction ticks (sinon D3JS en place autant qu'il peut).
      svg.append("g").call(d3.axisLeft(y).ticks(6));

      // Ajout des bars en utilisant les données de notre fichier data.tsv
      // La largeur de la barre est déterminée par la fonction x
      // La hauteur par la fonction y en tenant compte de la population
      // La gestion des events de la souris pour le popup
      svg.selectAll(".bar")
          .data(data)
          .enter().append("rect")
          .attr("class", "bar")
          .attr("x", d => x(d.country))
          .attr("width", x.bandwidth())
          .attr("y", d => y(d.population))
          .attr("height", d => this.height - y(d.population))
          .attr("fill", "#8cc86a")				
          // .on("mouseover", d => {
          //     div.transition().duration(200).style("opacity", .9);
          //     div.html("Population : " + d.population)
          //         .style("left", (d3.event.pageX + 10) + "px")     
          //         .style("top", (d3.event.pageY - 50) + "px");
          // })
          // .on("mouseout", () => {
          //     div.transition().duration(500).style("opacity", 0);
          // });
    });
  },
  methods: {

  }
}
</script>
