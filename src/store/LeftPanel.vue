<template>

<div id="obv-left-panel">
    <ul class="left-ui-menu">
        <li class="add-image">
            <a href="javascript:void(0);">
                <i class="icon-Add-Image">
                    <span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span>
                </i>Add Image
                <input type="file" name="file" accept="image/gif, image/jpeg, image/png" @change="uploadFile">
            </a>
        </li>
        <li class="add-text js-add-text">
        <a href="javascript:void(0);"><i class="icon-Add-Text"><span class="path1"></span><span class="path2"></span></i> Add Text
        </a></li>
    </ul>

    <add-text></add-text>


</div>
</template>

<script>
import AddText from './artwork/AddText.vue'
const reader  = new FileReader();

import feathers from 'feathers'
import hooks from 'feathers-hooks'
import socketio from 'feathers-socketio'
import io from 'socket.io-client'
const socket = io('http://localhost:3030', {transports: ['websocket']})

const feathersClient = feathers()
  .configure(hooks())
  .configure(socketio(socket))
const uploadService = feathersClient.service('uploads');


export default {
  name: 'left-panel',
  data () {
    return {
      open: true
    }
  },
  methods: {
    uploadFile: function (event) {
      let file = event.target.files[0];
      reader.readAsDataURL(file); // encode file
      reader.onload = function(event) {
        // The file's text will be printed here
        let upload = uploadService
          .create({uri: reader.result})
          .then(function(response){
              console.log('Server responded with: ', response);
          });
      };
    }
  },
  components: {
    'add-text': AddText
  },
}
</script>
