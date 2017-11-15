<template>
<div class="image-gallery">
    <section>
        <div class="parent">
        <div class="image-display">
            <div class="panzoom">
              <div class="owl-carousel" id="image-gallery">

                    <div class="item"><div class="obv-product-main-images"><image-select></image-select><img :src="url" alt="" height="500"></div></div>
                    
                    <!-- <div class="item"><div class="obv-product-main-images"><img :src="imageProcessingUrl + '/products/54607c1317207c5f03d63af1/12323rdfcabc234/main/product-img.png'" alt=""></div>
                    </div>
                    <div class="item"><div class="obv-product-main-images"><img :src="imageProcessingUrl + '/products/54607c1317207c5f03d63af1/12323rdfcabc234/main/product-img.png'" alt="" ></div></div>
                    <div class="item"><div class="obv-product-main-images"><img :src="imageProcessingUrl + '/products/54607c1317207c5f03d63af1/12323rdfcabc234/main/product-img.png'" alt="" ></div></div> -->
                </div>
            </div>
        </div>
        </div>
        <div class="zoom-btn">
            <button class="zoom-in"><i class="icon-Plus"> </i> </button>
            <button class="zoom-out"> <i class="icon-Minus"> </i></button>
            <a href="http://demo.officebrain.com/html/virtual-desktop/product_detail.php" target="_blank" class="close-full-view js-close-full-view">
                <span class="icon-shrink"></span>
            </a>
        </div>
    </section>
</div>
</template>
<style>
.obv-product-main-images{
  width: 412px;
  height: 502px;
  padding-right: 2px;
  margin: 0 auto;
  position: relative;
}
.item:before {
    content: "";
    height: 100%;
}
.item:before, .obv-product-main-images {
    display: inline-block;
    vertical-align: middle;
}
</style>
<script>
import { mapGetters } from 'vuex'
import ImageSelect from '../image-select/ImageSelect.vue'
import { imageProcessingUrl } from '../../constants'

export default {
  name: 'product-gallery',
  data () {
    return {
      open: true,
      imageProcessingUrl: imageProcessingUrl
    }
  },
  components : {'image-select':ImageSelect},

  computed: {
    ...mapGetters({
      url: 'getImageUrl'
    })
  }
}
</script>
