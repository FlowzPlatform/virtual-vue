<template>
<div id="layers" class="ui-right-panel">
    <div class="ui-button"><a href="javascript:void(0);"> <span> Layers </span> </a></div>
    <div class="layers-content">
       <div class="right-panel-heading">
          <h1><i class="icon-Layers-Large"></i> Layers </h1>
       </div>
       <div class="right-layer-panel layerposition">
         <ul class="layer-list" id="draglayers" v-sortable="{onEnd: reorder}">
           <li v-for="layer in currentLayers" :key = "layer.key">
            <div class="layer-media clearfix">
             <div class="layer-icon" v-if="layer.type=='image'">
                 <span class="icon-Add-Image">
                  <span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span>
                 </span>
             </div>
             <div class="layer-icon" v-else>
                <span class="icon-Add-Text">
                 <span class="path1"></span><span class="path2"></span>
                </span>
             </div>
             <div class="layer-content" v-if="layer.type=='image'">
               <img :src="baseUrl+layer.value" >
             </div>
             <div class="layer-content" v-else>
              {{ layer.value }}
             </div>
            </div>
           </li>
        </ul>
      </div>
    </div>
</div>
</template>
<script>
import { userUploadeImageUrl } from '../constants'
import { mapGetters } from 'vuex'

export default {
  name: 'layers',
  data () {
    return {
      baseUrl: '',
      layers: []
    }
  },
  mounted() {
    this.baseUrl = userUploadeImageUrl
  },
  methods: {
    reorder ({oldIndex, newIndex}) {
    	const movedItem = this.currentLayers.splice(oldIndex, 1)[0]
      this.currentLayers.splice(newIndex, 0, movedItem)

      let newcordinates = this.cordinates
      newcordinates.layers = this.currentLayers;
      this.$store.dispatch('setImageCordinates', newcordinates)
      return this.$store.dispatch('generateSequence',this.cordinates)

    }
  },
  computed: {
    currentLayers: {
      get: function () {
        return this.$store.state.imageCordinates.layers
      },
      set: function (val) {
        alert(val)
      }
    },
    ...mapGetters({
      cordinates: 'getImageCordinates',
    }),
    prettyJson: function () {
      if(this.currentLayers) return JSON.stringify(this.currentLayers)
      else return ""
    }
  }
}
</script>
<style>
.layer-content img {
  height: 33px
}
</style>
