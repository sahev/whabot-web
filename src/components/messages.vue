<template>
  <v-card class="mx-auto" max-width="900" outlined>
    <v-row>
      <v-expansion-panels accordion>
        <v-expansion-panel
          v-for="(bot, b) in bots"
          :key="b"
          :class="bot.enabled ? 'enabled' : 'disabled'"
        >
          <v-row>
            <v-expansion-panel-header>
              <b> {{ bot.name }}</b>
              <v-layout justify-end>
                <v-switch
                  @click.stop=""
                  color="blue"
                  v-model="bot.enabled"
                  @change="setBotStatus(bot.id, bot.enabled)"
                >
                  <template v-slot:label>
                    {{ bot.enabled ? "Ativo" : "Inativo" }}
                  </template>
                </v-switch>
              </v-layout>
            </v-expansion-panel-header>
          </v-row>

          <v-expansion-panel-content>
            {{ bot.desc }}
          </v-expansion-panel-content>

          <v-expansion-panel-content>
            <configs :botid="bot.id" />
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-row>
  </v-card>
</template>
<script>
import configs from "./configs";

export default {
  name: "messages",
  props: {
    msg: String,
  },
  components: {
    configs,
  },
  created() {
    this.getBots();
  },
  data() {
    return {
      config: false,
      bots: [],
    };
  },
  methods: {
    setBotStatus(i, status) {
      console.log(i, status);
    },
    getBots() {
      this.bots = [
        {
          id: 1,
          name: "Bot dasdasdassd",
          desc: "Pizzaria pedidos",
          enabled: 1,
        },
        { id: 2, name: "Bot 2", desc: "Restaurante cardápios", enabled: 0 },
        { id: 3, name: "Bot 3", desc: "Ecommerce dúvidas", enabled: 0 },
      ];
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
