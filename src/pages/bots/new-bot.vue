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
                  v-model="dataBot.bot_name"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="12">
                <v-textarea
                  outlined
                  label="Descrição"
                  v-model="dataBot.bot_description"
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
                  :items="dataModels"
                  label="Modelo de respostas*"
                  v-model="models"
                  :disabled="disableDropdown"
                  required
                ></v-select>
              </v-col>
            </v-row>
            <v-col cols="12" sm="6">
              <v-switch label="Iniciar o robô?" v-model="dataBot.bot_enabled"></v-switch>
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
import axios from 'axios'

export default {
  props: {},
  data() {
    return {
      dialog: false,
      disableDropdown: true,
      dataType: ["FAQ", "WORKFLOW"],
      dataModels: [],
      type: [],
      workflow: [],
      models: [],
      dataBot: {},
    };
  },
  methods: {
    async getModels() {
      this.disableDropdown = false;
      if (this.dataModels) this.dataModels = [];
      if (this.type === "WORKFLOW") {
        this.dataBot.bot_type = 1;
        let wk = await axios.get('workflows')
        wk.data.map(res => {
          this.dataModels.push(res.wor_name)
          this.workflow.push(res)
        })
      } else {
        this.dataBot.bot_type = 2;
      }
    },
    async save() {
      this.dialog = false;
      this.dataBot.bot_user = localStorage.getItem('user');

      this.workflow.map(res => { 
        console.log('res',res, this.models);
        if (res.wor_name === this.models) {
          this.dataBot.bot_workflow = res.wor_workflow;
        }
      })
      console.log( 'resp api: ',this.dataBot);
      await axios.post('bots/', this.dataBot).then(res => console.log("res api: ", res.data))
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
