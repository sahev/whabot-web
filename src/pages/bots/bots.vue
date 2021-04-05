<template>
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
</template>
<script>
import configs from "../../components/configs";
import axios from "axios"

export default {
  name: "Bots",
  props: {
    msg: String,
  },
  components: {
    configs,
  },
  async created() {
    await this.getBots();
  },
  data() {
    return {
      config: false,
      bots: [],
    };
  },
  methods: {
    async setBotStatus(bot_name, bot_enabled) {
      await axios.patch(`bots/${bot_name}`, { bot_name, bot_enabled })
    },
    async getBots() {
      let res = await axios.get('/bots', {
        params: { bot_user: 1 },
      })
      
      this.bots = res.data
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
