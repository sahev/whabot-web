<template>
<div>
  <h2>{{ title }}</h2>
 
</div>
</template>
<script>
export default {
  created() {
  },
  methods: { 
  },
  
  data() {
    return {
      text1: '',
      text2: '',
      text3: '',
      data: {},
      items: [],
      socket: null,
      text: '',
      title: "Homepage",
      messages: []
    }
  }
}
</script>