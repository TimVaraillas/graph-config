<template>
  <v-container id="chart-container">
    
    
    <div class="chart">
      <section>
        <apexchart type="pie" height="450" :options="options" :series="vSeries"></apexchart>
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
      return this.series[0].data; // Ne récupère que les données de la première série
    }
  }
}
</script>
