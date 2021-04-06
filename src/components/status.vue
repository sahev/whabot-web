<template>
  <div>
    <v-btn
      v-if="button == 2"
      @click="
        dialog = true;
        botInit();
      "
      @click.stop=""
      small
      fab
      color="red"
    >
      <v-icon>mdi-wifi-strength-alert-outline</v-icon>
      <!-- <b-spinner v-if="islogged" id="spinner" small></b-spinner> -->
    </v-btn>

    <v-btn v-if="button == 1" outlined small fab color="green">
      <v-icon>mdi-wifi-strength-4</v-icon>
      <!-- <b-spinner v-if="islogged" id="spinner" small></b-spinner> -->
    </v-btn>

    <v-btn v-if="button == 0" small fab color="grey" outlined disabled>
      <v-icon>mdi-wifi-strength-off-outline</v-icon>
    </v-btn>
    <!-- <b-modal id="modal-qrcode" hide-footer>
      <template v-slot:modal-title>Aponte o celular aqui para capturar o código</template>
      <div class="d-block text-center">
        <b-overlay :show="isLoading" class="text-center position-relative" rounded="square">
          <b-img thumbnail rounded="square" fluid :src="qrcodestring" alt="QRCode"></b-img>
        </b-overlay>
      </div>
    </b-modal> -->

    <v-row justify="center">
      <v-dialog v-if="isLoading" v-model="dialog" max-width="290">
        <v-card color="primary" dark>
          <v-card-text color="blue" v-if="getting">
            Iniciando sessão
            <v-progress-linear
              indeterminate
              color="white"
              class="mb-0"
            ></v-progress-linear>
          </v-card-text>
        </v-card>
        <v-card>
          <v-img v-if="scanning" :src="qrcodestring"></v-img>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "qrcode",
  props: {
    bot: {},
    button: {},
  },
  components: {},
  data() {
    return {
      outlined: false,
      color: "",
      dialog: false,
      isLoading: false,
      qrcodestring: "",
      islogged: false,
      status: false,
      statuss: false,
      displaymodal: false,
      scanning: false,
      getting: false,
    };
  },
  created() {
    this.getsession();
    // let thiss = this;

    // window.setInterval(async function () {
    //   if (
    //     !thiss.status &&
    //     thiss.displaymodal

    //   ) {
    //     thiss.getsession();
    //   }
    //   if (thiss.status && thiss.displaymodal) {
    //     thiss.displaymodal = false;

    //     clearInterval();
    //   }
    // }, 3000);

    // window.setInterval(async function () {
    //   if (thiss.status ) {
    //     thiss.getsession();
    //   }
    // }, 10000);
  },
  computed: {},
  methods: {
    async getsession() {
      try {
        this.islogged = true;

        let res = await axios.get(`botstatus/${this.bot.bot_bot}`);
        
        if (res.data) {
          this.status = true;
          this.islogged = false;
          this.scanning = false;
          this.getting = false;
        } else {
          this.status = false;
          this.islogged = false;
          this.scanning = false;
          this.getting = false;
        }
      } catch {
        console.log("catch getsession");
      }
    },
    async botInit() {
      this.isLoading = true;
      this.displaymodal = true;
      this.getting = true;
      
        try {
          let res = await axios.post("start/", { botId: this.bot.bot_bot });

          console.log(res.data.string == null);
          if (res.data.string != null) {
            this.qrcodestring = res.data.string;
            this.scanning = true;
            this.getting = false;

            console.log(res.data);
          } else {
            this.scanning = false;
            this.getting = false;
            this.isLoading = false;
          }
        } catch {
          console.log("catch botinit");
        }
    },
  },
};
</script>
<style scoped></style>
