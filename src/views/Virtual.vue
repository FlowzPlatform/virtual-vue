<template>
  <div class="news-view">
   <HeaderContent v-if="isVirtual"></HeaderContent>
   <LeftPanel v-if="isVirtual"></LeftPanel>
   <RightPanel v-if="isVirtual"></RightPanel>
   <ImageGallery v-if="isVirtual"></ImageGallery>
   <ImageEditor v-if="isVirtual"></ImageEditor>
   <NotFound v-if="!isVirtual"></NotFound>
   <Loader v-if="!isVirtual"></Loader>
  </div>
</template>

<script>

import HeaderContent from '../components/Header.vue'
// import FooterContent from '../components/Footer.vue'
import LeftPanel from '../components/LeftPanel.vue'
import RightPanel from '../components/RightPanel.vue'
import ImageGallery from '../components/ImageGallery.vue'
import ImageEditor from '../components/ImageEditor.vue'
import NotFound from '../components/404.vue'
import Loader from '../components/Loader.vue'


export default {
  name: 'virtual-popup',

  components: {
    HeaderContent, LeftPanel, RightPanel, ImageGallery, ImageEditor, NotFound, Loader
  },

  data () {
    return {
      isVirtual: true
    }
  },

  computed: {

  },
  methods: {
    productExist() {
      return this.$store.dispatch('productExist')
    },

    supplierDetail() {
      return this.$store.dispatch('supplierDetail')
    },

    productDetail(params) {
      return this.$store.dispatch('productDetail', params)
    },

    defineImprintArea(productImprint) {
      let imprint = {}
      var unserialize = require('../classes/unserialize')
      let unIm = unserialize(productImprint.imprintParam)
      this.$store.commit('setProductImprint', { imprint: unIm } )
    },
    
    defineProductImages(virtualImages) {
      let imprint = {}
      let images = virtualImages.main
      this.$store.commit('setProductVariationImages', { images: images } )
    }
  },
  async beforeMount() {
    this.$store.commit('setVirtualData', { virtual: this.$route.query } )
    let res = await this.productExist()

    this.isVirtual = res.status
    if(res.status === true) {
      let response = await this.supplierDetail()
      let param = {
        _id: this.$store.state.virtualData.product_id,
        sku: this.$store.state.virtualData.sku,
        locale: this.$store.state.virtualData.culture
      }
      let productDetail = await this.productDetail(param)
      console.log(productDetail)

      this.defineImprintArea(productDetail.productImprint[0])
      await this.defineProductImages(productDetail.productImages.virtualImages)

      $('#gallery-thumbnails').owlCarousel({
          loop:false,
          margin:10,
          nav:true,
          touchDrag:true,
  		    mouseDrag:true,
          dots:false,
          responsiveClass:true,
          responsive:{
              0:{
                  items:1
              },
              400:{
                  items:3
              },
              600:{
                  items:4
              },
              991:{
                  items:4
              },
              1000:{
                  items:4
              }
          }
      });
    }
  },
  mounted() {

  }

}
</script>

<style>

</style>
