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
      let vOptions = { ...this.options }
      vOptions.plotOptions = { bar: { horizontal: true } },
      vOptions.yaxis = this.options.yaxis[0];
      vOptions.xaxis = {
        type: 'category',
        categories: this.options.xaxis.categories,
      };
      return vOptions;
    }
  }
}
</script>
