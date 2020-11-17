<template>
  <div>
    <v-row dense>

      <v-col cols="12" class="overview">
        <v-card flat>
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Aperçu du graphe</v-toolbar-title>
          </v-toolbar>
          <div class="overview-container">
            <chart ref="chart" :config="config"></chart>
          </div>
        </v-card>
      </v-col>

      <v-col cols="12" class="config">
        <v-card flat>
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Configuration du graphe</v-toolbar-title>
            <v-spacer></v-spacer>
            <template v-slot:extension>
              <v-tabs v-model="tab" align-with-title>
                <v-tabs-slider color="blue lighten-3"></v-tabs-slider>
                <v-tab v-for="(item, i) in tabsItems" :key="i">{{ item }}</v-tab>
              </v-tabs>
            </template>
          </v-toolbar>

          <v-row>
            <v-col cols="12" class="config-container">
              <v-container>
                <v-tabs-items v-model="tab">
                  <v-tab-item v-for="(item, i) in tabsItems" :key="i">
                    <v-card flat>
                      <div v-if="tab == 0">
                        <v-row>
                          <v-col cols="12">
                            <h3 class="primary--text">Réglages généraux</h3>
                          </v-col>
                          <v-col cols="9">
                            <v-select
                              v-model="config.type"
                              :items="chartTypes"
                              label="Type de graphe"
                              outlined>
                            </v-select>
                          </v-col>
                          <v-col cols="3">
                            <v-switch
                              v-model="config.stacked"
                              label="Graphe empilé"
                              :disabled="!(config.type == 'line' || config.type == 'area' || config.type == 'column' || config.type == 'bar')"
                            ></v-switch>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="12">
                            <h3 class="primary--text">Contrôles</h3>
                          </v-col>
                          <v-col cols="3">
                            <v-switch
                              v-model="config.control"
                              label="Panneau de contrôle">
                            </v-switch>
                          </v-col>
                          <v-col cols="3">
                            <v-switch
                              v-model="config.download"
                              label="Téléchargement"
                              :disabled="!config.control">
                            </v-switch>
                          </v-col>
                        </v-row>
                      </div>
                      <div v-if="tab == 1">
                        <div v-for="(serie, i) in config.series" :key="i">
                          <v-row>
                            <v-col cols="12">
                              <h3 class="primary--text mt-3 mb-5">{{ serie.name }}</h3>
                            </v-col>
                            <v-col cols="4">
                              <v-select
                                v-model="serie.type"
                                :items="serieTypes"
                                label="Type de série"
                                outlined
                                :disabled="config.type != 'mixed'">
                              </v-select>
                            </v-col>
                            <v-col cols="4">
                              <v-select
                                v-model="serie.curve"
                                :items="curveTypes"
                                label="Type de courbe"
                                outlined>
                              </v-select>
                            </v-col>
                            <v-col cols="2">
                              <v-switch
                                v-model="serie.label"
                                label="Afficher les labels">
                              </v-switch>
                            </v-col>
                            <v-col cols="2">
                              <v-switch
                                v-model="serie.legend"
                                label="Afficher les légendes"
                                disabled>
                              </v-switch>
                            </v-col>
                            <v-col cols="12">
                              <label>Couleur</label>
                              <v-color-picker 
                                v-model="serie.color"
                                class="ma-2"
                                hide-canvas
                                show-swatches>
                              </v-color-picker>
                            </v-col>
                          </v-row>
                          
                        </div>
                      </div>
                      <div v-if="tab == 2">
                        <v-row>
                          <v-col cols="12">
                            <h3 class="primary--text">Axe des abscisses</h3>
                            <v-row class="mt-3">
                              <v-col cols="12">
                                <v-text-field
                                  v-model="config.xaxis.name"
                                  label="Label de l'axe"
                                  outlined
                                ></v-text-field>
                              </v-col>
                              <v-col cols="4">
                                <v-select
                                  v-model="config.xaxis.type"
                                  :items="xaxisTypes"
                                  label="Type"
                                  outlined>
                                </v-select>
                              </v-col>
                              <v-col cols="4">
                                <v-select
                                  v-model="config.xaxis.format"
                                  :items="xaxisDatetimeFormats"
                                  label="Format de date"
                                  outlined
                                  :disabled="config.xaxis.type != 'datetime'">
                                </v-select>
                              </v-col>
                              <v-col cols="4">
                                <v-text-field
                                  type="number"
                                  label="Nombre d'intervalle à afficher"
                                  v-model="config.xaxis.interval"
                                  :min="config.xaxis.data.length"
                                  outlined
                                  :disabled="config.xaxis.type != 'datetime'">
                                </v-text-field>
                              </v-col>
                            </v-row>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="12">
                            <h3 class="primary--text">Axes des ordonnées</h3>
                          </v-col>
                          <v-col cols="12">
                            <v-row v-for="(axis, i) in config.yaxis" :key="i">
                              <v-col cols="12">
                                <h4 class="warning--text">Axe {{ config.series[i].name }}</h4>
                              </v-col>
                              <v-col cols="6">
                                <v-switch
                                  v-model="axis.show"
                                  label="Afficher l'axe">
                                </v-switch>
                              </v-col>
                              <v-col cols="6">
                                <v-switch
                                  v-model="axis.color"
                                  label="Utiliser la couleur de la série">
                                </v-switch>
                              </v-col>
                              <v-col cols="6">
                                <v-text-field
                                  v-model="axis.name"
                                  label="Label de l'axe"
                                  outlined
                                ></v-text-field>
                              </v-col>
                              <v-col cols="6">
                                <v-select
                                  v-model="axis.position"
                                  :items="yaxisPositions"
                                  label="Position de l'axe"
                                  outlined>
                                </v-select>
                              </v-col>
                              <v-col cols="3">
                                <v-text-field
                                  type="number"
                                  v-model="axis.min"
                                  label="Valeur minimum"
                                  outlined
                                ></v-text-field>
                              </v-col>
                              <v-col cols="3">
                                <v-text-field
                                  type="number"
                                  v-model="axis.max"
                                  label="Valeur maximum"
                                  outlined
                                ></v-text-field>
                              </v-col>
                              <v-col cols="3">
                                <v-text-field
                                  type="number"
                                  v-model="axis.step"
                                  label="Nombre d'intervalles"
                                  outlined
                                ></v-text-field>
                              </v-col>
                              <v-col cols="3">
                                <v-switch
                                  v-model="axis.logarithmic"
                                  label="Échelle logarithmique"
                                ></v-switch>
                              </v-col>
                            </v-row>
                          </v-col>
                        </v-row>
                      </div>
                    </v-card>
                  </v-tab-item>
                </v-tabs-items>

              </v-container>
            </v-col>
          </v-row>
        </v-card>
      </v-col>

    </v-row>
  </div>
</template>

<script>

import Chart from '@/components/apex/Chart.vue'

export default {
  name: 'Config',
  components: { Chart },
  data: () => ({
    tab: null, 
    tabsItems: ['Type de graphe', 'Séries', 'Axes'],
    chartTypes: [
      { text: 'Courbe', value: 'line' }, 
      { text: 'Aire', value: 'area' }, 
      { text: 'Histogramme', value: 'column' }, 
      { text: 'Barres', value: 'bar' }, 
      { text: 'Mixte', value: 'mixed' }, 
      { text: 'Diagramme circulaire', value: 'pie' }, 
      { text: 'Diagramme radial', value: 'radial' },
      { text: 'Jauge', value: 'gauge' }
    ],
    serieTypes: [
      { text: 'Courbe', value: 'line' }, 
      { text: 'Aire', value: 'area' }, 
      { text: 'Histogramme', value: 'column' }
    ],
    curveTypes: [
      { text: 'Lisse', value: 'smooth' }, 
      { text: 'Droit', value: 'straight' }, 
      { text: 'Escalier', value: 'stepline' }
    ],
    yaxisPositions: [
      { text: 'Gauche', value: 'left' }, 
      { text: 'Droite', value: 'right' }
    ],
    xaxisTypes: [
      { text: 'Temps', value: 'datetime' }, 
      { text: 'Texte', value: 'text' }
    ],
    xaxisDatetimeFormats: [
      { text: 'Heure (09:00)', value: 'LT' }, 
      { text: 'Heure avec secondes (09:00:00)', value: 'LTS' },
      { text: 'Date courte (30/10/2020)' , value: 'l' },
      { text: 'Date (30 octobre 2020)', value: 'll' },
      { text: 'Date et heure (30 octobre 2020 09:00)', value: 'lll' },
      { text: 'Date et heure et jour de la semaine (vendredi 30 octobre 2020 09:00)', value: 'llll' }
    ],
    config: {
      name: 'Mon graphique',
      type: 'line', //line, area, column, bar, mixed, pie, radial, gauge, text
      stacked: false,
      control: true, // true, false
      download: true, // true false  - fait patie du control donc => control: { show: true, download: true } ?
      series: [
        {
          name: "Première série",
          data: [95, 41, 35, 51, 49, 62, 69, 91, 148],
          type: "line", // line, area, column
          curve: "smooth",  // smooth, straight, stepline
          color: "#2ecc71",
          legend: true, // true, false
          label: true // true, false
        },
        {
          name: "Deuxième série",
          data: [31, 26, 12, 27, 86, 48, 21, 64, 99],
          type: "column",// line, area, column, bar,
          curve: "smooth",  // smooth, straight, stepline
          color: "#e74c3c",
          legend: true, // true, false
          label: false // true, false
        }
      ],
      xaxis: {
        name: "Nom de l'axe des abcsisses",
        type: "datetime", // datetime, text
        format: "ll", // DD/MM/YYYY, MMMM, HH:mm:ss, ...
        interval: 10,
        data: [
          "2019-10-01T00:00:00.000Z",
          "2019-11-01T00:00:00.000Z",
          "2019-12-01T00:00:00.000Z",
          "2020-01-01T00:00:00.000Z",
          "2020-02-01T00:00:00.000Z",
          "2020-03-01T00:00:00.000Z",
          "2020-04-01T00:00:00.000Z",
          "2020-05-01T00:00:00.000Z",
          "2020-06-01T00:00:00.000Z",
        ]
      },
      yaxis: [
        {
          show: true,
          name: "Nom de l'axe des ordonnées n°1",
          position: "left", //left, right
          min: 0,
          max: 180,
          step: 10, // à remplacer par interval (nombre d'intervalle) ? 
          logarithmic: false,
          color: true // true, false
        },
        {
          show: true,
          name: "Nom de l'axe des ordonnées n°2",
          position: "right", //left, right
          min: 0,
          max: 200,
          step: 10,
          logarithmic: false,
          color: true // true, false
        },
      ]

    }
  })
}
</script>


<style lang="scss" scoped>
.config-container {
  height: 34vh;
  overflow-y: auto;
}
</style>