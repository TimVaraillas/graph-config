<template>
  <div>
    <v-card-title>{{ title }}</v-card-title>
    <div class="chart-container">
      <canvas id="chart"></canvas>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js';

import { colors } from '@/mixins/colors.js';

export default {
  name: 'Pie',
  mixins: [colors],
  props: {
    title: String,
    data: {
      type: Array,
      required: true
    },
  },
  data() {
    return {};
  },
  created() {
    this.createChart();
  },
  methods: {
    createChart() {
      setTimeout(() => {
        const ctx = document.getElementById('chart');
        new Chart(ctx, {
            type: 'doughnut',
            data: {
              labels: this.data.map(d => d.label),
              datasets: [
                {
                  data: this.data.map(d => d.number),
                  borderWidth: 0,
                  backgroundColor: this.hexColors
                }
              ]
            },
            options: {
              responsive: true
            }
        });
      }, 100)
    }
  }
}
</script>

<style lang="scss">
  .chart-container {
    padding-bottom: 30px;
  }
</style>