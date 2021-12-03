<template>
  <div id="app">
    <v-app id="inspire">
      <v-app id="keep">
        <v-app-bar app clipped-left color="green">
          <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
          <span class="title ml-3 mr-5"
            >Whabot
            <span class="font-weight-light">{{ this.title }}</span>
          </span>

          <v-spacer></v-spacer>
        </v-app-bar>

        <Menu :drawer="drawer" />

        <v-main class="grey lighten-4">
          <div id="app">
            <button
              type="button"
              @click="
                $refs.chart.add({
                  id: +new Date(),
                  x: 10,
                  y: 10,
                  name: 'New',
                  type: 'operation',
                  approvers: [{ id: 2, name: 'Allen' }],
                })
              "
            >
              Add
            </button>
            <button type="button" @click="$refs.chart.remove()">Del</button>
            <button type="button" @click="$refs.chart.editCurrent()">
              Edit
            </button>
            <button type="button" @click="$refs.chart.save()">Save</button>
            <flowchart
              :height="space"
              width="70%"
              :nodes="nodes"
              :connections="connections"
              @editnode="handleEditNode"
              @dblclick="handleDblClick"
              @editconnection="handleEditConnection"
              @save="handleChartSave"
              ref="chart"
            >
            </flowchart>
            <node-dialog
              :visible.sync="nodeDialogVisible"
              :node.sync="nodeForm.target"
            ></node-dialog>
            <connection-dialog
              :visible.sync="connectionDialogVisible"
              :connection.sync="connectionForm.target"
              :operation="connectionForm.operation"
            >
            </connection-dialog>
            <v-btn @click="addspace()">addspaceempty</v-btn>
            <v-btn @click="zoomout()">zoom out</v-btn>
          </div>
        </v-main>
      </v-app>
    </v-app>
  </div>
</template>

<script>
import Menu from "../../components/menu";
import ConnectionDialog from "./components/connectiondialog";
import NodeDialog from "./components/nodedialog";
import axios from "axios";

export default {
  components: {
    Menu,
    ConnectionDialog,
    NodeDialog,
  },
  props: {},
  data() {
    return {
      space: 600,
      drawer: true,
      title: "stages2",
      nodes: [
        // Basic fields
        {
          id: 1,
          x: 140,
          y: 270,
          width: 120,
          height: 70,
          name: "Start",
          type: "start",
        },
        // You can add any generic fields to node, for example: description
        // It will be passed to @save, @editnode
        {
          id: 2,
          x: 330,
          y: 140,
          width: 120,
          height: 70,
          name: "atendente",
          type: "ope",
          approvers: [{ id: 1, name: "opção 1" }],
        },
        {
          id: 3,
          x: 540,
          y: 270,
          width: 120,
          height: 70,
          name: "End",
          type: "end",
          description: "i'm here",
        },
      ],
      connections: [
        // {
        //   source: { id: 1, position: "top" },
        //   destination: { id: 2, position: "left" },
        //   id: 1,
        //   type: "pass", //pass or reject
        // },
        // {
        //   source: { id: 2, position: "right" },
        //   destination: { id: 3, position: "top" },
        //   id: 2,
        //   type: "pass", //pass, reject or any (gray color)
        // },
        // {
        //   source: { id: 2, position: "bottom" },
        //   destination: { id: 1, position: "right" },
        //   description: "teste",
        //   id: 3,
        //   type: "reject", //pass, reject or any (gray color)
        // },
      ],
      nodeForm: { target: null },
      connectionForm: { target: null, operation: null },
      nodeDialogVisible: false,
      connectionDialogVisible: false,
    };
  },
  created() {
    this.getAllConnections();
  },
  methods: {
    addspace() {
      this.space += 400;
    },
    zoomout() {},
    async getAllConnections() {
      await axios.get(`link/${this.$route.query.wor}`).then(res=>  this.connections = res.data );
    },
    handleChartSave(nodes, connections) {
      // axios.post(url, {nodes, connections}).then(resp => {
      //   this.nodes = resp.data.nodes;
      //   this.connections = resp.data.connections;
      //   // Flowchart will refresh after this.nodes and this.connections changed
      // });

      axios.post(`/link/${this.$route.query.wor}`, connections);
      console.log(nodes, "nodes");
      console.log(connections, "connections");
    },
    handleEditNode(node) {
      console.log(node, "handle edit node");
      this.nodeForm.target = node;
      this.nodeDialogVisible = true;
    },
    handleEditConnection(connection) {
      console.log(connection, "handle connection");
      this.connectionForm.target = connection;
      this.connectionDialogVisible = true;
    },
    handleDblClick(position) {
      console.log(position, "dblclick");
      this.$refs.chart.add({
        id: +new Date(),
        x: position.x,
        y: position.y,
        name: "New",
        type: "operation",
        approvers: [],
      });
    },
  },
};
</script>

<style>
#keep .v-navigation-drawer__border {
  display: none;
}
</style>
