<template>
  <v-row>
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <template v-slot:activator="{ on, attrs }">
        <div style="text-align: right;">
          <v-btn fab dark small color="blue"  >
            <v-icon v-bind="attrs" v-on="on" @click="log(attrs)">mdi-pencil</v-icon>
          </v-btn>
        </div>
      </template>

      <v-card>
        <v-toolbar dark color="green">
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>

          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click="dialog = false">
              Voltar
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
            :items="getWordsByBot()"
            :search="search"
          >
            <template v-slot:[`item.actions`]="{ item }">
              <v-icon small class="mr-2" @click="editItem(item)">
                mdi-pencil
              </v-icon>
              <v-icon small @click="deleteItem(item)">
                mdi-delete
              </v-icon>
            </template>

            <template v-slot:[`item.status`]="{ item }">
              <v-switch
                color="blue"
                hide-details
                :input-value="item.enabled"
              ></v-switch>
            </template>
          </v-data-table>
        </v-card>

        <v-divider></v-divider>

        <!-- NOVOS ITEMS -->
      </v-card>
    </v-dialog>
    <v-dialog persistent v-model="editmess" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">{{ editform.length ? editform[0].title : false }}</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="8" md="12">
                <v-text-field
                  label="Palavras-chave"
                  :value="editform.length ? editform[0].word : false"
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="6" md="12">
                <v-textarea
                  outlined
                  name="input-7-4"
                  label="Resposta"
                  :value="editform.length ? editform[0].res : false"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="close()">
            Cancel
          </v-btn>
          <v-btn color="blue darken-1" text @click="save()">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
export default {
  components: {},
  props: {
    botid: Number,
  },
  created() {},
  methods: {
    log(data) {
      console.log("log: ", data);
    },
    getWordsByBot() {
      const a = [];
      for (let i = 0; i < this.words.length; i++) {
        if (this.words[i].bot === this.botid) a.push(this.words[i]);
      }
      return a;
    },
    editItem(item) {
      this.editmess = true;
      this.editform.push(item);

      console.log("edit: ", item);
    },
    deleteItem(item) {
      this.close();
      console.log("delete: ", item);
    },
    close() {
      this.editmess = false;
      this.editform = [];
    },
    save() {
      this.close();
    },
  },
  data() {
    return {
      dialog: false,
      editmess: false,
      editform: [],
      words: [
        {
          bot: 1,
          title: "Apresentação cardápio",
          word: "cardápio",
          res:
            "o cardápio de hoje é: 123o cardápio de hoje é: 123o cardápio de hoje3s",
          enabled: 1,
        },
        {
          bot: 1,
          title: "Boas vindas",
          word: "bom dia",
          res: "bom dia nomecliente",
          enabled: 0,
        },
        {
          bot: 1,
          title: "Finalização do pedido",
          word: "finalizar",
          res: "Total: X items: y pagamento: z",
          enabled: 1,
        },
        {
          bot: 2,
          title: "Pedido",
          word: "meu pedido",
          res: "Seu pedido é: xyz",
          enabled: 1,
        },
        {
          bot: 2,
          title: "Finalização",
          word: "tchau",
          res: "Até mais cliente x!",
          enabled: 0,
        },
        {
          bot: 3,
          title: "Produtos",
          word: "produtos",
          res: "produtos disponíveis são: xyz",
          enabled: 1,
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
        { text: "Ação", value: "actions", sortable: false },
        { text: "Status", value: "status", sortable: false },
      ],
    };
  },
};
</script>
