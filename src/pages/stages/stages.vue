<template>
  <div class="row">
      <v-card v-for="(stage, i) in stages" :key="i"
    class="mx-auto"
    max-width="250"
  >
    <v-card-text>
      <div>Estágio: {{ i+1 }}</div>
      <p class="display-1 text--primary">
        {{ stage.sta_name }}
      </p>
      <div v-for="(element, i) in filterWordKeys(stage.sta_stage)"
          :key="i">
      <p >
          {{ element.wok_word }}
          </p>
        
</div>
    </v-card-text>
    <v-card-actions>
      <v-btn
        text
        color="deep-purple accent-4"
      >
        Learn More
      </v-btn>
    </v-card-actions>
  </v-card>

  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: "two-list-headerslots",
  display: "Two list header slot",
  order: 14,
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
  mounted() {
    this.getStagesByWorkflow(this.workflow);
    this.getWordKeys();
  },
  created() {
    this.workflow = this.$route.query.wor;
  },
  data() {
    return {
      stages: Array,
      wordkeys: Array,
      workflow: Number,
    };
  },
  methods: {
    filterWordKeys(stage) {
      let wk = [];

      this.wordkeys.forEach(res => {
        if(res.wok_stage === stage) {
          wk.push(res)
        }
      });
      
      return wk
    },

    async getStagesByWorkflow(workflow) {
      let r = await axios.get(`stages/${workflow}`)
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
