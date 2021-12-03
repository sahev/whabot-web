<template>
  <div>
    <v-dialog v-model="visible" max-width="700px" hide-overlay persistent>
      <v-card>
        <v-card-title>
          <span class="text-h5">Editar</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="nodeForm.title"
                  label="Título"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="nodeForm.desc"
                  label="Descrição"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-select
                  v-model="nodeForm.type"
                  :items="types"
                  label="Tipo"
                  required
                ></v-select>
              </v-col>

              <v-col cols="12">
                <v-text-field
                  v-model="nodeForm.wordkeys"
                  label="Palavras-chave"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  v-model="nodeForm.response"
                  label="Auto-resposta"
                  required
                ></v-textarea>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="handleClickCancelSaveNode">
            Close
          </v-btn>
          <v-btn color="blue darken-1" text @click="handleClickSaveNode">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    node: {
      type: Object,
      default: null,
    },
  },
  data: function () {
    return {
      dialog: true,
      nodeForm: {
        title: null,
        id: null,
        type: null,
        wordkeys: null,
        response: null,
        approver: [],
        desc: null
      },
      approvers: ["Joyce", "Allen", "Teresa"],
      types: ["start", "operation", "end"],
    };
  },
  methods: {
    handleClickSaveNode() {
      console.log(
        Object.assign(this.node, {
          name: this.nodeForm.title,
          type: this.nodeForm.type,
          wordkeys: this.nodeForm.wordkeys,
          response: this.nodeForm.response,
          approvers: [{ id: 1, name: this.nodeForm.desc }],
        }),
        "update nodeeeeee"
      );
      this.$emit(
        "update:node",
        Object.assign(this.node, {
          name: this.nodeForm.title,
          type: this.nodeForm.type,
          wordkeys: this.nodeForm.wordkeys,
          response: this.nodeForm.response,
          approvers: [{ id: 1, name: this.nodeForm.desc }],
        })
      );
      this.$emit("update:visible", false);
    },
    handleClickCancelSaveNode() {
      this.$emit("update:visible", false);
    },
    handleChangeApprover(e) {
      console.log(e);
      this.approvers.map((app) => {
        if (app === e) {
          this.nodeForm.approver = app;
          console.log(app, "aproo");
        }
      });
    },
  },
  watch: {
    node: {
      immediate: true,
      handler(val) {
        if (!val) {
          return;
        }
        this.nodeForm.id = val.id;
        this.nodeForm.name = val.name;
        this.nodeForm.type = val.type;
        this.nodeForm.wordkeys = val.wordkeys;
        this.nodeForm.response = val.response;

        if (val.approvers && val.approvers.length > 0) {
          this.nodeForm.approver = val.approvers[0];
        }
      },
    },
  },
};
</script>