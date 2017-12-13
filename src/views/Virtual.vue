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
import { imageProcessingUrl } from '../constants'

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
    productExist () {
      return this.$store.dispatch('productExist')
    },

    supplierDetail () {
      return this.$store.dispatch('supplierDetail')
    },

    productDetail (params) {
      return this.$store.dispatch('productDetail', params)
    },

    defineImprintArea (productImprint) {
      var unserialize = require('../classes/unserialize')
      let unIm = unserialize(productImprint)
      this.$store.dispatch('setProductImprint', unIm)
    },

    setImprintDetails (imprint) {
      // var unserialize = require('../classes/unserialize')
      // let unIm = unserialize(productImprint)
      console.log(imprint)
      this.$store.dispatch('setProductImprintDetails', imprint)
    },

    defineProductImages (virtualImages) {
      let images = virtualImages
      this.$store.dispatch('setProductVariationImages', images)

      // TODO this should be a product main image.
      let pImage = images[0].image
      this.$store.dispatch('setProductImage', pImage)
      this.$store.dispatch('setImageUrl', imageProcessingUrl + 'products/' + pImage)
    }
  },
  async beforeMount () {
    this.$store.dispatch('setVirtualData', this.$route.query)
    let res = await this.productExist()

    this.isVirtual = res.status
    if (res.status === true) {
      await this.supplierDetail()
      let productDetail = await this.productDetail(this.$store.state.virtualData.product_id)
      console.log(productDetail)
      this.defineImprintArea(productDetail.imprintDetail[0].imprintParam)
      this.setImprintDetails(productDetail.imprintDetail)
      await this.defineProductImages(productDetail.imprintDetail[0].images)
    }
  },
  mounted () {
  }
}
</script>

<style>

</style>
