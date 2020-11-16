<template>
  <v-container id="chart-container">
    <div class="chart">
      <section>
        <apexchart type="area" height="450" :options="options" :series="vSeries"></apexchart>
      </section>
    </div>
  </v-container>
</template>

<script>

import VueApexCharts from 'vue-apexcharts'

export default {
  name: 'area',
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
    }
  }
}
</script>
