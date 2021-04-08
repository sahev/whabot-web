<template>
  <v-expansion-panels accordion>
    <v-expansion-panel
      v-for="(bot, b) in bots"
      :key="b"
      :class="
        !bot.bot_enabled
          ? 'inactive'
          : bot.bot_status == 'isLogged'
          ? 'enabled'
          : bot.bot_status == 'chatsAvailable'
          ? 'enabled'
          : 'disabled'
      "
    >
      <v-expansion-panel-header v-slot="{ open }" @click="img = false">
        <v-row no-gutters>
          <v-col cols="8">
            <b> {{ bot.bot_name }}</b>
          </v-col>
          <v-col cols="8" class="text--secondary">
            <v-fade-transition leave-absolute>
              <span
                v-if="
                  open &&
                    bot.bot_status != 'isLogged' &&
                    bot.bot_status != 'chatsAvailable'
                "
                >{{ bot.bot_enabled ? "" : "Robô desativado" }}

                <!-- <v-btn small @click="botInit(bot)" @click.stop="">Iniciar sessão</v-btn>
                <v-img v-if="bot.bot_enabled && bot.bot_status != 'online' && img" class="qrcode" :src="qrcode"> </v-img> -->
              </span>

              <v-row v-else no-gutters style="width: 100%">
                <v-col cols="6">
                  <span>{{
                    !bot.bot_enabled
                      ? "Desativado"
                      : bot.bot_status == "isLogged"
                      ? "Conectado"
                      : bot.bot_status == "chatsAvailable"
                      ? "Conectado"
                      : "Desconectado"
                  }}</span>
                </v-col>
              </v-row>
            </v-fade-transition>
          </v-col>
        </v-row>
        <div>
          <status
            :bot="bot"
            :button="
              !bot.bot_enabled
                ? 0
                : bot.bot_status == 'isLogged'
                ? 1
                : bot.bot_status == 'chatsAvailable'
                ? 1
                : 2
            "
          />
        </div>

        <v-layout justify-end>
          <v-switch
            @click.stop=""
            color="blue"
            v-model="bot.bot_enabled"
            @change="setBotStatus(bot)"
          >
            <template v-slot:label>
              {{ bot.bot_enabled ? "Ativo" : "Inativo" }}
            </template>
          </v-switch>
        </v-layout>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        {{ bot.bot_description }}
      </v-expansion-panel-content>

      <v-layout justify-end>
        <v-expansion-panel-content>
          <Editbot />
        </v-expansion-panel-content>
      </v-layout>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import Editbot from "./edit-bot";
import axios from "axios";
import status from "../../components/status";
import io from "socket.io-client";

export default {
  props: {
    msg: String,
  },
  components: {
    Editbot,
    status,
  },
  async created() {
    await this.getBots();

    // await this.botsInit();

    this.socket = io.connect("http://localhost:3000");

    console.log(this.socket);

    this.socket.on("connect_error", (res) => console.log("connect ", res));

    this.socket
      .on(`onCreatedBots:${localStorage.getItem("user")}`, (msg) => {
        console.log("receive created ", msg);
        this.receiveCreatedMessage(msg);
      })
      .on("connect_error", (err) => console.log("connect err ", err.response));

    this.socket
      .on(`onUpdatedBots`, (msg) => {
        this.receiveUpdatedMessage(msg);
      })
      .on("connect_error", (err) => console.log("connect err ", err.response));
  },
  data() {
    return {
      config: false,
      bots: [],
      qrcode: null,
      img: false,
      messages: [],
    };
  },
  methods: {
    async setBotStatus(bot) {
      await axios.patch(`bots/${bot.bot_name}`, {
        bot_name: bot.bot_name,
        bot_enabled: bot.bot_enabled,
      });

      if (!bot.bot_enabled) {
        axios.post(`logout/${bot.bot_bot}`);
        this.socket
          .emit("onUpdatedBots", bot)
          .on("connect_error", (err) =>
            console.log("connect err ", err.response)
          );
      }
    },
    async getBots() {
      let res = await axios.get("/bots", {
        params: { bot_user: localStorage.getItem("user") },
      });

      this.bots = res.data;
    },
    getQrCode(data) {
      var buffer = new Buffer.from(data);
      var str = buffer.toString();
      if (data) this.qrcode = str;
      else this.qrcode = null;
      console.log(this.qrcode);
      return this.qrcode;
    },
    async botInit(data) {
      let res = await axios.post("start", { botId: data.bot_bot });

      if (res) this.getQrCode(data.bot_qrcode.data);
      this.img = true;
      return;
    },

    receiveCreatedMessage(msg) {
      // console.log("receive msg ", msg);
      this.bots.push(msg);
      console.log("this.bots ", this.bots);
    },

    receiveUpdatedMessage(msg) {
      console.log("receive update msg ", msg);

      this.bots.filter((bot) => {
        if (bot.bot_bot === msg.bot_bot) {
          bot.bot_status = msg.bot_status;
        }
      });
      // this.bots.push(msg);
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

.inactive {
  border-left-style: solid;
  border-left-width: 7px;
  border-left-color: #818181;
}

.qrcode {
  margin-top: 6px;
  height: 20ch;
  width: 20ch;
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
