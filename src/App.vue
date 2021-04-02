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
              <v-row v-if="item.heading" :key="i" >
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
                  <v-icon v-if="item.text === 'Online'" color="green">{{ item.icon }}</v-icon>
                  <v-icon v-else-if="item.text === 'Offline'" color="red">{{ item.icon }}</v-icon>
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

        <v-main>
          <v-container fluid class="grey lighten-4">
            <v-row justify="center" >
              <v-col class="shrink">
                <bots />
              </v-col>
            </v-row>
          </v-container>

          <v-container fluid class="grey lighten-4 fill-height">
            <v-row justify="center">
              <v-col >
                <messages />
              </v-col>
            </v-row>
          </v-container>          
        </v-main>
      </v-app>
    </v-app>
  </div>
</template>

<script>
import bots from "./components/bots";
import messages from "./components/messages"

export default {
  components: {
    bots,
    messages,
  },
  props: {
  },
  data() {
    return {
      drawer: null,
      items: [
        { heading: "Status" },
        { icon: "mdi-robot", text: "Online", color: "green" },
        { icon: "mdi-robot-off", text: "Offline", color: "red" },
        { divider: true },
        { heading: "Mensagens" },
        { icon: "mdi-plus", text: "Criar nova resposta" },
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
