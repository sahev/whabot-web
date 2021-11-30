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
          <v-form>
            <v-row v-show="showSave">
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="newNodeType"
                  placeholder="palavras-chave"
                  maxlength="80"
                />

                <v-textarea
                  v-model="newNodeLabel"
                  placeholder="auto-resposta"
                />

                <v-btn @click="addNode">ADD</v-btn>
              </v-col>
            </v-row>
          </v-form>

          <v-form>
            <v-row v-show="showEdit">
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="selectedNode.type"
                  placeholder="palavras-chave"
                  maxlength="80"
                />

                <v-textarea
                  v-model="selectedNode.label"
                  placeholder="auto-resposta"
                />

                <v-btn @click="saveNode">save</v-btn>
                <v-btn
                  @click="
                    showSave = true;
                    showEdit = false;
                  "
                  >cancel</v-btn
                >
              </v-col>
            </v-row>
          </v-form>

          <v-col sm="12">
            <simple-flowchart
              :scene.sync="scene"
              @nodeClick="nodeClick"
              @linkAdded="linkAdded"
              @linkBreak="linkDelete"
              @nodeDelete="nodeDelete"
            ></simple-flowchart>
          </v-col>

          <v-col sm="12">
            <v-container fluid>
              <v-row justify="center">
                <v-col>
                  <Stages />
                </v-col>
              </v-row>
            </v-container>
          </v-col>
        </v-main>
      </v-app>
    </v-app>
  </div>
</template>

<script>
import axios from "axios";
import Stages from "./stages";
import Menu from "../../components/menu";
import SimpleFlowchart from "vue-simple-flowchart";
import "vue-simple-flowchart/dist/vue-flowchart.css";

export default {
  components: {
    Stages,
    Menu,
    SimpleFlowchart,
  },
  props: {},
  data() {
    return {
      drawer: true,
      title: "Workflows",
      selectedNode: {},
      newNodeType: "",
      newNodeLabel: "",
      showSave: true,
      showEdit: false,
      scene: {
        centerX: 1024,
        centerY: 140,
        scale: 1,
        nodes: [],
        links: [],
      },
    };
  },
  mounted() {
    this.getNodes();
    this.getLinks();
  },
  methods: {
    canvasClick(e) {
      console.log(e);
    },
    async getLinks() {
      let res = await axios.get('link/all');
      res.data.map(r=>{
        this.scene.links.push(r)
      })
    },
    linkDelete(id) {
      axios.delete(`/link/${id.id}`)
    },
    nodeDelete(id) {
      axios.delete(`/stages/${id}`);
      console.log("delete node ", id);
    },
    async linkAdded(link) {
      console.log("new link added:", link);
      let res = await axios.post('link',
        link
      )
      console.log(res);
    },
    saveNode() {
      this.scene.nodes.map((node) => {
        if (node.id == this.selectedNode.id) {
          node.label = this.selectedNode.label;
          node.type = this.selectedNode.type;
          this.showEdit = false;
          this.showSave = true;
        }
      });
      this.scene.nodes.map((node) => {
        axios.put("/stages", node);
      });
    },
    addNode() {
      let maxID = Math.max(
        0,
        ...this.scene.nodes.map((link) => {
          return link.id;
        })
      );
      this.scene.nodes.push({
        id: maxID + 1,
        x: -400,
        y: 50,
        type: this.newNodeType,
        label: this.newNodeLabel ? this.newNodeLabel : `test${maxID + 1}`,
      });

      axios.post("/stages", {
        id: maxID + 1,
        type: this.newNodeType,
        label: this.newNodeLabel ? this.newNodeLabel : `test${maxID + 1}`,
        workflow: this.$route.query.wor, // wor id
        x: -400,
        y: 50,
      });
    },
    async getNodes() {
      let res = await axios.get("/stages");
      res.data.map((r) => this.scene.nodes.push(r));
    },
    nodeClick(id) {
      this.scene.nodes.filter((node) => {
        if (node.id == id) {
          this.selectedNode = node;
          console.log(this.selectedNode);
        }
      });
      this.showEdit = true;
      this.showSave = false;
      this.$forceUpdate();
    },
  },
};
</script>

<style>
#keep .v-navigation-drawer__border {
  display: none;
}
</style>
