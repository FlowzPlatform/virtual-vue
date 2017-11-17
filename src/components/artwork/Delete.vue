<template>
<li class="dropdown">
  <a href="javascript:void(0);" data-hover="tooltip" data-placement="left" title="Delete" v-model="removeElement" @click="removeElement">
        <i class="icon-Trash"></i>
    </a>
</li>
</template>
<script>
import { mapGetters } from 'vuex'
import Temp from '../../classes/Temp'

export default {
  name: 'delete',
  data () {
    return {
      open: true
    }
  },
  methods:{
    removeElement: function(){
      let isSelectedAreaKey = this.$store.state.isSelectedArea.key
      if(isSelectedAreaKey == 'image'){
        this.removeImage()
      }
      else if (isSelectedAreaKey == 'text') {
        this.removeText()
      }
      else{
        console.log('unable to remove element')
      }
    },
    removeImage: function(){
      let newcordinates = this.cordinates
      let isSelectedAreaValue = this.$store.state.isSelectedArea.value - 1
        this.removeLayers("image")
      newcordinates.height.splice(newcordinates.height.indexOf(newcordinates.height[isSelectedAreaValue]),1);
      newcordinates.width.splice(newcordinates.width.indexOf(newcordinates.width[isSelectedAreaValue]),1);
      newcordinates.left.splice(newcordinates.left.indexOf(newcordinates.left[isSelectedAreaValue]),1);
      newcordinates.top.splice(newcordinates.top.indexOf(newcordinates.top[isSelectedAreaValue]),1);
      newcordinates.leftN.splice(newcordinates.leftN.indexOf(newcordinates.leftN[isSelectedAreaValue]),1);
      newcordinates.topE.splice(newcordinates.topE.indexOf(newcordinates.topE[isSelectedAreaValue]),1);
      newcordinates.leftS.splice(newcordinates.leftS.indexOf(newcordinates.leftS[isSelectedAreaValue]),1);
      newcordinates.topW.splice(newcordinates.topW.indexOf(newcordinates.topW[isSelectedAreaValue]),1);
      newcordinates.flip.splice(newcordinates.flip.indexOf(newcordinates.flip[isSelectedAreaValue]),1);
      newcordinates.flop.splice(newcordinates.flop.indexOf(newcordinates.flop[isSelectedAreaValue]),1);
      newcordinates.rotate.splice(newcordinates.rotate.indexOf(newcordinates.rotate[isSelectedAreaValue]),1);
      newcordinates.userUploadedImageUrl.splice(newcordinates.userUploadedImageUrl.indexOf(newcordinates.userUploadedImageUrl[isSelectedAreaValue]),1);
      newcordinates.userUploadedImage.splice(newcordinates.userUploadedImage.indexOf(newcordinates.userUploadedImage[isSelectedAreaValue]),1);
      newcordinates.image_area_work = newcordinates.image_area_work -1;

     $('.obv-product-design-objects-image-i'+this.$store.state.isSelectedArea.value).remove();
       if((newcordinates.height[0]  != null)||(newcordinates.height[0]  != undefined)) {
        this.$store.state.isSelectedArea.value =newcordinates.height[0].key + 1
        this.$store.state.isSelectedArea.key =newcordinates.height[0].type
        $('.obv-product-design-objects-image-i'+this.$store.state.isSelectedArea.value).addClass('vj-hotspot-selected');
      }else{
        this.$store.state.isSelectedArea = null
        if((newcordinates.text_height[0]  == null)||(newcordinates.text_height[0]  == undefined)) {
        }
      }

      let ch = new Temp()
      let op = {id:2}
      ch.imageArea('obv-product-design-objects-image-i2',op);

      this.$store.commit('setImageCordinates', { cordinates:newcordinates } )
      return this.$store.dispatch('generateSequence',newcordinates)
    },
    removeText: function(){
      let newcordinates = this.cordinates
      let isSelectedAreaValue = this.$store.state.isSelectedArea.value - 1
      newcordinates.texts.splice(newcordinates.texts.indexOf(newcordinates.texts[isSelectedAreaValue]),1);
      newcordinates.text_height.splice(newcordinates.text_height.indexOf(newcordinates.text_height[isSelectedAreaValue]),1);
      newcordinates.text_width.splice(newcordinates.text_width.indexOf(newcordinates.text_width[isSelectedAreaValue]),1);
      newcordinates.text_left.splice(newcordinates.text_left.indexOf(newcordinates.text_left[isSelectedAreaValue]),1);
      newcordinates.text_top.splice(newcordinates.text_top.indexOf(newcordinates.text_top[isSelectedAreaValue]),1);
      newcordinates.text_leftN.splice(newcordinates.text_leftN.indexOf(newcordinates.text_leftN[isSelectedAreaValue]),1);
      newcordinates.text_topE.splice(newcordinates.text_topE.indexOf(newcordinates.text_topE[isSelectedAreaValue]),1);
      newcordinates.text_leftS.splice(newcordinates.text_leftS.indexOf(newcordinates.text_leftS[isSelectedAreaValue]),1);
      newcordinates.text_topW.splice(newcordinates.text_topW.indexOf(newcordinates.text_topW[isSelectedAreaValue]),1);
      newcordinates.text_color.splice(newcordinates.text_color.indexOf(newcordinates.text_color[isSelectedAreaValue]),1);
      newcordinates.font_size.splice(newcordinates.font_size.indexOf(newcordinates.font_size[isSelectedAreaValue]),1);
      newcordinates.text_flip.splice(newcordinates.text_flip.indexOf(newcordinates.text_flip[isSelectedAreaValue]),1);
      newcordinates.text_flop.splice(newcordinates.text_flop.indexOf(newcordinates.text_flop[isSelectedAreaValue]),1);
      newcordinates.text_rotate.splice(newcordinates.text_rotate.indexOf(newcordinates.text_rotate[isSelectedAreaValue]),1);
      newcordinates.text_area_work = newcordinates.text_area_work -1;
      this.removeLayers("text")
      $('.obv-product-design-objects-text-i'+this.$store.state.isSelectedArea.value).remove();
      if((newcordinates.text_height[0]  != null)||(newcordinates.text_height[0]  != undefined)) {
        this.$store.state.isSelectedArea.value =newcordinates.text_height[0].key + 1
        this.$store.state.isSelectedArea.key =newcordinates.text_height[0].type
       $('.obv-product-design-objects-text-i'+this.$store.state.isSelectedArea.value).addClass('vj-hotspot-selected');
     }else{
       this.$store.state.isSelectedArea = null
     }
         this.$store.commit('setImageCordinates', { cordinates:newcordinates } )
        return this.$store.dispatch('generateSequence',newcordinates)
    },
    removeLayers: function(type){
      let isSelectedAreaValue = this.$store.state.isSelectedArea.value - 1
      let newcordinates = this.cordinates
      // let length =newcordinates.layers.length
      let deletedKey = null
      for (let i=0; i< newcordinates.layers.length; i++){
          if((newcordinates.layers[i].key==isSelectedAreaValue)&&(newcordinates.layers[i].type==type)){
             deletedKey = isSelectedAreaValue
              newcordinates.layers.splice(newcordinates.layers.indexOf(newcordinates.layers[i]),1);
           }
            if((newcordinates.layers[i] != undefined)&&(newcordinates.layers[i].key > deletedKey)){
            alert(newcordinates.layers[i].key)
             newcordinates.layers[i].key = newcordinates.layers[i].key - 1
            }
      }

      this.$store.commit('setImageCordinates', { cordinates:newcordinates } )
      return this.$store.dispatch('generateSequence',newcordinates)

     },
  },
  watch: {
    cordinates:{
      handler: function (val, oldVal) {
        //console.log(val)
      },
      deep: true
    }
  },
  computed: {
     ...mapGetters({
      cordinates: 'getImageCordinates'
    })
  },
}
</script>
