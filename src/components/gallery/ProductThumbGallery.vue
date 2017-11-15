<template>
  <div class="container">
    <div class="gallery-image">
        <div id="gallery-thumbnails" class="owl-carousel">
            <div class="item" v-for="variation in variations"><a href="javascript:void(0);" class="product-thumb-anchar" @click="selectedImage(variation.image)"><img :src="imageProcessingUrl + 'products/'+variation.image" /></a></div>
        </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { imageProcessingUrl } from '../../constants'
export default {
  name: 'product-thumb-gallery',
  data () {
    return {
      imageProcessingUrl: imageProcessingUrl
    }
  },
  computed: {
    ...mapGetters({
      url: 'getImageUrl',
      cordinates: 'getImageCordinates',
      variations: 'getProductVariationImages'
    }),
    isTextOrImage: function() {
      return this.$store.state.isSelectedArea!= null ? true : false
    }
  },
  methods: {
    selectedImage(img){
      this.$store.commit('setProductImage', { value: img } )
      if(this.isTextOrImage) return this.$store.dispatch('generateSequence',this.cordinates)
    }
  }
}
</script>
