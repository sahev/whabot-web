<template>
  <div>
    <v-dialog v-model="visible" max-width="300px" hide-overlay>
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="" dark v-bind="attrs" v-on="on">
          Open Dialog
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">Editar</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" >
                <v-text-field v-model="nodeForm.name" label="Name" required></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-select
                    v-model="nodeForm.type"
                  :items="types"
                  label="Type"
                  required
                ></v-select>
              </v-col>

              <v-col cols="12">
                <v-select
                
                  :items="approvers"
                  label="Approver"
                  @change="handleChangeApprover($event)"
                  required
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
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

    <!-- <div class="modal" v-if="visible" style="width: 320px">
      <div class="header">
        <span>Edit</span>
      </div>
      <div class="body">
        <label for="name">Name</label>
        <input class="form-control" id="name" v-model="nodeForm.name" />
        <label for="type">Type</label>
        <select class="form-control" id="type" v-model="nodeForm.type">
          <option
            :key="'node-type-' + item.id"
            :value="item.id"
            v-for="item in [
              { name: 'Start', id: 'start' },
              { name: 'End', id: 'end' },
              { name: 'Operation', id: 'operation' },
            ]"
          >
            {{ item.name }}
          </option>
        </select>
        <label for="approver">Approver</label>
        <select
          class="form-control"
          id="approver"
          :value="nodeForm.approver.id"
          @change="handleChangeApprover($event)"
        >
          <option
            :value="item.id"
            :key="'approver-' + item.id"
            v-for="item in approvers"
          >
            {{ item.name }}
          </option>
        </select>
      </div>
      <div class="footer">
        <button @click="handleClickCancelSaveNode">Cancel</button>
        <button @click="handleClickSaveNode">Ok</button>
      </div> 
    </div>-->
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
      nodeForm: { name: null, id: null, type: null, approver: [] },
      approvers: ["Joyce","Allen","Teresa"],
      types: ['Start', 'Operation', 'End']
    };
  },
  methods: {
    handleClickSaveNode() {
        console.log(Object.assign(this.node, {
          name: this.nodeForm.name,
          type: this.nodeForm.type,
          approvers: [this.nodeForm.approver],
        }), 'update nodeeeeee');
      this.$emit(
        "update:node",
        Object.assign(this.node, {
          name: this.nodeForm.name,
          type: this.nodeForm.type,
          approvers: [this.nodeForm.approver],
        })
      );
      this.$emit("update:visible", false);
    },
    handleClickCancelSaveNode() {
      this.$emit("update:visible", false);
    },
    handleChangeApprover(e) {
        console.log(e);
      this.approvers.map(app=> {
          if (app === e) {
this.nodeForm.approver = app
              console.log(app, 'aproo');

          }
      })
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
        if (val.approvers && val.approvers.length > 0) {
          this.nodeForm.approver = val.approvers[0];
        }
      },
    },
  },
};
</script>