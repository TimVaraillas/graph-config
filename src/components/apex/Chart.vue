<template>
  <v-container id="chart-container">
    <div class="chart">
      <section>
        
        <line-chart
          v-if="config.type == 'line'"
          title="Line" 
          subtitle="Exemple d'un graphe de type 'line'" 
          :series="vSeries"
          :options="vOptions">
        </line-chart>

        <area-chart
          v-if="config.type == 'area'"
          title="Area" 
          subtitle="Exemple d'un graphe de type 'Area'" 
          :series="vSeries"
          :options="vOptions">
        </area-chart>

        <column-chart
          v-if="config.type == 'column'"
          title="Column" 
          subtitle="Exemple d'un graphe de type 'Column'" 
          :series="vSeries"
          :options="vOptions">
        </column-chart>

        <bar-chart
          v-if="config.type == 'bar'"
          title="Bar" 
          subtitle="Exemple d'un graphe de type 'Bar'" 
          :series="vSeries"
          :options="vOptions">
        </bar-chart>

        <mixed-chart
          v-if="config.type == 'mixed'"
          title="Mixed" 
          subtitle="Exemple d'un graphe de type 'Mixed'" 
          :series="vSeries"
          :options="vOptions">
        </mixed-chart>

        <pie-chart
          v-if="config.type == 'pie'"
          title="Pie" 
          subtitle="Exemple d'un graphe de type 'Pie'" 
          :series="vSeries"
          :options="vOptions">
        </pie-chart>

        <radial-bar-chart
          v-if="config.type == 'radial'"
          title="Radial bar" 
          subtitle="Exemple d'un graphe de type 'Radial bar'" 
          :series="vSeries"
          :options="vOptions">
        </radial-bar-chart>

        <gauge-chart
          v-if="config.type == 'gauge'"
          title="Gauge" 
          subtitle="Exemple d'un graphe de type 'Gauge'" 
          :series="vSeries"
          :options="vOptions">
        </gauge-chart>

      </section>
    </div>
  </v-container>
</template>

<script>
import moment from 'moment'

import LineChart from '@/components/apex/charts/Line.vue'
import AreaChart from '@/components/apex/charts/Area.vue'
import ColumnChart from '@/components/apex/charts/Column.vue'
import BarChart from '@/components/apex/charts/Bar.vue'
import MixedChart from '@/components/apex/charts/Mixed.vue'
import PieChart from '@/components/apex/charts/Pie.vue'
import RadialBarChart from '@/components/apex/charts/RadialBar.vue'
import GaugeChart from '@/components/apex/charts/Gauge.vue'

export default {
  name: 'Chart',
  components: { LineChart, AreaChart, ColumnChart, BarChart, MixedChart, PieChart, RadialBarChart, GaugeChart },
  props: {
    config: {
      type: Object,
      required: true
    }
  },
  computed: {
    vSeries() {
      return this.config.series.map(s => ({
        name: s.name,
        type: s.type,
        curve: s.curve,
        data: s.data,
        color: s.color,
        legend: s.legend,
        label: s.label
      }));
    }, 
    vOptions() {
      return {
        chart: {
          stacked: this.config.stacked,
          toolbar: {
            show: this.config.control,
            tools: {
              download: this.config.download
            }
          }
        },
        dataLabels: {
          enabled: true,
          enabledOnSeries: this.vSeries.map((s, i) => s.label ? i : null)
          // ...
        },
        legend: {
          show: this.config.legend.show,
          position: this.config.legend.position,
        }, 
        stroke: {
          show: true,
          curve: this.vSeries.map(s => s.curve ? s. curve : 'smooth'), 
          colors: undefined,
          width: 4,
          dashArray: 0,  
        },
        xaxis: {
          title: {
            text: this.config.xaxis.title.show ? this.config.xaxis.title.text : undefined,
            offsetY: 13
          },
          type: this.config.xaxis.type == 'datetime' ? 'datetime' : 'category',
          labels: {
            formatter: (value, timestamp) => {
              return this.config.xaxis.type == 'datetime' 
                ? moment(timestamp).locale('fr').format(this.config.xaxis.format)
                : value;
            },
          },
          categories: this.config.xaxis.type == 'datetime'
            ? this.config.xaxis.data.map(d => new Date(d).getTime())
            : this.config.xaxis.data,
          tickAmount: parseInt(this.config.xaxis.interval, 10) // Nombre d'intervalle à afficher
        },
        yaxis: this.config.yaxis.map((axis, i) => ({
          show: axis.show,
          title: {
            text: axis.title.show ? axis.title.text : undefined,
            style: {
              color: axis.color ? this.vSeries[i].color : undefined,
            }
          },
          min: axis.set_min_max && parseInt(axis.min, 10) ? parseInt(axis.min, 10) : undefined,
          max: axis.set_min_max && parseInt(axis.max, 10) ? parseInt(axis.max, 10) : undefined,
          logarithmic: axis.logarithmic,
          opposite: axis.position == 'right' ? true : false,
          axisTicks: {
            show: true,
            color: axis.color ? this.vSeries[i].color : undefined,
          },
          axisBorder: {
            show: true,
            color: axis.color ? this.vSeries[i].color : undefined,
          },
          labels: {
            style: {
              colors: axis.color ? this.vSeries[i].color : undefined,
            }
          },
          tooltip: {
            enabled: false, // true, false
          },
          tickAmount: parseInt(axis.step, 10),
        })),
      }
    }
  },
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