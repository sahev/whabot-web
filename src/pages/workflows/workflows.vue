<template>
<v-container>
  <v-list three-line>
    <template v-for="(wk, i) in workflows">
      <v-divider
        v-if="wk.divider"
        :key="i"
        :inset="wk.inset"
      ></v-divider>

      <v-list-item v-else :key="i" link :to="{ path: 'stages', query: { wor: wk.wor_workflow } }">
        <v-list-item-avatar>
          <v-avatar :key="i" :color="randomColor()">
            <span class="white--text ">{{getInitials(wk.wor_name)}}</span>
          </v-avatar>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title v-html="wk.wor_name"></v-list-item-title>
          <v-list-item-subtitle v-html="wk.wor_bot"></v-list-item-subtitle>
        </v-list-item-content>


    <v-chip small v-for="(bot, b) in filterBots(wk.wor_workflow)" :key="b" >
            <v-icon left>
        mdi-label
      </v-icon>
      {{ bot.bot_name }}
    </v-chip>
      </v-list-item>
    </template>

  </v-list>
</v-container>
</template>

<script>
import axios from "axios"

// import draggable from "vuedraggable";
export default {
  components: {
  },
  data: () => ({
    showStage: false,
    colors: ["red", "blue", "green", "cyan", "black", "brown"],
    workflows: [],
    bots: []
  }),
  created() {
    this.getWorkflows();
    this.getBots();
  },
  methods: {
    redirect() {
      // router.push({ path: 'register', query: { plan: 'private' }})
    },
    filterBots(workflow) {
      let data = [];

      this.bots.forEach(res => {
        if(res.bot_workflow === workflow) {
          data.push(res)
        }
      });
      return data
    },
    async getWorkflows() {
      let r = await axios.get('workflows')
      r.data.map(res => {
        this.workflows.push(res)
        this.workflows.push({ divider: true, inset: true })
      })
    },
    async getBots() {
      let r = await axios.get('workflows/bots')
      this.bots = r.data
      console.log('bots ', this.bots);
    },
    randomColor() {
      let r = Math.random() * 255;
      let g = Math.random() * 255;
      let b = Math.random() * 255;
      
      return `rgba(${r}, ${g}, ${b}, 1)`;
    },
    getInitials(fullName) {
      const allNames = fullName.trim().split(" ");
      const initials = allNames.reduce(
        (acc, curr, index) => {
          if (index === 0 || index === allNames.length - 1) {
            acc = `${acc}${curr.charAt(0).toUpperCase()}`;
          }
          return acc;
        },
        [""]
      );
      return initials;
    },
  },
};
</script>
<style scoped></style>
