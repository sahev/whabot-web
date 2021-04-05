<template>
  <div id="app">
    <v-app id="inspire">
      <v-app id="keep">
        <v-app-bar app clipped-left color="green">
          <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
          <span class="title ml-3 mr-5"
            >Whabot&nbsp;<span class="font-weight-light">Messages</span></span
          >
          <v-text-field
            solo-inverted
            flat
            hide-details
            label="Search"
            prepend-inner-icon="mdi-magnify"
          ></v-text-field>

          <v-spacer></v-spacer>
        </v-app-bar>

        <v-navigation-drawer
          v-model="drawer"
          app
          clipped
          color="grey lighten-4"
        >
          <v-list dense class="grey lighten-4">
            <template v-for="(item, i) in items">
              <v-row v-if="item.heading" :key="i">
                <v-col cols="6">
                  <v-subheader v-if="item.heading">
                    {{ item.heading }}
                  </v-subheader>
                </v-col>
              </v-row>
              <v-divider
                v-else-if="item.divider"
                :key="i"
                dark
                class="my-4"
              ></v-divider>
              <v-list-item v-else :key="i" link>
                <v-list-item-action>
                  <v-icon v-if="item.text === 'Online'" color="green">{{
                    item.icon
                  }}</v-icon>
                  <v-icon v-else-if="item.text === 'Offline'" color="red">{{
                    item.icon
                  }}</v-icon>
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title class="grey--text">
                    {{ item.text }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-list>
        </v-navigation-drawer>

        <v-main class="grey lighten-4 ">
          <v-col sm="12"> </v-col>

          <v-col sm="12">
            <v-container fluid>
              <v-row justify="center">
                <v-col>
                  <bots />
                </v-col>
              </v-row>
            </v-container>
          </v-col>

          <v-col sm="12">
            <v-container fluid>
              <v-row justify="center">
                <v-col class="shrink">
                  <newbot />
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
import newbot from "./pages/bots/new-bot";
import bots from "./pages/bots/bots";

export default {
  components: {
    newbot,
    bots,
  },
  props: {},
  data() {
    return {
      drawer: null,
      items: [
        { heading: "Início" },
        { icon: "mdi-home", text: "Homepage" },
        { icon: "mdi-robot", text: "Robôs" },
        { divider: true },
        { heading: "Mensagens" },
        { icon: "mdi-frequently-asked-questions", text: "FAQ's", page: "faq" },
        { icon: "mdi-sitemap", text: "Workflow's", page: "workflow" },
        { divider: true },
        { icon: "mdi-cog", text: "Configurações" },
        { icon: "mdi-help-circle", text: "Ajuda" },
      ],
    };
  },
};
</script>

<style>
#keep .v-navigation-drawer__border {
  display: none;
}
</style>
