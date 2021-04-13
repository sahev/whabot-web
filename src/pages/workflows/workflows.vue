<template>
  <div class="row">
    <div class="col-4" v-for="(stage, i) in stages" :key="i">
      <h3>{{ stage.sta_name }}</h3>


        <div
          class="list-group-item item"
          v-for="(element, i) in filterWordKeys(stage.sta_stage)"
          :key="i"
        >
          {{ element.wok_word }}
        </div>

        <div
          slot="header"
          class="btn-group list-group-item"
          role="group"
          aria-label="Basic example"
        ></div>
        <v-btn class="btn btn-secondary">Add</v-btn>
        <v-btn class="btn btn-secondary">Replace</v-btn>
    </div>

    <!--<div class="col-4">
      <h3>estágio 2</h3>

       <draggable
        :list="estagio2"
        class="list-group"
        draggable=".item"
        group="a"
      >
        <div
          class="list-group-item item"
          v-for="(element, i) in estagio2"
          :key="i"
        >
          {{ element.word }}
        </div>

        <div
          slot="header"
          class="btn-group list-group-item"
          role="group"
          aria-label="Basic example"
        ></div>
        <v-btn class="btn btn-secondary">Add</v-btn>
        <v-btn class="btn btn-secondary">Replace</v-btn>
      </draggable> 
    </div>-->
  </div>
</template>

<script>
// import draggable from "vuedraggable";
import axios from 'axios'

export default {
  name: "two-list-headerslots",
  display: "Two list header slot",
  order: 14,
  components: {
    // draggable,
  },
  watch: {
    estagio1: {
      handler: function(val) {
        console.log("list 1", val);
      },
      deep: true,
    },
    estagio2: {
      handler: function(val) {
        console.log("list 2", val);
      },
      deep: true,
    },
  },
  created() {
    this.getStages();
    this.getWordKeys();
  },
  data() {
    return {
      stages: Array,
      wordkeys: Array
    };
  },
  methods: {
    filterWordKeys(stage) {
      let wk = [];

      this.wordkeys.forEach(res => {
        if(res.wok_stage === stage) {
          console.log('res' ,res);
          wk.push(res)
        }
      });
      
      return wk
    },

    async getStages() {
      let r = await axios.get('stages/4')
      this.stages = r.data
      
    },
    async getWordKeys() {
      let r = await axios.get(`wordkeys/`)
      this.wordkeys = r.data
      
    }
  },
};
</script>
<style scoped></style>
