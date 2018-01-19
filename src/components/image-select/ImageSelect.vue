<template>
  <div>
    <div class="selector" v-show="show">
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import generateSequence from '../../store/actions.js'
import Temp from '../../classes/Temp'
import { userUploadeImageUrl, imageProcessingUrl } from '../../constants'

import '../../../static/css/jquery-ui.css'
let data = {
  text_area_work: 0,
  image_area_work: 0,
  productHeight: 0,
  productWidth: 0,
  height: [],
  width: [],
  left: [],
  top: [],
  leftN: [],
  topE: [],
  leftS: [],
  topW: [],
  flip: [],
  flop: [],
  rotate: [],
  background: [],
  alignment: [],
  options: {},
  userUploadedImageUrl: [],
  userUploadedImage: [],
  texts: [],
  text_height: [],
  text_width: [],
  text_left: [],
  text_top: [],
  text_leftN: [],
  text_topE: [],
  text_leftS: [],
  text_topW: [],
  text_color: [],
  font_size: [],
  text_flip: [],
  text_flop: [],
  text_rotate: [],
  text_curve: [],
  text_alignment: [],
  font_family: [],
  imprintMethod: null,
  imprintColor: '000000',
  artwork_height: 0,
  artwork_width: 0,
  artwork_left: 0,
  artwork_top: 0,
  order: [],
  layers: [],
  cachedImages: [],
  cropped: 0,
  show: false,
  isActive: null,
  commonIndex: 1
}

export default {
  name: 'image-select',
  data () {
    return data
  },
  computed: {
    ...mapGetters({
      isUploaded: 'getIsUpload',
      userUploadedImageName: 'getUserUploadedImageName',
      isTextAdded: 'getIsTextAdded',
      text: 'getText',
      productImage: 'getProductImage'
    }),

    productImprintArea: function () {
      return this.$store.state.productImprint.length === 0 ? null : this.$store.state.productImprint[0]
    }
  },
  watch: {
    isUploaded: async function (value) {
      if (value === true) {
        let ch = new Temp()
        let imageUrl = userUploadeImageUrl + this.userUploadedImageName
        let imageProps = await ch.addImageProcess(imageUrl)
        let imgCordinates = ch.imageCordinates(imageProps, this.artwork_width, this.artwork_height)

        let productImage = imageProcessingUrl + 'products/' + this.productImage
        let productImageProps = await ch.addImageProcess(productImage)
        let productImageCordinates = ch.imageCordinates(productImageProps, 500, 500)

        this.productHeight = productImageCordinates.height
        this.productWidth = productImageCordinates.width
        this.image_area_work++
        this.options.isEditable = 1
        this.options.height = imgCordinates.height
        this.options.width = imgCordinates.width
        this.options.imageLeft = 0
        this.options.imageTop = 0
        this.options.isMovable = 1
        this.options.isRemovable = 1
        this.options.commonIndex = this.commonIndex
        $('.selector').append('<div class="obv-product-design-objects-image-i' + this.image_area_work + ' vj-hotspot-selected child-selector"></div>')
        ch.imageArea('obv-product-design-objects-image-i' + this.image_area_work, this)
        this.generateSequence()
        this.commonIndex++
      }
    },

    isTextAdded: async function (value) {
      if (value === true) {
        let ch = new Temp()

        let productImage = imageProcessingUrl + 'products/' + this.productImage
        let productImageProps = await ch.addImageProcess(productImage)
        let productImageCordinates = ch.imageCordinates(productImageProps, 500, 500)

        this.productHeight = productImageCordinates.height
        this.productWidth = productImageCordinates.width
        this.text_area_work++
        this.options.isEditable = 1
        this.options.height = 70
        this.options.width = this.artwork_width
        this.options.imageLeft = 0
        this.options.imageTop = 0
        this.options.isMovable = 1
        this.options.isRemovable = 1
        this.options.text = this.text
        this.options.commonIndex = this.commonIndex
        $('.selector').append('<div class="obv-product-design-objects-text-i' + this.text_area_work + ' vj-hotspot-selected child-selector"></div>')
        ch.textArea('obv-product-design-objects-text-i' + this.text_area_work, this)
        this.generateSequence()
        this.commonIndex++
      }
    },

    productImprintArea: function (value) {
      if (value !== null) {
        let wH = value.product_imprint_image_size.split('X')
        let lT = value.product_template_left_top.split(',')

        let ch = new Temp()
        this.options.isEditable = 0
        this.options.isMovable = 0
        this.options.isRemovable = 0
        this.options.height = parseInt(wH[1])
        this.options.width = parseInt(wH[0])
        this.artwork_width = parseInt(wH[0])
        this.artwork_height = parseInt(wH[1])
        this.artwork_left = parseInt(lT[0])
        this.artwork_top = parseInt(lT[1])
        this.options.imageLeft = parseInt(lT[0])
        this.options.imageTop = parseInt(lT[1])

        ch.imageArea('selector', this)
        this.show = true
      }
    }
  },
  methods: {
    generateSequence: function () {
      this.$store.dispatch('setImageCordinates', data)
      return this.$store.dispatch('generateSequence', data)
    }
  },
  mounted: function () {

  }
}
</script>

<style>

.selector .vj-hotspot-selected {
  /*width: 100px;
  height: 100px;
  /*background-color: rgba(66,194,217,0.2);
  z-index: 1000;*/
  border: 1px dashed;
  /*position: absolute;*/
}

.vj-hotspot-hover {
  border: 1px dashed;
}
.ui-resizable-e {
    cursor: e-resize;
    width: 7px;
    right: -5px;
    top: 0;
    height: 100%;
    position: absolute;
}
.ui-resizable-w {
    cursor: w-resize;
    width: 7px;
    left: -5px;
    top: 0;
    height: 100%;
    position: absolute;
}
.ui-resizable-n {
    cursor: n-resize;
    height: 7px;
    width: 100%;
    top: -5px;
    left: 0;
    position: absolute;
}
.ui-resizable-s {
    cursor: s-resize;
    height: 7px;
    width: 100%;
    bottom: -5px;
    left: 0;
    position: absolute;
}
.ui-resizable-se {
    cursor: se-resize;
    width: 12px;
    height: 12px;
    right: 1px;
    bottom: 1px;
    position: absolute;
}
.ui-resizable-ne {
    cursor: ne-resize;
    width: 9px;
    height: 9px;
    right: -5px;
    top: -5px;
    position: absolute;
}
.ui-resizable-sw {
    cursor: sw-resize;
    width: 9px;
    height: 9px;
    left: -5px;
    bottom: -5px;
    position: absolute;
}
.ui-resizable-nw {
    cursor: nw-resize;
    width: 9px;
    height: 9px;
    left: -5px;
    top: -5px;
    position: absolute;
}
.rotate-icon {
  position: relative;
  bottom: 15px;
}
.ui-rotatable-handle {
  height: 15px;
  width: 100%;
  position: absolute;
  top: -15px;
  left: 0px;
  bottom: 0px;
}
</style>
