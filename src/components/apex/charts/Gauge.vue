<template>
  <v-container id="chart-container">
    
    
    <div class="chart">
      <section>
        <apexchart type="radialBar" height="450" :options="vOptions" :series="vSeries"></apexchart>
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
  computed: {
    vSeries() {
      return [this.series[0].data[0]];
    },
    vOptions() {
      let vOptions = { ...this.options }
      vOptions.plotOptions = { 
        radialBar: { 
          startAngle: -135,
          endAngle: 135,
          hollow: {
            size: '60%'
          }
        } 
      }
      vOptions.labels = [vOptions.xaxis.categories[0]];
      vOptions.fill = {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          type: 'horizontal',
          shadeIntensity: 0.99,
          colorStops: [
            {
              offset: 0,
              color: "#95DA74",
              opacity: 1
            },
            {
              offset: 75,
              color: "#FAD375",
              opacity: 1
            },
            {
              offset: 100,
              color: "#EB656F",
              opacity: 1
            },

          ],
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100]
        }
      }
      vOptions.stroke = {
        dashArray: 3
      }
      return vOptions;
    }
  }
}
</script>
