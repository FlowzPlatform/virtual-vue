<template>
  <div class="hello">
    <h1>Chat History</h1>
    <div>
      <div class="box" v-for="text in msg">
        <article class="media">
          <div class="media-left img-center">
            <figure class="image is-64x64">
              <img src="http://bulma.io/images/placeholders/128x128.png" alt="Image">
            </figure>
          </div>
          <div class="media-content">
            <div class="content">
              <p>
                <strong>{{text.name}}</strong> <small>@johnsmith</small> <small>31m</small>
                <br>
                {{text.text}}
              </p>

            </div>
            <nav class="level is-mobile">
              <div class="level-left">
                <a class="level-item">
                  <span class="icon is-small"><i class="fa fa-reply"></i></span>
                </a>
                <a class="level-item">
                  <span class="icon is-small"><i class="fa fa-retweet"></i></span>
                </a>
                <a class="level-item">
                  <span class="icon is-small"><i class="fa fa-heart"></i></span>
                </a>
              </div>
            </nav>
                </div>
        </article>
      </div>
    </div>

  </div>
</template>

<script>

// import feathers from 'feathers'
// import hooks from 'feathers-hooks'
// import socketio from 'feathers-socketio'
// import io from 'socket.io-client'
//
// const socket = io('http://localhost:3031', {transports: ['websocket']})
//
// const feathersClient = feathers()
//   .configure(hooks())
//   .configure(socketio(socket))
//
//
// // Get the service for our `messages` endpoint
// const messages = feathersClient.service('messages-mongo');

let data  = {
  msg: null
}
export default {
  name: 'hello',
  data () {
    return data
  },
  mounted() {
    messages.find().then(page => {
      console.log(page);
      data.msg = page.data;
    });
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
.img-center{
  display:inline;
}
</style>
