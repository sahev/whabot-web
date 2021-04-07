<template>
<div>
  <h2>{{ title }}</h2>
            <v-text-field
            v-model="text"
          ></v-text-field>
  <v-btn v-on:click.once="sendMessage">submit </v-btn>
  <ul>
<li v-for="(msg, i) in messages" :key="i">
  {{ msg }}
</li>
  </ul>
</div>
</template>
<script>
import io from 'socket.io-client'

export default {
  created() {
    // this.socket = io.connect('http://localhost:3000')
    // console.log(this.socket);
    // this.socket.on('msgToClientt', msg => {
    //   this.receiveMessage(msg)
    // })
  },
  methods: {
    // async getVehicles() {
    //       // const socket = io.connect('http://localhost:3000/');
    //       const socket = io('http://localhost:3000/connection');

    //       socket.emit('teste', 'mensagem de teste')
    //       // socket
    //       //   .on('asdas', (res) => {
    //       //     // eslint-disable-next-line no-param-reassign
    //       //     console.log('res', res);
    //       //     // state.recents.in.push(res[res.length - 1]);
    //       //     // console.log('open', res, res[res.length - 1]);
    //       //   })

    //     },
        sendMessage() {
          console.log('send message ', this.text);
          const socket = io.connect('http://localhost:3000/chats')
          socket.emit('msgToServer', this.text)
          socket.emit('events', { name: 'Nest' }, data => console.log(data));

          this.text = ''
        },
        receiveMessage(msg) {
          console.log('receive msg ', msg);
          this.messages.push(msg)
        }
  },
  data() {
    return {
      socket: null,
      text: '',
      title: "Homepage",
      messages: ['teste']
    }
  }
}
</script>