<template>
  <v-container id="chart-container">
    
    
    <div class="chart">
      <section v-for="(serie, i) in series" :key="i">
        <apexchart type="radialBar" height="450" :options="vOptions(i)" :series="vSeries(i)"></apexchart>
      </section>
    </div>
  </v-container>
</template>

<script>

import VueApexCharts from 'vue-apexcharts'

export default {
  name: 'gauge',
  components: { apexchart: VueApexCharts },
  props: {
    title: {
      type: String,
    },
    subtitle: {
      type: String,
    },
    series: {
      type: Array,
      required: true
    },
    options: {
      type: Object,
      required: true
    }
  },
  methods: {
    vSeries(indexSerie) {
      return [this.series[indexSerie].data[0]];
    },
    vOptions(indexSerie) {
      return { 
        ...this.options,
        plotOptions: { 
          radialBar: { 
            startAngle: -135,
            endAngle: 135,
            hollow: {
              size: '60%'
            }
          } 
        },
        labels: [this.series[indexSerie].name],
        colors: [this.series[indexSerie].color],
        stroke: {
          dashArray: 3
        },
        legend: {
          show: false
        }
      };
    }
  }
}
</script>
