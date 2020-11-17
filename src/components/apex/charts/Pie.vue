<template>
  <v-container id="chart-container">
    
    
    <div class="chart">
      <section>
        <apexchart type="pie" height="450" :options="vOptions" :series="vSeries"></apexchart>
      </section>
    </div>
  </v-container>
</template>

<script>

import VueApexCharts from 'vue-apexcharts'

export default {
  name: 'pie',
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
      return this.series.map(s => s.data[0]); // Récupère la première donnée de chaque série
    },
    vOptions() {
      return {
        ...this.options,
        labels: this.series.map(s => s.name),
        colors: this.series.map(s => s.color),
        stroke: {
          show: false
        }
      };
    }
  }
}
</script>
