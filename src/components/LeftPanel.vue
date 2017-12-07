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
// import fetchImageUrl from '../store/actions.js'
const reader = new FileReader()

export default {
  name: 'left-panel',
  data () {
    return {
      open: true
    }
  },
  methods: {
    uploadFile: function (event) {
      let store = this.$store
      let file = event.target.files[0]
      reader.readAsDataURL(file)
      reader.onload = function (event) {
        return store.dispatch('fetchImageUrl', reader)
      }
    }
  },
  components: {
    'add-text': AddText
  }
}
</script>
