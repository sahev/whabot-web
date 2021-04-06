
// import axios from 'axios'

export default {
  props: {
    open: Boolean,
    status: String,
  },
  data() {
    return {
      data: false,
    };
  },
  watch: {
    open(newValue) {
      this.getBotStatus(newValue);
    }
  },
  methods: {
    async getBotStatus(data) {
      // let res = await axios.get("/bots");
      // return res.data
      console.log(data);
    },
  },
};
