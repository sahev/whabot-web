<template>
  <v-row>
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <template v-slot:activator="{ on, attrs }">
        <div class="col-lg-12" style="text-align: right;">
          <v-btn fab dark small color="green">
            <v-icon v-bind="attrs" v-on="on">mdi-pencil</v-icon>
          </v-btn>
        </div>
      </template>
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Settings</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click="dialog = false">
              Save
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>

        <v-card>
          <v-card-title>
            Auto-respostas 
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Buscar"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="words.find(word => word.bot === this.botid)"
            :search="search"
          ></v-data-table>
        </v-card>

        <v-divider></v-divider>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
export default {
  props: {
    botid: Number
  },
  created() {
    const w = this.words.find(word => word.bot === this.botid)
    this.data = w
    console.log(this.data);
  },
  methods: {
    getWordsByBot(word) {
      return word.bot === this.botid;
    }
  },
  data() {
    return {
      dialog: false,
      data: [],
      words: [
        {
          bot: 1,
          title: "Apresentação cardápio",
          word: "cardápio",
          res: "o cardápio de hoje é: 123",
        },
        { bot: 1, title: "Boas vindas", word: "bom dia", res: "bom dia nomecliente" },
        {
          bot: 1,
          title: "Finalização do pedido",
          word: "finalizar",
          res: "Total: X items: y pagamento: z",
        },
        {
          bot: 2,
          title: "Pedido",
          word: "meu pedido",
          res: "Seu pedido é: xyz",
        },
        { bot: 2, title: "Finalização", word: "tchau", res: "Até mais cliente x!" },
        {
          bot: 3,
          title: "Produtos",
          word: "produtos",
          res: "produtos disponíveis são: xyz",
        },        
      ],
      search: "",
      headers: [
        {
          text: "Palavra-chave",
          align: "start",
          value: "word",
        },
        { text: "Resposta", value: "res" },
      ],

    };
  },
};
</script>
