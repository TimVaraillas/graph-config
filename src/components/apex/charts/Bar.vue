<template>
  <v-container id="chart-container">
    
    
    <div class="chart">
      <section>
        <apexchart type="bar" height="450" :options="vOptions" :series="vSeries"></apexchart>
      </section>
    </div>
  </v-container>
</template>

<script>

import VueApexCharts from 'vue-apexcharts'

export default {
  name: 'bar',
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
  computed: {
    vSeries() {
      return this.series.map(s => ({
        name: s.name,
        data: s.data,
        color: s.color
      }))
    },
    vOptions() {
      return { 
        ...this.options,
        plotOptions: { bar: { horizontal: true } },
        yaxis: this.options.yaxis[0],
        xaxis: {
          type: 'category',
          categories: this.options.xaxis.categories,
        },
        stroke: {
          show: false
        }
      };
    }
  }
}
</script>
