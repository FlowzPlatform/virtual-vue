<template>
<li class="dropdown">
  <a href="javascript:void(0);" data-toggle="dropdown" data-hover="tooltip" @click="isImageText" data-placement="left" title="Crop">
        <i class="icon-Crop"></i>
    </a>
    <div class="dropdown-menu" v-show="isWorkSelected">
      <h2>Crop</h2>
        <div class="crop-ui-col">
          <div class="crop-editor cropImage">
            <!-- <div class="cropImageaa"> -->
              <img id="cropImageUrl" v-bind:src="cropImageUrl" >
            <!-- </div> -->
          </div>
        </div>
        <div class="action-button">
          <a href="javascript:void(0);"  id="cancelCrop" class="btn-default">Cancel</a>
            <a href="javascript:void(0);" id="confirmCrop" @click="confirmCrop_" class="btn-default">Confirm</a>
        </div>
     </div>
 </li>
</template>
<script src="http://deepliquid.com/projects/Jcrop/js/jquery.Jcrop.js"> </script>
import { log } from "util";

import { log } from "util";

<script>

/*eslint-disable */
import { mapGetters } from 'vuex'
import Temp from '../../classes/Temp'

export default {
  name: 'crop',
  data () {
    return {
      open: true,
      cropImageUrl: '',
      imageAxis: {},
      jcrop_api: '',
      imageDimension: [],
      ias: null
    }
  },
  methods: {
    isImageText () {
      if (this.isWorkSelected === false) {
        alert('Please select a Image/Text')
        return false
      } else {
        let isSelectedAreaKey = this.$store.state.isSelectedArea.value - 1
        let newcordinates = this.cordinates
        this.cropImageUrl = newcordinates.userUploadedImageUrl[isSelectedAreaKey].value
      }
    },
    confirmCrop: async function () {
      let crop = []
      let isSelectedAreaKey = this.$store.state.isSelectedArea.value - 1
      let selectedImprint = this.productSelectedImprint
      let index = _.findIndex(this.cordinates, function (o) { return o.position === selectedImprint })
      let newcordinates = this.cordinates[index]


      let cropImage = newcordinates.userUploadedImage[isSelectedAreaKey].value

      // calculate crop dimension
      this.cropImageUrl = newcordinates.userUploadedImageUrl[isSelectedAreaKey].value
      let imgWidth, imgHeight
      let imgLoad = $('<img />')

      imgLoad.attr('src', this.cropImageUrl)
      imgLoad.on('load', function () {
        imgWidth = this.width
        imgHeight = this.height
      })

      imgWidth = imgLoad[0].width
      imgHeight = imgLoad[0].height
      let $img = $('#cropImageUrl')
      let width = $img.width()
      let height = $img.height()
      let tempHeight = (imgHeight / height).toFixed(2)
      let tempWidth = (imgWidth / width).toFixed(2)
      let tempX = (tempWidth * this.imageAxis['x'])
      let tempY = (tempHeight * this.imageAxis['y'])
      let tempH = (tempHeight * this.imageAxis['h']).toFixed(2)
      let tempW = (tempWidth * this.imageAxis['w']).toFixed(2)
      this.imageAxis['x'] = tempX
      this.imageAxis['y'] = tempY
      this.imageAxis['w'] = tempW
      this.imageAxis['h'] = tempH
      crop['cropAxis'] = this.imageAxis
      crop['cropImage'] = cropImage
      console.log(tempW)
      console.log(tempH)
      // make it to aspect ratio
      // to do
      await this.$store.dispatch('cropImage', crop)
      let url
      let time = new Date().getTime()
      if (newcordinates.userUploadedImageUrl[isSelectedAreaKey].value.indexOf('?h=') !== -1) {
        url = newcordinates.userUploadedImageUrl[isSelectedAreaKey].value.replace('?', '?' + time)
      } else {
        url = newcordinates.userUploadedImageUrl[isSelectedAreaKey].value = newcordinates.userUploadedImageUrl[isSelectedAreaKey].value + '?' + time
      }
      this.cropImageUrl = url
      this.jcrop_api.setImage(this.cropImageUrl)
      newcordinates.cropped = newcordinates.cropped + 1

      let setCords = this.cordinates
      setCords[index] = newcordinates
      this.$store.dispatch('setImageCordinates', setCords)
      return this.$store.dispatch('generateSequence', newcordinates[index])
    },
    initJcrop: function (oImg) {
      let vthis = this
      oImg.Jcrop({
        setSelect: [0, 0, 150, 150],
        onChange: this.showCoords
        // boxWidth: 400,
        // boxHeight: 200
      }, function () {
        vthis.jcrop_api = this
      })
    },
    showCoords: function (c) {
      this.imageAxis['x'] = c.x
      this.imageAxis['y'] = c.y
      this.imageAxis['w'] = c.w
      this.imageAxis['h'] = c.h
    },

    getCordinates: function (image, selection) {
      this.imageAxis.x = selection.x1
      this.imageAxis.y = selection.y1
      this.imageAxis.w = selection.width
      this.imageAxis.h = selection.height
    },

    confirmCrop_: async function () {
      let crop = {}
      let isSelectedAreaKey = this.$store.state.isSelectedArea.value - 1
      let newcordinates = this.cordinates
      let cropImage = newcordinates.userUploadedImage[isSelectedAreaKey].value
      this.cropImageUrl = newcordinates.userUploadedImageUrl[isSelectedAreaKey].value

      let ch = new Temp()
      let productImageProps = await ch.addImageProcess(this.cropImageUrl)
      let $img = $('#cropImageUrl')
      let width = $img.width()
      let height = $img.height()

      let tempHeight = (productImageProps.height / height).toFixed(2)
      let tempWidth = (productImageProps.width / width).toFixed(2)

      this.imageAxis.x = this.imageAxis.x * tempWidth
      this.imageAxis.y = this.imageAxis.y * tempHeight
      this.imageAxis.h = this.imageAxis.h * tempHeight
      this.imageAxis.w = this.imageAxis.w * tempWidth

      crop.cropAxis = this.imageAxis
      crop.cropImage = cropImage
      // make it to aspect ratio
      // to do
      await this.$store.dispatch('cropImage', crop)
      let url
      let time = new Date().getTime()
      if (newcordinates.userUploadedImageUrl[isSelectedAreaKey].value.indexOf('?h=') !== -1) {
        url = newcordinates.userUploadedImageUrl[isSelectedAreaKey].value.replace('?', '?' + time)
      } else {
        url = newcordinates.userUploadedImageUrl[isSelectedAreaKey].value = newcordinates.userUploadedImageUrl[isSelectedAreaKey].value + '?' + time
      }
      this.cropImageUrl = url
      newcordinates.cropped = newcordinates.cropped + 1
      newcordinates.height[isSelectedAreaKey].value = this.imageAxis.h
      newcordinates.width[isSelectedAreaKey].value = this.imageAxis.w
      // this.ias.cancelSelection()
      // change imagearea ratio
      let imgProps = {
        height: this.imageAxis.h,
        width: this.imageAxis.w
      }
      console.log(imgProps)
      let imgCordinates = ch.imageCordinates(imgProps, newcordinates.artwork_width, newcordinates.artwork_height)
      let op = {
        width: imgCordinates.width,
        height: imgCordinates.height
      }
      console.log(op)
      ch.imageArea('obv-product-design-objects-image-i' + this.$store.state.isSelectedArea.value, op, true)

      this.$store.dispatch('setImageCordinates', newcordinates)
      this.$store.dispatch('generateSequence', newcordinates)
    }
  },
  watch: {
    cordinates: {
      handler: function (val, oldVal) {
      },
      deep: true
    }
  },
  computed: {
    ...mapGetters({
      cordinates: 'getImageCordinates',
      selecteArea: 'getIsSelectedArea',
      productSelectedImprint: 'getProductSelectedImprint'
    }),

    isWorkSelected: function () {
      if (this.selecteArea === null) {
        return false
      } else if (this.selecteArea.key === 'text') {
        return false
      } else {
        return true
      }
    }
  },
  mounted () {
    let vThis = this
    // this.initJcrop($('.cropImage'))
    this.ias = $('img#cropImageUrl').imgAreaSelect({
      handles: true,
      onSelectEnd: vThis.getCordinates
    })
  }
}
</script>
<style>
#obv-editor .crop-ui-col{
  /*height:225px; */
}
</style>
