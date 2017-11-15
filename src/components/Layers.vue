<template>
<div id="layers" class="ui-right-panel">
    <div class="ui-button"><a href="javascript:void(0);"> <span> Layers </span> </a></div>
    <div class="layers-content">
       <div class="right-panel-heading">
          <h1><i class="icon-Layers-Large"></i> Layers </h1>
       </div>
       <div class="right-layer-panel layerposition">
         <ul class="layer-list" id="draglayers" v-sortable="{ onUpdate: onUpdate }">
           <li v-for="layer in currentLayers">
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
    // this.layers = this.$store.state.imageCordinates.layers
    // this.swapElement(3,1,[1,2,3,4])
  },
  methods: {
    onUpdate: function (event) {
      // console.log(this.currentLayers)
      // this.currentLayers.splice(event.newIndex, 0, this.currentLayers.splice(event.oldIndex, 1)[0])
      // console.log( newLayers.splice(event.oldIndex, 1)[0])

      // newLayers.splice(event.newIndex, 0, newLayers.splice(event.oldIndex, 1)[0])
      // console.log(event.newIndex)
      // console.log(event.oldIndex)
//
      // console.log(this.currentLayers);
      let newLayers = this.currentLayers
      let newLayer = this.swapElement(event.oldIndex, event.newIndex, newLayers)
      // console.log(this.currentLayers);

      let newcordinates = this.cordinates
      newcordinates.layers = newLayer;
      this.$store.commit('setImageCordinates', { cordinates:newcordinates } )
      return this.$store.dispatch('generateSequence',this.cordinates)
    },
    swapElement(target, swap, arr){
      // 3, 0
      // [1,2,3,4]
      // [4,1,2,3]

      // 2, 0
      // [1,2,3,4]
      // [3,1,2,4]

      // console.log(arr)

      // let result = []
      // result[swap] = arr[target]
      // console.log(result)

      // for (var i = 0; i < arr.length; i++) {
      //   if(target > swap) {
      //     if(i >= swap) {
      //       if(i == swap) result[i] = arr[target]
      //       else if(i == target) result[i] = arr[target]
      //       else result[i] = arr[i-1]
      //     }
      //   }
      // }
      // let temp = arr[swap]
      // arr[swap] = arr[target]
      // arr[target] = temp
      // console.log(arr)
      // alert(arr.splice(target, 1)[0])
      let result = []
      result = arr
      // console.log(result)

      // let temp = arr[target]
      // arr.splice(target, 1)[0]
      let temp = result.splice(target, 1)[0]
      result.splice(swap, 0, temp)
      // arr[swap] = temp
      // console.log(result)
      // alert(swap)
      return result
    }
  },
  computed: {
    currentLayers: {
      get: function () {
        return this.$store.state.imageCordinates.layers
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
