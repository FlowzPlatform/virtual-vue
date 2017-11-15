<template>
<li class="dropdown">
  <a href="javascript:void(0);" data-toggle="dropdown" data-hover="tooltip" data-placement="left" title="Opacity" @click="isImageText">
        <i class="icon-Opacity"></i>
    </a>
    <div class="dropdown-menu" v-if="isWorkSelected">
      <h2>Opacity</h2>
        <div class="opacity-ui">
            <!-- <form action="">
                <input type="range" min="0" max="100" step="10" value="300" data-rangeslider id="Opacity-slider">
                <i>%</i>
                <output id="js-output"></output>
            </form> -->
            <form action="">
                <input type="range" min="0" max="100" step="10" v-model="opacity"  v-on:change="changeOpacity" value="300"  id="Opacity-slider">
                <i>{{opacity}}%</i>
                <output id="js-output"></output>
            </form>
        </div>
    </div>
</li>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'opacity',
  data () {
    return {
      open: true,
      opacity:0
    }
  },
  methods:{
    changeOpacity(){
      // alert(this.opacity)
      let newcordinates = this.cordinates
      newcordinates.opacity = this.opacity;
      this.$store.commit('setImageCordinates', { cordinates:newcordinates } )
       return this.$store.dispatch('generateSequence',this.cordinates)
    },
    isImageText() {
      if(this.isWorkSelected === false){
        alert("Please select a Image/Text")
        return false
      }
    }

  },
    watch: {
      // cordinates: function (val) {
      //   console.log("Rahul")
      //   console.log(val)
      // }
      cordinates:{
        handler: function (val, oldVal) {
      },
        deep: true
      }
   },
   computed: {
     ...mapGetters({
       cordinates: 'getImageCordinates',
       selecteArea: 'getIsSelectedArea'
     }),
     isWorkSelected: function() {
       return (this.selecteArea==null) ? false : true
     }
   }
}
</script>
