<template>
  <v-card class="mx-auto" max-width="900" outlined>
    <v-row>
      <v-expansion-panels accordion>
        <v-expansion-panel
          v-for="(bot, b) in bots"
          :key="b"
          :class="bot.enabled ? 'enabled' : 'disabled'"
        >
          <v-expansion-panel-header>{{ bot.name }}</v-expansion-panel-header>
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
import configs from "./configs"

export default {
  name: "messages",
  props: {
    msg: String,
  },
  components: {
    configs
  },
  data() {
    return {
      config: false,
      bots: [
        { id: 1, name: "Bot 1", desc: "Pizzaria pedidos", enabled: 1 },
        { id: 2, name: "Bot 2", desc: "Restaurante cardápios", enabled: 0 },
        { id: 3, name: "Bot 3", desc: "Ecommerce dúvidas", enabled: 0 },
      ],
    };
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
</style>
