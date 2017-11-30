<template>
<div class="image-gallery">
    <section>
        <div class="parent">
        <div class="image-display">
            <div class="panzoom">
              <div class="owl-carousels" id="image-gallerys">
                <!-- {{zoomMsg}} -->
                  <div class="item">
                    <i class="fa fa-angle-left fa-5 fl" aria-hidden="true"></i>
                    <div class="obv-product-main-images">
                      <img  ref="image" :src="url" alt="" height="500"  @load="start" id="image"  >
                      <image-select></image-select>
                    </div>
                    <i class="fa fa-angle-right fa-5 fr" aria-hidden="true"></i>
                  </div>

              </div>

            </div>
        </div>

        </div>
        <div class="zoom-btn">
            <button class="zoom-in" @click="zoomIn"><i class="icon-Plus"> </i> </button>
            <button class="zoom-out" @click="zoomOut"> <i class="icon-Minus"> </i></button>
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
</style>
<script>
import { mapGetters } from 'vuex'
import ImageSelect from '../image-select/ImageSelect.vue'
import { imageProcessingUrl } from '../../constants'
import Cropper from 'cropperjs';

export default {
  name: 'product-gallery',
  data () {
    return {
      open: true,
      imageProcessingUrl: imageProcessingUrl,
      cropper: null,
      canvasData: null,
      cropBoxData: null,
      data: null,
      zoomMsg:''
    }
  },
  components : {'image-select':ImageSelect},

  computed: {
    ...mapGetters({
      url: 'getImageUrl'
    }),

    editor() {
      return this.$store.state.editor;
    },

    url() {
      $('.cropper-canvas img').attr('src',this.$store.state.imageUrl)
      return this.$store.state.imageUrl;
    }
  },
    mounted() {
      window.addEventListener('keydown', (this.onKeydown = this.keydown.bind(this)));
    },

    beforeDestroy() {
      window.removeEventListener('keydown', this.onKeydown);
      this.stop();
    },

  methods: {
    zoomIn(e){
      const cropper = this.cropper;
      console.log(cropper)
      var imageData = cropper.getImageData();
      var zoomLevel = imageData.width / imageData.naturalWidth;
      console.log(imageData)
      if(zoomLevel <= 0.5){
        cropper.zoom(0.1);
        this.zoomMsg = ''
      } else {
        this.zoomMsg = 'Zoom limit over'
        // console.log('Zoom limit over')
      }
    },
    zoomOut(e){
      const cropper = this.cropper;
      var imageData = cropper.getImageData();
      var zoomLevel = imageData.width / imageData.naturalWidth;
      if(zoomLevel >= 0.25) {
        this.zoomMsg = ''
        cropper.zoom(-0.1);
      } else {
        this.zoomMsg = 'Zoom limit over'
        // console.log('Zoom limit over')
      }
    },
    keydown(e) {

    },

    start() {
      const editor = this.editor;
      if (editor.cropped) {
        return;
      }
      this.cropper = new Cropper(this.$refs.image, {
        autoCrop: false,
        dragMode: 'move',
        background: false,
        rotatable:true,
        scalable: true,
        checkCrossOrigin: false,
        zoomOnWheel:false,
        ready: () => {
          if (this.data) {
            this.cropper
            .setData(this.data)
            .setCanvasData(this.canvasData)
            .setCropBoxData(this.cropBoxData);
            this.data = null;
            this.canvasData = null;
            this.cropBoxData = null;
          }
        },
      });
    },
    stop() {
      if (this.cropper) {
        this.cropper.destroy();
        this.cropper = null;
        this.$store.dispatch('editor/update', {
          cropping: false,
        });
      }
    },
  },
  watch: {
    url: function(val) {
      // alert(val)
    }
  }
}
</script>
