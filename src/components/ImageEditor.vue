<template>
<!--IMAGE EDITOR-->
    <div id="obv-editor" class="ui-image-editor">
        <ul class="">
            <texts v-if="isTextOrImage!='image'"></texts>
            <swatches v-if="isTextOrImage!='image'"></swatches>
            <alignment></alignment>
            <opacity></opacity>
            <rotate></rotate>
            <reflect></reflect>
            <crop v-if="isTextOrImage!='text'"></crop>
            <!-- <layer></layer> -->
            <delete></delete>
        </ul>
    </div>
    <!--END IMAGE EDITOR-->
</template>

<script>
import Texts from './artwork/Texts.vue'
import Swatches from './artwork/Swatches.vue'
import Alignment from './artwork/Alignment.vue'
import Opacity from './artwork/Opacity.vue'
import Rotate from './artwork/Rotate.vue'
import Reflect from './artwork/Reflect.vue'
import Crop from './artwork/Crop.vue'
import Layer from './artwork/Layer.vue'
import Delete from './artwork/Delete.vue'

export default {
  name: 'image-editor',
  components: {
    'swatches': Swatches, 'alignment': Alignment, 'opacity': Opacity,
    'rotate':Rotate,'reflect': Reflect, 'crop': Crop, 'layer':Layer, 'texts':Texts,
    'delete':Delete
  },
  data () {
    return {
      imageCordinates: null
    }
  },
  created(){
    this.imageCordinates = this.$store.state.imageCordinates
  },
  computed:{
    isTextOrImage: function() {
      return this.$store.state.isSelectedArea!= null ? this.$store.state.isSelectedArea.key : this.$store.state.isSelectedArea
    }
  }
}
</script>
