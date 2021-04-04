<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="primary" dark v-bind="attrs" v-on="on">
        Criar Robô
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Novo Robô</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-form lazy-validation>
            <v-row>
              <v-col cols="12" sm="12">
                <v-text-field
                  label="Nome*"
                  v-model="dataBot.name"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="12">
                <v-textarea
                  outlined
                  label="Descrição"
                  v-model="dataBot.desc"
                  required
                ></v-textarea>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" sm="6">
                <v-autocomplete
                  :items="dataType"
                  v-model="type"
                  label="Tipo de atendimento*"
                  @change="getModels"
                  required
                ></v-autocomplete>
              </v-col>

              <v-col cols="12" sm="6">
                <v-select
                  :items="models"
                  label="Modelo de respostas*"
                  v-model="dataBot.models"
                  :disabled="disableDropdown"
                  required
                ></v-select>
              </v-col>
            </v-row>
            <v-col cols="12" sm="6">
              <v-switch label="Iniciar o robô?" v-model="dataBot.enabled"></v-switch>
            </v-col>
          </v-form>
        </v-container>
        <small>*Campos obrigatórios</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="dialog = false">
          Voltar
        </v-btn>
        <v-btn color="blue darken-1" text @click="save">
          Salvar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "bots",
  props: {},
  data() {
    return {
      dialog: false,
      disableDropdown: true,
      dataType: ["FAQ", "WORKFLOW"],
      dataModels: [
        { id: 1, name: "MODEL FAQ 1", type: "FAQ" },
        { id: 2, name: "MODEL FAQ 2", type: "FAQ" },
        { id: 3, name: "MODEL FAQ 3", type: "FAQ" },
        { id: 1, name: "MODEL Workflow 1", type: "WORKFLOW" },
        { id: 2, name: "MODEL Workflow 2", type: "WORKFLOW" },
      ],
      type: [],
      models: [],
      dataBot: [
        {
          name: String,
          desc: String,
          type: String,
          models: String,
          enabled: Boolean,
        },
      ],
    };
  },
  methods: {
    getModels() {
      this.disableDropdown = false;
      const modelsdata = this.dataModels.filter(
        (data) => data.type === this.type
      );

      if (this.models) this.models = [];

      modelsdata.map((model) => this.models.push(model.name));
    },
    save() {
      this.dialog = false;
      this.dataBot.type = this.type;

      console.log(this.dataBot);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
