<template>
    <v-dialog v-model="visible" max-width="700px" hide-overlay persistent>

      <v-card>
        <v-card-title>
          <span class="text-h5">Editar</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" >
                <v-text-field v-model="connectionForm.name" label="Name" required></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-select
                    v-model="connectionForm.type"
                    :items="types"
                  label="Type"
                  required
                >
                
                </v-select>

              </v-col>

              <v-col cols="12">
                <v-text-field label="Palavras-chave" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea label="Auto-resposta" required></v-textarea>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="handleClickCancelSaveConnection">
            Close
          </v-btn>
          <v-btn color="blue darken-1" text @click="handleClickSaveConnection">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>
<script>
  export default {
    props: {
      visible: {
        type: Boolean,
        default: false,
      },
      connection: {
        type: Object,
        default: null,
      },
    },
    data() {
      return {
        types: ['pass', 'reject'],
        connectionForm: {
          type: null,
          sourceId: null,
          sourcePosition: null,
          destinationId: null,
          destinationPosition: null,
          name: null,
          expression: null,
        },
      };
    },
    methods: {
      async handleClickSaveConnection() {
        this.$emit('update:visible', false);
        this.$emit('update:connection', Object.assign(this.connection, {
          name: this.connectionForm.name,
          type: this.connectionForm.type,
          expression: this.connectionForm.expression,
        }));
      },
      async handleClickCancelSaveConnection() {
        this.$emit('update:visible', false);
      },
    },
    watch: {
      connection: {
        immediate: true,
        handler(val) {
          if (!val) { return; }
          this.connectionForm.id = val.id;
          this.connectionForm.type = val.type;
          this.connectionForm.name = val.name;
          this.connectionForm.expression = val.expression;
        },
      },
    },
  };
</script>