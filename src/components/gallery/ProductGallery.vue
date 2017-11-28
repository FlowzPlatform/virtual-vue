<template>
<div class="image-gallery">
    <section>  
        <div class="parent">
        <div class="image-display">
            <div class="panzoom">
              <div class="owl-carousel" id="image-gallery">

                    <div class="item"><div class="obv-product-main-images">
                    <!-- <img   ref="image"   src="http://localhost:8082/static/images/back-view-white.png" alt="" height="500"   @load="start" > -->
                    <img  ref="image" :src="url" alt="" height="500"  @load="start"   >
                    <image-select></image-select>
                    
                    </div>
                    </div>
                    
                    <!-- <div class="item"><div class="obv-product-main-images"><img :src="imageProcessingUrl + '/products/54607c1317207c5f03d63af1/12323rdfcabc234/main/product-img.png'" alt=""></div>
                    </div>
                    <div class="item"><div class="obv-product-main-images"><img :src="imageProcessingUrl + '/products/54607c1317207c5f03d63af1/12323rdfcabc234/main/product-img.png'" alt="" ></div></div>
                    <div class="item"><div class="obv-product-main-images"><img :src="imageProcessingUrl + '/products/54607c1317207c5f03d63af1/12323rdfcabc234/main/product-img.png'" alt="" ></div></div> -->
                </div>
            </div>
        </div>
        </div>
        <div class="zoom-btn"  >
            <button class="zoom-in" @click="zoomIn"><i class="icon-Plus"> </i> </button>
            <button class="zoom-out"  @click="zoomOut"> <i class="icon-Minus"> </i></button>
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
    }
  },
  components : {'image-select':ImageSelect},

  computed: {
    ...mapGetters({
      url: 'getImageUrl'
    }),editor() {
        return this.$store.state.editor;
      },url() {
          
         console.log('value **'  )
         console.log(this.$store.state.imageUrl)
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
       zoomIn(){
         const cropper = this.cropper;
         cropper.zoom(0.1);
       },
        zoomOut(){
           const cropper = this.cropper;
            cropper.zoom(-0.1);
       },
      click({ target }) {
        const cropper = this.cropper;
        // const action = target.dataset.action || target.parentNode.dataset.action;
        const action = 'zoom-in';
         switch (action) {
          case 'move':
          case 'crop':
            cropper.setDragMode(action);
            break;

          case 'zoom-in':
            cropper.zoom(0.1);
            break;

          case 'zoom-out':
            cropper.zoom(-0.1);
            break;

          case 'rotate-left':
            cropper.rotate(-90);
            break;

          case 'rotate-right':
            cropper.rotate(90);
            break;

          case 'flip-horizontal':
            cropper.scaleX(-cropper.getData().scaleX || -1);
            break;

          case 'flip-vertical':
            cropper.scaleY(-cropper.getData().scaleY || -1);
            break;

          default:
        }
      },

      keydown(e) {
        switch (e.key) {
          // Undo crop
          case 'z':
            if (e.ctrlKey) {
              e.preventDefault();
              this.restore();
            }

            break;

          // Delete the image
          case 'Delete':
            this.reset();
            break;

          default:
        }

        const cropper = this.cropper;

        if (!cropper) {
          return;
        }

        switch (e.key) {
          // Crop the image
          case 'Enter':
            this.crop();
            break;

          // Clear crop area
          case 'Escape':
            this.clear();
            break;

          // Move to the left
          case 'ArrowLeft':
            e.preventDefault();
            cropper.move(-1, 0);
            break;

          // Move to the top
          case 'ArrowUp':
            e.preventDefault();
            cropper.move(0, -1);
            break;

          // Move to the right
          case 'ArrowRight':
            e.preventDefault();
            cropper.move(1, 0);
            break;

          // Move to the bottom
          case 'ArrowDown':
            e.preventDefault();
            cropper.move(0, 1);
            break;

          // Enter crop mode
          case 'c':
            cropper.setDragMode('crop');
            break;

          // Enter move mode
          case 'm':
            cropper.setDragMode('move');
            break;

          // Zoom in
          case 'i':
         console.log('zoom')
            cropper.zoom(0.1);
            break;

          // Zoom out
          case 'o':
            cropper.zoom(-0.1);
            break;

          // Rotate left
          case 'l':
            cropper.rotate(-90);
            break;

          // Rotate right
          case 'r':
            cropper.rotate(90);
            break;

          // Flip horizontal
          case 'h':
            cropper.scaleX(-cropper.getData().scaleX || -1);
            break;

          // Flip vertical
          case 'v':
            cropper.scaleY(-cropper.getData().scaleY || -1);
            break;

          default:
        }
      },

      start() {
        const editor = this.editor;
        console.log('start')
         if (editor.cropped) {
          return;
        }

        this.cropper = new Cropper(this.$refs.image, {
          autoCrop: false,
          dragMode: 'move',
          background: false,
          rotatable:true,
          scalable: true,
          checkCrossOrigin:false,
          ready: () => {
            if (this.data) {
              this.cropper
                .crop()
                .setData(this.data)
                .setCanvasData(this.canvasData)
                .setCropBoxData(this.cropBoxData);

              this.data = null;
              this.canvasData = null;
              this.cropBoxData = null;
            }
          },
          /* crop: ({ detail }) => {
            if (detail.width > 0 && detail.height > 0 && !editor.cropping) {
              this.$store.dispatch('editor/update', {
                cropping: true,
              });
            }
          }, */
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

      crop() {
        const cropper = this.cropper;
        const { type, url } = this.loader;

        if (this.editor.cropping) {
          this.data = cropper.getData();
          this.canvasData = cropper.getCanvasData();
          this.cropBoxData = cropper.getCropBoxData();
          this.data = cropper.getData();
          this.$store.dispatch('editor/update', {
            cropped: true,
            cropping: false,
          });
          this.$store.dispatch('loader/update', {
            previousUrl: url,
            url: cropper.getCroppedCanvas(type === 'image/png' ? null : {
              fillColor: '#fff',
            }).toDataURL(type),
          });
          this.stop();
        }
      },

      clear() {
        if (this.editor.cropping) {
          this.cropper.clear();
          this.$store.dispatch('editor/update', {
            cropping: false,
          });
        }
      },

      restore() {
        if (this.editor.cropped) {
          this.$store.dispatch('editor/update', {
            cropped: false,
          });
          this.$store.dispatch('loader/update', {
            previousUrl: '',
            url: this.loader.previousUrl,
          });
        }
      },

      reset() {
        this.stop();
        this.$store.dispatch('editor/remove');
        this.$store.dispatch('loader/remove');
      },
    }
}
</script>
