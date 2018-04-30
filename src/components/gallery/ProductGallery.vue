<template>
<div class="image-gallery">
    <section>
        <div class="parent">
          <div class="image-display" @click="removeSelected">
              <div class="panzoom">
                <div class="owl-carousels" id="image-gallerys">
                    <div class="item">
                      <i class="fa fa-angle-left fa-5 fl" aria-hidden="true" @click="changeSide('left')"></i>
                      <div class="obv-product-main-images">
                        <img ref="image" :src="url" alt="" height="500" id="image">
                        <image-select></image-select>
                      </div>
                      <i class="fa fa-angle-right fa-5 fr" aria-hidden="true" @click="changeSide('right')"></i>
                    </div>
                </div>
              </div>
          </div>
        </div>
        <div class="zoom-btn">
            <button class="zoom-in"><i class="icon-Plus"> </i> </button>
            <button class="zoom-out"> <i class="icon-Minus"> </i></button>
            <button class="reset"> <i class="fa fa-repeat" aria-hidden="true"></i></button>

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
.fa-5 {
  font-size: 5em !important;
  cursor: pointer;
}
.fl {
  float: left;
  width: 10%;
}
.fr {
  float: right;
  width: 10%;
}
.parent .cropper-wrap-box {
  overflow: inherit;
}

.parent .owl-carousel .owl-stage-outer {
  overflow: inherit;
}
.hide {
  display: none;
}
.show {
  display: block;
}
</style>
<script>
/*eslint-disable */
import { mapGetters } from 'vuex'
import ImageSelect from '../image-select/ImageSelect.vue'
import { imageProcessingUrl } from '../../constants'

export default {
  name: 'product-gallery',
  data () {
    return {
      side: 0,
      imageProcessingUrl: imageProcessingUrl,
      data: null
    }
  },
  components: {'image-select': ImageSelect},

  mounted() {
    let imprint = this.productImprintDetails
    console.log("imprint", imprint)
    this.side =  _.findIndex(imprint, function(o) { return o.order == 1; });
  },
  computed: {
    ...mapGetters({
      url: 'getImageUrl',
      cordinates: 'getImageCordinates',
      productImprintDetails: 'getProductImprintDetails',
      selectedThumbImage: 'getSelectedThumbImage'
    })
  },
  methods: {
    removeSelected: function () {
      let target = $(event.target)
      if (!target.is('.vj-hotspot-selected')) {
        $('.vj-hotspot-selected').removeClass('vj-hotspot-selected')
        this.$store.dispatch('setIsSelectedArea', null)
      }
    },

    changeSide: function (side) {      

      if (side === 'left') {
        if (this.side > 0) {
          this.side--
          let imprintArea = this.side+1
          $('.imprint-area').hide();
          $('.object-'+imprintArea).show()
          let cordinates = this.cordinates
          // let cords = _.nth(cordinates, this.side)
          let getSide = this.side
          let cords = _.find(cordinates, function(o) { return o.imprintAreaIndex === getSide })
          this.$store.dispatch('setProductVariationImages', this.productImprintDetails[this.side].images)
          this.$store.dispatch('setProductSelectedImprint', this.productImprintDetails[this.side].locationKey)

          if(cords === undefined) {
            // selectedThumbImage
            let colorId = this.selectedThumbImage.colorId
            let index = _.findIndex(this.productImprintDetails[this.side].images, function(o) { return o.colorId == colorId })
            let imageUrl = this.productImprintDetails[this.side].images[index].image
            this.$store.dispatch('setImageUrl', imageProcessingUrl + 'products/' + imageUrl)
            this.$store.dispatch('setProductImage', imageUrl)
            
          } else {
            // cachedImages
            let colorId = this.selectedThumbImage.colorId
            let index = _.findIndex(this.productImprintDetails[this.side].images, function(o) { return o.colorId == colorId })
            let imageUrl = this.productImprintDetails[this.side].images[index].image
            this.$store.dispatch('setImageUrl', imageProcessingUrl + 'products/' + imageUrl)
            this.$store.dispatch('setProductImage', imageUrl)

            let key = cords.cachedImages[0].type
            let isSelected = {
              key: key,
              value: 1
            }
            this.$store.dispatch('setIsSelectedArea', isSelected)
            this.$store.dispatch('generateSequence', cords)
          }
        }
      } else {
        if (this.side < this.$store.state.productImprint.length) {
          this.side++
          let imprintArea = this.side+1
          $('.imprint-area').hide()
          $('.object-'+imprintArea).show()
          let cordinates = this.cordinates
          let getSide = this.side
          let cords = _.find(cordinates, function(o) { return o.imprintAreaIndex === getSide })
          let indexcords = _.findIndex(this.cordinates, function (o) { return o.imprintAreaIndex === getSide })
    
          this.$store.dispatch('setProductVariationImages', this.productImprintDetails[this.side].images)
          this.$store.dispatch('setProductSelectedImprint', this.productImprintDetails[this.side].locationKey)
          if(cords === undefined) {

            // selectedThumbImage
            let colorId = this.selectedThumbImage.colorId
            let index = _.findIndex(this.productImprintDetails[this.side].images, function(o) { return o.colorId == colorId })
            let imageUrl = this.productImprintDetails[this.side].images[index].image
            this.$store.dispatch('setImageUrl', imageProcessingUrl + 'products/' + imageUrl)
            this.$store.dispatch('setProductImage', imageUrl)
          } else {

            // cachedImages
            let colorId = this.selectedThumbImage.colorId
            let index = _.findIndex(this.productImprintDetails[this.side].images, function(o) { return o.colorId == colorId })
            let imageUrl = this.productImprintDetails[this.side].images[index].image

            this.$store.dispatch('setImageUrl', imageProcessingUrl + 'products/' + imageUrl)
            this.$store.dispatch('setProductImage', imageUrl)

            let key = cords.cachedImages[0].type
            let isSelected = {
              key: key,
              value: 1
            }
            this.$store.dispatch('setIsSelectedArea', isSelected)
            this.$store.dispatch('generateSequence', cords)
          }
        }
      }
    }
  },
  watch: {
    url: function (val) {      
    },
    productImprintDetails: function (val) {
      this.side =  _.findIndex(val, function(o) { return o.order == 1; });
    }
  }
}
</script>
