<template>
  <div>
    <v-row dense>
      <v-col cols="6">
        <v-card>
          <line-chart
            title="Line" 
            subtitle="Exemple d'un graphe de type 'line'" 
            :series="series"
            :options="options">
          </line-chart>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card>
          <area-chart
            title="Area" 
            subtitle="Exemple d'un graphe de type 'Area'" 
            :series="series"
            :options="options">
          </area-chart>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card>
          <column-chart
            title="Column" 
            subtitle="Exemple d'un graphe de type 'Column'" 
            :series="series"
            :options="options">
          </column-chart>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card>
          <bar-chart
            title="Bar" 
            subtitle="Exemple d'un graphe de type 'Bar'" 
            :series="barSeries"
            :options="barOptions">
          </bar-chart>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card>
          <mixed-chart
            title="Mixed" 
            subtitle="Exemple d'un graphe de type 'Mixed'" 
            :series="seriesMixed"
            :options="options">
          </mixed-chart>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card>
          <pie-chart
            title="Pie" 
            subtitle="Exemple d'un graphe de type 'Pie'" 
            :series="oneDSeries"
            :options="oneDOptions">
          </pie-chart>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card>
          <radial-bar-chart
            title="Radial bar" 
            subtitle="Exemple d'un graphe de type 'Radial bar'" 
            :series="[oneDSeries[0]]"
            :options="oneDOptions">
          </radial-bar-chart>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>

import LineChart from '@/components/apex/charts/Line.vue'
import AreaChart from '@/components/apex/charts/Area.vue'
import ColumnChart from '@/components/apex/charts/Column.vue'
import BarChart from '@/components/apex/charts/Bar.vue'
import MixedChart from '@/components/apex/charts/Mixed.vue'
import PieChart from '@/components/apex/charts/Pie.vue'
import RadialBarChart from '@/components/apex/charts/RadialBar.vue'

export default {
  name: 'ApexCharts',
  components: { LineChart, AreaChart, ColumnChart, BarChart, MixedChart, PieChart, RadialBarChart },
  data() {
    return {
      oneDSeries: [ 44, 55, 57, 56, 61 ],
      oneDOptions: {
        labels: ['Équipe A', 'Équipe B', 'Équipe C', 'Équipe D', 'Équipe E'],
        dataLabels: {
          enabled: true
        },
        plotOptions: {
          radialBar: {
            startAngle: -170,
            endAngle: 170,
            track: {
              background: "#e7e7e7",
              strokeWidth: '130%',
              margin: 10, // margin is in pixels
            },
          }
        },
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
      },
      series: [
        { name: 'Profit Net', data: [44, 55, 57, 56, 61, 58, 63, 60, 66] }
      ],
      seriesMultiple: [
        { name: 'Profit Net', data: [44, 55, 57, 56, 61, 58, 63, 60, 66] },
        { name: 'Recettes', data: [76, 85, 101, 98, 87, 105, 91, 114, 55] },
        { name: 'Trésorerie', data: [35, 41, 36, 26, 70, 48, 52, 53, 41] }
      ],
      seriesMixed: [
        { name: 'Profit Net', type: 'bar',  data: [44, 55, 57, 56, 61, 58, 63, 60, 66] },
        { name: 'Recettes', type: 'line', data: [76, 85, 101, 98, 87, 105, 91, 114, 55] },
        { name: 'Trésorerie', type: 'area', data: [35, 41, 36, 26, 70, 48, 52, 53, 41] }
      ],
      options: {
        dataLabels: {
          // enabled: true
          enabled: false
        },
        stroke: {
          curve: 'smooth'
        },
        xaxis: {
          categories: [new Date('01 Feb 2020 GMT').getTime(), new Date('01 Mar 2020 GMT').getTime(), new Date('01 Apr 2020 GMT').getTime(), new Date('01 May 2020 GMT').getTime(), new Date('01 Jun 2020 GMT').getTime(), new Date('01 Jul 2020 GMT').getTime(), new Date('01 Aug 2020 GMT').getTime(), new Date('01 Sep 2020 GMT').getTime(), new Date('01 Oct 2020 GMT').getTime()],
          title: {
            text: 'Mois'
          },
          type: 'datetime',
          min: new Date('01 Feb 2020 GMT').getTime(),
          tickAmount: 6,
        },
        yaxis: {
          title: {
            text: 'Milliers d\'euros'
          }
        },
        fill: {
          opacity: 1
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return "$ " + val + " thousands"
            }
          }
        }
      },

      barSeries: [{
        data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380]
      }],
      barOptions: {
        chart: {
          type: 'bar',
          height: 350
        },
        plotOptions: {
          bar: {
            horizontal: true,
          }
        },
        dataLabels: {
          enabled: false
        },
        xaxis: {
          categories: ['South Korea', 'Canada', 'United Kingdom', 'Netherlands', 'Italy', 'France', 'Japan', 'United States', 'China', 'Germany'],
        }
      },


      
    };
  }
}
</script>

<style lang="scss">
.chart {
  height: 500px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  section {
    flex: 1;
  }
}
</style>