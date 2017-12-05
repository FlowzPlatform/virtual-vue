<template>
<li class="dropdown text-propertie">
    <a href="javascript:void(0);" data-toggle="dropdown" data-hover="tooltip" data-placement="left" title="Alignment" @click="isTextOrImage">
          <i><span class="icon-Text-Properties"></span></i>
      </a>
      <div class="dropdown-menu" v-if="isWorkSelected">
          <div class="text-style-option">
              <h2>Font Style</h2>
              <a href="javascript:void(0);" data-hover="tooltip" data-placement="top" @click="setFontStyle('bold')" title="Bold"><span class="icon-Bold"></span></a>
              <a href="javascript:void(0);" data-hover="tooltip" data-placement="top" @click="setFontStyle('italic')" title="Italic"><span class="icon-Italic"></span></a>
              <a href="javascript:void(0);" data-hover="tooltip" data-placement="top" @click="setFontStyle('underline')" title="Underline"><span class="icon-Underline"></span></a>
          </div>
          <div class="text-style-option">
              <h2>Text Align</h2>
              <a href="javascript:void(0);" data-hover="tooltip" data-placement="top" @click="setTextAlign('left')" title="Left"><span class="icon-Left-text-Align"></span></a>
              <a href="javascript:void(0);" data-hover="tooltip" data-placement="top" @click="setTextAlign('center')" title="Center"><span class="icon-Center-text-Align"></span></a>
              <a href="javascript:void(0);" data-hover="tooltip" data-placement="top" @click="setTextAlign('right')" title="Right"><span class="icon-Right-text-Align"></span></a>
          </div>
          <div class="clearfix"></div>
          <div class="font-ui-section">
            <div class="font-family-col">
                  <h3>Font Family</h3>

                  <!-- <ul>
                      <li class="dropdown-submenu">
                          <a href="javascript:void(0);" data-toggle="dropdown">
                              Railway
                              <i class="caret"></i>
                          </a>
                          <ul class="dropdown-menu">
                              <li><a href="javascript:void(0);">Railway</a></li>
                          </ul>
                      </li>
                  </ul> -->

                  <select @change="setFontFamily" v-model="font_family">
                    <option disabled value="">Select</option>
                    <option v-for="font in fontFamily" :value="font.fontFile">{{font.fontDisplayName}}</option>
                  </select>
              </div>
              <div class="font-size-col">
                  <h3>Size</h3>
                  <div class="opacity-ui">
                      <form action="">
                        <input type="range" min="0" max="100" step="1" v-model="font_size" @change="setFontSize">
                        <output>{{ font_size }}</output>
                        <!-- <input type="range" min="0" max="100" step="1" v-model="font_size" data-rangeslider id="Size-slider">
                        <output id="js-output"></output> -->

                      </form>
                  </div>
              </div>
              <div class="font-curve-col">
                  <h3>Curve Font</h3>
                  <div class="opacity-ui curve-font-ui">
                      <form action="">
                        <div id="js-example-change-value">
                          <input type="range" min="0" max="360" step="1" v-model="text_curve" @change="setTextCurve">
                          <output>{{ text_curve }}</output>
                            <!-- <input type="range" min="0" max="100" value="0" data-rangeslider>
                              <i>%</i>
                              <output id="js-output"></output> -->
                          </div>
                      </form>
                  </div>
              </div>
          </div>
      </div>
  </li>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'texts',
  data () {
    return {
      open: true,
      font_size: 10,
      text_curve: 0,
      font_style: '',
      text_align: '',
      font_family: ''
    }
  },
  created() {
    this.getFontFamily()
  },
  methods: {
    isTextOrImage() {
      if(this.isWorkSelected === false){
        alert("Please select a Text")
        return false
      }
    },
    generateSequence(){
      // let newcordinates = this.cordinates
      // newcordinates.imprintColor = pms;
      // this.$store.commit('setImageCordinates', { cordinates:newcordinates } )
      // return this.$store.dispatch('generateSequence',this.cordinates)
    },
    getFontFamily(){
      return this.$store.dispatch('fetchFontFamily')
    },
    setTextAlign(align){
      this.text_align = align
    },
    setFontStyle(style){
      this.font_style = style
    },
    setFontSize(){
      let newcordinates = this.cordinates
      let selected = this.selecteArea.value
      selected = parseInt(selected)-1
      newcordinates.font_size[selected].value = this.font_size;
      this.$store.dispatch('setImageCordinates', newcordinates)

      return this.$store.dispatch('generateSequence',this.cordinates)
    },
    setTextCurve(){
      let newcordinates = this.cordinates
      let selected = this.selecteArea.value
      selected = parseInt(selected)-1
      newcordinates.text_curve[selected].value = this.text_curve;
      this.$store.dispatch('setImageCordinates', newcordinates)

      return this.$store.dispatch('generateSequence',this.cordinates)
    },
    setFontFamily(){
      if(this.font_family!=""){
        let newcordinates = this.cordinates
        let selected = this.selecteArea.value
        selected = parseInt(selected)-1
        newcordinates.font_family[selected].value = this.font_family;
        this.$store.dispatch('setImageCordinates', newcordinates)

        return this.$store.dispatch('generateSequence',this.cordinates)
      }
    }
  },
  computed: {
    ...mapGetters({
      cordinates: 'getImageCordinates',
      fontFamily: 'getFontFamily',
      selecteArea: 'getIsSelectedArea'
    }),

    isWorkSelected: function() {
      if(this.selecteArea==null) {
        return false
      } else if (this.selecteArea.key=='image') {
        return false
      } else {
        return true
      }
    }
  },
  mounted(){
    // $('#Size-slider').val(10).change();
  }
}
</script>
