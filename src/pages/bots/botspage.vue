<template>
  <div id="app">
    <v-app id="inspire">
      <v-app id="keep">
        <v-app-bar app clipped-left color="green">
          <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
          <span class="title ml-3 mr-5">Whabot 
            <span class="font-weight-light">{{this.title}}</span>
          </span>

          <v-spacer></v-spacer>
        </v-app-bar>
        
        <Menu :drawer="drawer"/>


        <v-main class="grey lighten-4 ">
          <v-card class="mx-auto" max-width="900" outlined>

            <v-col sm="12">
              <v-container fluid>
                <v-row justify="center">
                  <v-col>
                    <Bots />
                  </v-col>
                </v-row>
              </v-container>
            </v-col>

            <v-col sm="12">
              <v-container fluid>
                <v-row justify="center">
                  <v-col >
                    <Newbots />
                  </v-col>
                </v-row>
              </v-container>
            </v-col>

          </v-card>
        </v-main>
      </v-app>
    </v-app>
  </div>
</template>
<script>
import Menu from "../../components/menu"
import Bots from "./bots";
import Newbots from "./new-bot";

export default {
  components: {
    Menu,
    Bots,
    Newbots,
  },
  data() {
    return {
      drawer: true,
      title: "Robôs",
    };
  },
  methods: {
    log(data) {
      console.log("tietle: ", data);
    },

  },
};
</script>
