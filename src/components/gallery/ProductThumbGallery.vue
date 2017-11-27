<template>
  <div class='carousel-view'>
      <div class="container">
        <div class="gallery-image">
            <div>
              <transition-group
                class='carousel'
                tag="div">
                <div class="item" v-for="(variation, index) in variations" :key="index"><a href="javascript:void(0);" class="product-thumb-anchar" @click="selectedImage(variation.image)"><img :src="imageProcessingUrl + 'products/'+variation.image" /></a></div>
              </transition-group>
            </div>
        </div>
      </div>
    <div class='carousel-controls'>
      <div class='carousel-controls__button owl-prev' @click="previous">pre</div>
      <div class='carousel-controls__button owl-next' @click="next">next</div>
    </div>
    <!-- <i class="fa fa-angle-right fa-5" aria-hidden="true"></i>

    <i class="fa fa-angle-left fa-5" aria-hidden="true"></i> -->

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
      cordinates: 'getImageCordinates'
      // variations: 'getProductVariationImages'
    }),
    variations: {
      get: function() {
        return this.$store.state.productVariationImages
      },
      set: function(val) {
        this.$store.commit('setProductVariationImages', { images: val } )
      }
    },
    isTextOrImage: function() {
      return this.$store.state.isSelectedArea!= null ? true : false
    }
  },
  methods: {
    selectedImage(img){
      this.$store.commit('setProductImage', { value: img } )
      this.$store.commit('setImageUrl', { url: imageProcessingUrl+'products/'+img } )
      if(this.isTextOrImage) return this.$store.dispatch('generateSequence',this.cordinates)
    },
    next () {
      const first = this.variations.shift()
      this.variations = this.variations.concat(first)
    },
    previous () {
      const last = this.variations.pop()
      this.variations = [last].concat(this.variations)
    }
  }
}
</script>

<style>
a.product-thumb-anchar img{
  width: 50px;
  height: 50px;
  margin: 0 10px 0 10px;
  display: inline-block;
  border: 1px solid #4c4c4c;
}
.carousel-view {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.carousel {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  width: 24em;
  /*min-height: 25em;*/
}
.slide {
  flex: 0 0 20em;
  height: 20em;
  margin: 1em;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0.1em dashed #000;
  border-radius: 50%;
  transition: transform 0.3s ease-in-out;
}
.slide:first-of-type {
  opacity: 0;
}
.slide:last-of-type {
  opacity: 0;
}
</style>
