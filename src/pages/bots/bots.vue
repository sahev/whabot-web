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
              <v-list-item v-else :key="i" link :to="item.page">
                  <v-list-item-action>
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

          <v-card class="mx-auto" max-width="900" outlined>
            <v-row>
              <v-expansion-panels accordion>
                <v-expansion-panel
                  v-for="(bot, b) in bots"
                  :key="b"
                  :class="bot.bot_enabled ? 'enabled' : 'disabled'"
                >
                  <v-row>
                    <v-expansion-panel-header>
                      <b> {{ bot.bot_name }}</b>
                      <v-layout justify-end>
                        <v-switch
                          @click.stop=""
                          color="blue"
                          v-model="bot.bot_enabled"
                          @change="setBotStatus(bot.bot_name, bot.bot_enabled)"
                        >
                          <template v-slot:label>
                            {{ bot.bot_enabled ? "Ativo" : "Inativo" }}
                          </template>
                        </v-switch>
                      </v-layout>
                    </v-expansion-panel-header>
                  </v-row>

                  <v-expansion-panel-content>
                    {{ bot.bot_description }}
                  </v-expansion-panel-content>

                  <v-expansion-panel-content>
                    <configs :botid="bot.bot_id" />
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-row>
          </v-card>
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
import configs from "../../components/configs";
import axios from "axios";
import newbot from "../bots/new-bot";

export default {
  name: "Bots",
  props: {
    msg: String,
  },
  components: {
    configs,
    newbot,
  },
  async created() {
    await this.getBots();
  },
  data() {
    return {
      config: false,
      bots: [],
      drawer: null,
      items: [
        { heading: "Início" },
        { icon: "mdi-home", text: "Homepage", page: "/" },
        { icon: "mdi-robot", text: "Robôs", page: "bots" },
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
  methods: {
    async setBotStatus(bot_name, bot_enabled) {
      await axios.patch(`bots/${bot_name}`, { bot_name, bot_enabled });
    },
    async getBots() {
      let res = await axios.get("/bots", {
        params: { bot_user: 1 },
      });

      this.bots = res.data;
    },
  },
};
</script>
<style scoped>
.enabled {
  border-left-style: solid;
  border-left-width: 7px;
  border-left-color: #1ce02d;
}

.disabled {
  border-left-style: solid;
  border-left-width: 7px;
  border-left-color: #e41818;
}

.v-expansion-panel-header:before {
  background-color: none;
  border-radius: none;
  bottom: none;
  content: none;
  left: none;
  opacity: none;
  pointer-events: none;
  position: none;
  right: none;
  top: none;
  transition: none;
}
</style>
