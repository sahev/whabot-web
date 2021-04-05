<template>
  <v-navigation-drawer v-model="drawer" app clipped color="grey lighten-4">
    <v-list dense class="grey lighten-4">
      <template v-for="(item, i) in items">
        <v-row v-if="item.heading" :key="i">
          <v-col cols="6">
            <v-subheader v-if="item.heading">
              {{ item.heading }}
            </v-subheader>
          </v-col>
        </v-row>
        <v-divider
          v-else-if="item.divider"
          :key="i"
          dark
          class="my-4"
        ></v-divider>
        <v-list-item v-else :key="i" link :to="item.page">
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="grey--text">
              {{ item.text }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
export default {
  props: {
    drawer: Boolean
  },
  created() {
    this.menu = this.drawer
  },
  data() {
    return {
      menu: true,
      items: [
        { heading: "Início" },
        { icon: "mdi-home", text: "Início", page: "/" },
        { icon: "mdi-robot", text: "Robôs", page: "bots" },
        { divider: true },
        { heading: "Mensagens" },
        { icon: "mdi-frequently-asked-questions", text: "FAQ's", page: "faqs" },
        { icon: "mdi-sitemap", text: "Workflows", page: "workflows" },
        { divider: true },
        { icon: "mdi-cog", text: "Configurações", page: "configs" },
        { icon: "mdi-help-circle", text: "Ajuda", page: "help" },
      ],
    };
  },
  methods: {
    redirect(i) {
      this.$router.push(i);
    },
  },
};
</script>
