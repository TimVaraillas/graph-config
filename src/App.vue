<template>
  <v-app>

    <v-app-bar app color="primary" dark>
      <v-spacer></v-spacer>
      <!-- <v-btn @click="toggleTheme" color="primary" class="mr-2">Go dark</v-btn> -->
    </v-app-bar>

    <v-navigation-drawer 
      v-model="sidebarMenu" 
      app
      floating
      :permanent="sidebarMenu"
      :mini-variant.sync="sidebarMini">

      <v-list dense color="primary" dark>
        <v-list-item>
          <v-list-item-action>
            <v-icon @click.stop="sidebarMini = !sidebarMini">mdi-menu</v-icon>
          </v-list-item-action>
            <v-list-item-content>
                <v-list-item-title>
                    <h3 class="font-weight-thin">Dataviz tests</h3>
                </v-list-item-title>
            </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-list>
          <v-list-item v-for="(item, i) in items" :key="i" link :to="item.path">
              <v-list-item-icon>
                  <v-icon color="primary">{{ item.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                  <v-list-item-title class="primary--text">{{ item.name }}</v-list-item-title>
              </v-list-item-content>
          </v-list-item>
      </v-list>
    </v-navigation-drawer>
    
    <v-main class="main">
      <v-container class="px-4 py-0 fill-height" fluid>
        <v-row class="fill-height">
            <v-col>
                <transition name="fade">
                    <router-view></router-view>
                </transition>
            </v-col>
        </v-row>
      </v-container>
    </v-main>


    <v-footer>
      <span class="ml-auto overline">MobileIT &copy;{{ year }}</span>
    </v-footer>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      sidebarMenu: true,
      sidebarMini: false,
      items: [
        { name: 'Accueil', path: '/',  icon: 'mdi-home' },
        { name: 'Aperçu des graphes', path: '/overview',  icon: 'mdi-chart-arc' },
        { name: 'Configurer un graphe', path: '/config',  icon: 'mdi-cog' },
      ],
      year: new Date().getFullYear()
    };
  },
};
</script>

<style lang="scss">
$grey: #f5f5f5;
.main {
  background-color: $grey;
}
</style>