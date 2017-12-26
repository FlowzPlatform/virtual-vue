<template>
<li class="dropdown">
  <a href="javascript:void(0);" data-hover="tooltip" data-placement="left" title="Delete" v-model="removeElement" @click="removeElement">
        <i class="icon-Trash"></i>
    </a>
</li>
</template>
<script>
/*eslint-disable */
import { mapGetters } from 'vuex'
import Temp from '../../classes/Temp'
import {imageProcessingUrl} from '../../constants'

export default {
  name: 'delete',
  data () {
    return {
      open: true
    }
  },
  methods: {
    removeElement: function () {
      let isSelectedAreaKey = (this.$store.state.isSelectedArea !== null) ? this.$store.state.isSelectedArea.key : ''
      if (isSelectedAreaKey === 'image') {
        this.removeImage()
      } else if (isSelectedAreaKey === 'text') {
        this.removeText()
      } else {
        alert('Select image or text to remove.')
      }
    },
    removeImage: function () {
      let selectedImprint = this.productSelectedImprint
      let index = _.findIndex(this.cordinates, function (o) { return o.position === selectedImprint })
      let newcordinates = this.cordinates[index]

      // let newcordinates = this.$store.state.imageCordinates
      // console.log(isSelectedAreaValue)
      // console.log(newcordinates.layers)

      let data = this.removeLayers('image', this.selectedArea.value, newcordinates)
      // console.log(data)

      newcordinates = data.newcordinates
      let deleteIndex = data.deleteIndex

      newcordinates.height.splice(newcordinates.height.indexOf(newcordinates.height[deleteIndex]), 1)
      newcordinates.width.splice(newcordinates.width.indexOf(newcordinates.width[deleteIndex]), 1)
      newcordinates.left.splice(newcordinates.left.indexOf(newcordinates.left[deleteIndex]), 1)
      newcordinates.top.splice(newcordinates.top.indexOf(newcordinates.top[deleteIndex]), 1)
      newcordinates.leftN.splice(newcordinates.leftN.indexOf(newcordinates.leftN[deleteIndex]), 1)
      newcordinates.topE.splice(newcordinates.topE.indexOf(newcordinates.topE[deleteIndex]), 1)
      newcordinates.leftS.splice(newcordinates.leftS.indexOf(newcordinates.leftS[deleteIndex]), 1)
      newcordinates.topW.splice(newcordinates.topW.indexOf(newcordinates.topW[deleteIndex]), 1)
      newcordinates.flip.splice(newcordinates.flip.indexOf(newcordinates.flip[deleteIndex]), 1)
      newcordinates.flop.splice(newcordinates.flop.indexOf(newcordinates.flop[deleteIndex]), 1)
      newcordinates.rotate.splice(newcordinates.rotate.indexOf(newcordinates.rotate[deleteIndex]), 1)
      newcordinates.userUploadedImageUrl.splice(newcordinates.userUploadedImageUrl.indexOf(newcordinates.userUploadedImageUrl[deleteIndex]), 1)
      newcordinates.userUploadedImage.splice(newcordinates.userUploadedImage.indexOf(newcordinates.userUploadedImage[deleteIndex]), 1)

      newcordinates.image_area_work = newcordinates.image_area_work - 1

      $('.obv-product-design-objects-image-i' + this.$store.state.isSelectedArea.value).remove()

      if (newcordinates.layers.length === 0) {
        this.$store.dispatch('setIsSelectedArea', null)
        this.$store.dispatch('setImageUrl', imageProcessingUrl + 'products/' + this.productImage)
      } else {
        let setCords = this.cordinates
        setCords[index] = newcordinates
        this.$store.dispatch('setImageCordinates', setCords)
        return this.$store.dispatch('generateSequence', newcordinates[index])
      }
    },
    removeText: function () {
      let selectedImprint = this.productSelectedImprint
      let index = _.findIndex(this.cordinates, function (o) { return o.position === selectedImprint })
      let newcordinates = this.cordinates[index]

      let data = this.removeLayers('text', this.selectedArea.value, newcordinates)

      newcordinates = data.newcordinates
      let deleteIndex = data.deleteIndex

      newcordinates.texts.splice(newcordinates.texts.indexOf(newcordinates.texts[deleteIndex]), 1)
      newcordinates.text_height.splice(newcordinates.text_height.indexOf(newcordinates.text_height[deleteIndex]), 1)
      newcordinates.text_width.splice(newcordinates.text_width.indexOf(newcordinates.text_width[deleteIndex]), 1)
      newcordinates.text_left.splice(newcordinates.text_left.indexOf(newcordinates.text_left[deleteIndex]), 1)
      newcordinates.text_top.splice(newcordinates.text_top.indexOf(newcordinates.text_top[deleteIndex]), 1)
      newcordinates.text_leftN.splice(newcordinates.text_leftN.indexOf(newcordinates.text_leftN[deleteIndex]), 1)
      newcordinates.text_topE.splice(newcordinates.text_topE.indexOf(newcordinates.text_topE[deleteIndex]), 1)
      newcordinates.text_leftS.splice(newcordinates.text_leftS.indexOf(newcordinates.text_leftS[deleteIndex]), 1)
      newcordinates.text_topW.splice(newcordinates.text_topW.indexOf(newcordinates.text_topW[deleteIndex]), 1)
      newcordinates.text_color.splice(newcordinates.text_color.indexOf(newcordinates.text_color[deleteIndex]), 1)
      newcordinates.font_size.splice(newcordinates.font_size.indexOf(newcordinates.font_size[deleteIndex]), 1)
      newcordinates.text_flip.splice(newcordinates.text_flip.indexOf(newcordinates.text_flip[deleteIndex]), 1)
      newcordinates.text_flop.splice(newcordinates.text_flop.indexOf(newcordinates.text_flop[deleteIndex]), 1)
      newcordinates.text_rotate.splice(newcordinates.text_rotate.indexOf(newcordinates.text_rotate[deleteIndex]), 1)
      newcordinates.text_area_work = newcordinates.text_area_work - 1

      $('.obv-product-design-objects-text-i' + this.$store.state.isSelectedArea.value).remove()

      let setCords = this.cordinates
      setCords[index] = newcordinates
      this.$store.dispatch('setImageCordinates', setCords)
      return this.$store.dispatch('generateSequence', newcordinates[index])
    },
    removeLayers: function (type, isSelectedAreaValue, newcordinates) {
      let ch = new Temp()
      let deleteIndex = null

      for (let i = 0; i < newcordinates.layers.length; i++) {
        if ((newcordinates.layers[i].hId === isSelectedAreaValue) && (newcordinates.layers[i].type === type)) {
          deleteIndex = i
        }
      }

      let iKey = newcordinates.layers[deleteIndex].key
      newcordinates.layers.splice(newcordinates.layers.indexOf(newcordinates.layers[deleteIndex]), 1)

      // modify id of imageArea
      let currentKey = isSelectedAreaValue + 1
      if (type === 'image') {
        let op = {id: deleteIndex + 1}
        ch.imageArea('obv-product-design-objects-image-i' + currentKey, op)
      } else {
        let op = {id: deleteIndex + 1}
        ch.imageArea('obv-product-design-objects-text-i' + currentKey, op)
      }

      for (let i = 0; i < newcordinates.layers.length; i++) {
        if (newcordinates.layers[i].key > iKey) {
          newcordinates.layers[i].key--
        }
      }

      return {newcordinates, deleteIndex}
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
      selectedArea: 'getIsSelectedArea',
      productImage: 'getProductImage',
      productSelectedImprint: 'getProductSelectedImprint'
    })
  }
}
</script>
