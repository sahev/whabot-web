<template>
  <div id="app">
    <v-app id="inspire">
      <v-app id="keep">
        <v-app-bar app clipped-left color="green">
          <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
          <span class="title ml-3 mr-5">Whabot&nbsp;
          </span>

          <v-spacer></v-spacer>
        </v-app-bar>
        
        <Menu :drawer="drawer"/>

        <v-main class="grey lighten-4 ">

          <v-col sm="12">
            <v-container fluid>
              <v-row justify="center">
                <v-col>
                  <Home />
                </v-col>
              </v-row>
            </v-container>
          </v-col>

        </v-main>
      </v-app>
    </v-app>
  </div>
</template>

<script>
import Home from "./home";
import Menu from "../../components/menu"

export default {
  components: {
    Home,
    Menu
  },
  props: {},
  data() {
    return {
      drawer: true,
    };
  },
  methods: {

  },
};
</script>

<style>
#keep .v-navigation-drawer__border {
  display: none;
}
</style>
