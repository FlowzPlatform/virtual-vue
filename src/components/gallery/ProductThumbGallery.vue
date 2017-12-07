<template>
  <div class='carousel-view'>
      <div class="container">
        <div class="gallery-image">
            <div>
              <!-- <div class='carousel-controls__button prev' >pre</div> -->
              <i aria-hidden="true" class="fa fa-angle-left fa-3 prev" @click="previous"></i>
              <transition-group
                class='carousel'
                tag="div">
                  <div class="item" v-for="(variation, index) in variations" :key="index"><a href="javascript:void(0);" class="product-thumb-anchar" @click="selectedImage(variation.image)"><img :src="imageProcessingUrl + 'products/'+variation.image" /></a></div>
              </transition-group>
              <!-- <div class='carousel-controls__button next' @click="next">next</
              cursor: pointer;div> -->
              <i aria-hidden="true" class="fa fa-angle-right fa-3 next" @click="next"></i>


            </div>
        </div>
      </div>
    <div class='carousel-controls'>
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
      get: function () {
        return this.$store.state.productVariationImages
      },
      set: function (val) {
        this.$store.dispatch('setProductVariationImages', val)
      }
    },
    isTextOrImage: function () {
      return this.$store.state.isSelectedArea !== null ? true : false
    }
  },
  methods: {
    selectedImage (img) {
      this.$store.dispatch('setProductImage', img)
      this.$store.dispatch('setImageUrl', imageProcessingUrl + 'products/' + img)
      if (this.isTextOrImage) return this.$store.dispatch('generateSequence', this.cordinates)
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
  width: 70px;
  height: 70px;
  margin: 0 10px 0 10px;
  display: inline-block;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  padding: 10px;
}
.carousel-view {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.carousel {
  display: -webkit-box;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  width: 24em;
  /*min-height: 25em;*/
  float: left;
  width: 80%;
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
.prev {
  float: left;
  width: 10%;
  padding-top: 25px;
  cursor: pointer;
}
.next {
  float: right;
  width: 10%;
  padding-top: 25px;
  cursor: pointer;
}
</style>
