<template>
<div>
  <h2>{{ title }}</h2>
 
</div>
</template>
<script>
// import io from 'socket.io-client'
// import axios from 'axios'

export default {
  created() {
//     var sockett = require('socket.io-client')('http://localhost:3000');

//     console.log(sockett);
// sockett.on('onCreatedChats:string', function(){
//   console.log('connected');
//   console.log(sockett);
// })

    // this.getMessages();
    
    // this.socket = io.connect('http://localhost:3000')

    // console.log(this.socket);

    //   this.socket.on('connect_error', res => console.log('connect ', res))


    // this.socket.on(`onCreatedChats:1`, msg => {
    //   console.log('listener ', msg);
    //   this.receiveMessage(msg)
    // })
    // .on('connect_error', err => console.log('connect err ', err.response))
    

  },
  methods: {

        // async sendMessage() {
          
        //   const res = await axios.post('chats', {
        //       cha_stage: this.text1,
        //       cha_cart: this.text2, 
        //       cha_user: this.text3, 
        //   })

        // console.log('criado ', res.data);

        // },
        // receiveMessage(msg) {
        //   console.log('receive msg ', msg);
        //   this.messages.push(msg)
        // },
        // async getMessages() {
        //   await axios.get('chats/1').then(res => {

        //     this.messages = res.data
        //   })
        // }
        
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