<template>
<div id="obv-gallery-slider">
  <product-gallery></product-gallery>
  <product-thumb-gallery></product-thumb-gallery>
</div>
</template>

<script>
import ProductGallery from './gallery/ProductGallery.vue'
import ProductThumbGallery from './gallery/ProductThumbGallery.vue'

export default {
  name: 'image-gallery',
  data () {
    return {
      open: true
    }
  },
  components: {
    'product-gallery': ProductGallery, 'product-thumb-gallery': ProductThumbGallery
  }
}
</script>
