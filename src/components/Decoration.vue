<template>
<div id="decoration" class="ui-right-panel">
    <div class="ui-button"><a href="javascript:void(0);"><span> Decoration </span> </a></div>
    <div class="decoration-content">

        <div class="right-panel-heading">
          <h1><i class="icon-Decoration"></i> Decoration </h1>
        </div>

        <div class="right-imprint-panel">
            <p>Imprint Methods</p>
            <a href="javascript:void(0);" class="colorbox-open"><img :src="imprintMethodImage" /></a>
        </div>

        <div class="multicolor-listbox">
            <a href="javascript:void(0);" class="close-multicolorbox"><img src="static/images/close-icon.png" ></a>
            <ul class="textcolor-list">
                <li class="radio">
                         <input type="radio" name="imprint_method" value="multi_color" id="multi_color" v-model="defaultImprintMethod" v-on:change="onChange" :disabled="isTextorImage">
                         <label >
                           <img src="static/images/multi_color.png" />
                         </label>
                 </li>
                 <li class="radio">
                         <input type="radio" name="imprint_method" value="embroidery" v-model="defaultImprintMethod" v-on:change="onChange" :disabled="isTextorImage">
                         <label  >
                           <img src="static/images/embroidery.png" />
                         </label>
                 </li>
                 <li class="radio">
                         <input type="radio" name="imprint_method" value="emboss" v-model="defaultImprintMethod" v-on:change="onChange" :disabled="isTextorImage">
                         <label  >
                           <img src="static/images/emboss.png" />
                         </label>
                 </li>
                 <li class="radio">
                         <input type="radio" name="imprint_method" value="single_color"  v-model="defaultImprintMethod" v-on:change="onChange" :disabled="isTextorImage">
                         <label >
                           <img src="static/images/single_color.png" />
                         </label>
                 </li>
                 <li class="radio">
                         <input type="radio" name="imprint_method" value="fabric" v-model="defaultImprintMethod" v-on:change="onChange" :disabled="isTextorImage">
                         <label style="color:black">
                           Fabric
                         </label>
                 </li>
                 <li class="radio">
                         <input type="radio" name="imprint_method" value="firebranded" v-model="defaultImprintMethod" v-on:change="onChange" :disabled="isTextorImage">
                         <label style="color:black">
                           <img src="static/images/firebranded.png" />
                         </label>
                 </li>
                 <li class="radio">
                         <input type="radio" name="imprint_method" value="wooden" v-model="defaultImprintMethod" v-on:change="onChange" :disabled="isTextorImage">
                         <label style="color:black">
                           <img src="static/images/wooden.png" />
                         </label>
                 </li>
                 <li class="radio">
                         <input type="radio" name="imprint_method" value="leather_engrave" v-model="defaultImprintMethod" v-on:change="onChange" :disabled="isTextorImage">
                         <label style="color:black">
                           <img src="static/images/leather_engrave.png" />
                         </label>
                 </li>
                 <li class="radio">
                         <input type="radio" name="imprint_method" value="foil" v-model="defaultImprintMethod" v-on:change="onChange" :disabled="isTextorImage">
                         <label style="color:black">
                           <img src="static/images/foil.png" />
                         </label>
                 </li>
                 <li class="radio">
                         <input type="radio" name="imprint_method" value="hot_stamp" v-model="defaultImprintMethod" v-on:change="onChange" :disabled="isTextorImage">
                         <label style="color:black">
                           <img src="static/images/hot_stamp.png" />
                         </label>
                 </li>
                 <li class="radio">
                         <input type="radio" name="imprint_method" value="gel_dom" v-model="defaultImprintMethod" v-on:change="onChange" :disabled="isTextorImage">
                         <label style="color:black">
                           <img src="static/images/gel_dom.png" />
                         </label>
                 </li>

                 <li class="radio">
                         <input type="radio" name="imprint_method" value="laser" v-model="defaultImprintMethod" v-on:change="onChange" :disabled="isTextorImage">
                         <label style="color:black">
                           <img src="static/images/laser.png" />
                         </label>
                 </li>

                 <li class="radio">
                         <input type="radio" name="imprint_method" value="glass" v-model="defaultImprintMethod" v-on:change="onChange" :disabled="isTextorImage">
                         <label style="color:black">
                           Glass
                         </label>
                 </li>

                 <li class="radio">
                         <input type="radio" name="imprint_method" value="tone_on_tone" v-model="defaultImprintMethod" v-on:change="onChange" :disabled="isTextorImage">
                         <label style="color:black">
                           <img src="static/images/tone_on_tone.png" />
                         </label>
                 </li>

                 <li class="radio">
                         <input type="radio" name="imprint_method" value="four_color" v-model="defaultImprintMethod" v-on:change="onChange" :disabled="isTextorImage">
                         <label style="color:black">
                           <img src="static/images/four_color.png" />
                         </label>
                 </li>
                  <li class="radio">
                         <input type="radio" name="imprint_method" value="four_colour_dome" v-model="defaultImprintMethod" v-on:change="onChange" :disabled="isTextorImage">
                         <label style="color:black">
                           <img src="static/images/four_colour_dome.png" />
                         </label>
                 </li>
                  <li class="radio">
                         <input type="radio" name="imprint_method" value="one_color" v-model="defaultImprintMethod" v-on:change="onChange" :disabled="isTextorImage">
                         <label style="color:black">
                           <img src="static/images/one_color.png" />
                         </label>
                 </li>
             </ul>
        </div>

        <div class="right-colors-panel">

            <div class="colors" v-if="isColor">
              <p class="pdB0" >Colors</p>
              <div class="search-box">
                <p>Find a Color</p>
                <div class="form-group">
                  <!-- <form onsubmit="event.preventDefault();"> -->
                    <input type="text" class="form-control swatch-box-open customSeachSwatch" :disabled="isTextorImage" v-model="imprint_color_name" @keyup="searchPmsColor('')"  placeholder="Enter color name" >
                    <span class="icon-Search customSeachSwatch" @click="searchPmsColor(1)" ></span>
                  <!-- </form> -->
                </div>
            </div>

              <ul class="colorbox-panel clearfix swatch-box-open">
                <li class="check-arrow-black"> <input  type="radio"  v-model="imprint_color" value="FFFFFF" id="#FFFFFF" v-on:change="onColorChange" :disabled="isTextorImage"><label > <img src="static/images/swatche.png" /> </label></li>
                <li> <input  type="radio" v-model="imprint_color" value="000000" id="000000" v-on:change="onColorChange" :disabled="isTextorImage" ><label > <img src="static/images/swatches1.png" /> </label></li>
                <li> <input  type="radio" v-model="imprint_color" value="D7D2C3" id="D7D2C3" v-on:change="onColorChange" :disabled="isTextorImage" ><label > <img src="static/images/swatches2.png" /> </label></li>
                <li> <input  type="radio" v-model="imprint_color" value="63666B" id="63666B" v-on:change="onColorChange" :disabled="isTextorImage" ><label > <img src="static/images/swatches3.png" /> </label></li>
                <li> <input  type="radio" v-model="imprint_color" value="FFC500" id="FFC500" v-on:change="onColorChange" :disabled="isTextorImage" ><label > <img src="static/images/swatches4.png" /> </label></li>
                <li> <input  type="radio" v-model="imprint_color" value="F64300" id="F64300" v-on:change="onColorChange" :disabled="isTextorImage" ><label > <img src="static/images/swatches5.png" /> </label></li>
                <li> <input  type="radio" v-model="imprint_color" value="E40021" id="E40021" v-on:change="onColorChange" :disabled="isTextorImage" ><label > <img src="static/images/swatches7.png" /> </label></li>
                <li> <input  type="radio" v-model="imprint_color" value="921930" id="921930" v-on:change="onColorChange" :disabled="isTextorImage" ><label > <img src="static/images/swatches8.png" /> </label></li>
                <li> <input  type="radio" v-model="imprint_color" value="C8102E" id="C8102E" v-on:change="onColorChange" :disabled="isTextorImage" ><label > <img src="static/images/swatches6.png" /> </label></li>
                <li> <input  type="radio" v-model="imprint_color" value="77137B" id="77137B" v-on:change="onColorChange" :disabled="isTextorImage" ><label > <img src="static/images/swatches9.png" /> </label></li>
                <li> <input  type="radio" v-model="imprint_color" value="0031A7" id="0031A7" v-on:change="onColorChange" :disabled="isTextorImage" ><label > <img src="static/images/swatches10.png" /> </label></li>
                <li> <input  type="radio" v-model="imprint_color" value="032343" id="032343" v-on:change="onColorChange" :disabled="isTextorImage" ><label > <img src="static/images/swatches11.png" /> </label></li>
                <li> <input  type="radio" v-model="imprint_color" value="006CAB" id="006CAB" v-on:change="onColorChange" :disabled="isTextorImage" ><label > <img src="static/images/swatches12.png" /> </label></li>
                <li> <input  type="radio" v-model="imprint_color" value="00593C" id="00593C" v-on:change="onColorChange" :disabled="isTextorImage" ><label > <img src="static/images/swatches13.png" /> </label></li>
                <li> <input  type="radio" v-model="imprint_color" value="008733" id="008733" v-on:change="onColorChange" :disabled="isTextorImage" ><label > <img src="static/images/swatches14.png" /> </label></li>
                <li> <input  type="radio" v-model="imprint_color" value="009E74" id="009E74" v-on:change="onColorChange" :disabled="isTextorImage" ><label > <img src="static/images/swatches15.png" /> </label></li>
                <li> <input  type="radio" v-model="imprint_color" value="523526" id="523526" v-on:change="onColorChange" :disabled="isTextorImage" ><label > <img src="static/images/swatches16.png" /> </label></li>
                <li> <input  type="radio" v-model="imprint_color" value="897148" id="897148" v-on:change="onColorChange" :disabled="isTextorImage" ><label > <img src="static/images/swatches17.png" /> </label></li>
                <li> <input  type="radio" v-model="imprint_color" value="8A8E90" id="8A8E90" v-on:change="onColorChange" :disabled="isTextorImage" ><label > <img src="static/images/swatches18.png" /> </label></li>
                <li> <input  type="radio" v-model="imprint_color" value="FF9EBD" id="FF9EBD" v-on:change="onColorChange" :disabled="isTextorImage" ><label > <img src="static/images/swatches19.png" /> </label></li>
                <li> <input  type="radio" v-model="imprint_color" value="FF3EB5" id="FF3EB5" v-on:change="onColorChange" :disabled="isTextorImage" ><label > <img src="static/images/swatches20.png" /> </label></li>
            </ul>

              <div class="color-swatches-box">
                 <a href="javascript:void(0);" class="close-swatchesbox"><img src="static/images/close-icon.png"></a>
                <ul class="colorbox-panel clearfix swatch-box-open swatches-list ">
                    <li v-for="swatch in swatches">
                      <input  type="radio" v-model="imprint_pms" :value="swatch" :id="swatch" v-on:change="onPmsChange">
                      <span :style="{ 'background-color': '#'+swatch }"  ></span>
                    </li>
                </ul>
            </div>
            </div>

           <div class="theme-color-box">
               <p>Remove Background</p>
               <div class="row">
                   <div class="col-lg-6 col-xs-6">
                     <div class="checkbox">
                        <input type="checkbox" v-model="background" value="white" @change="changeBackground" :disabled="isTextorImage">
                        <label class="white-bg"> White</label>
                       </div>
                   </div>
                  <div class="col-lg-6 col-xs-6">
                     <div class="checkbox">
                        <input type="checkbox" v-model="background" value="black" @change="changeBackground" :disabled="isTextorImage">
                        <label> Black</label>
                       </div>
                   </div>
              </div>
           </div>

        </div>
    </div>
</div>
</template>
<script>
import { mapGetters } from 'vuex'
// import defaultImprintMethod from '../store/actions'

export default {
  name: 'decoration',
  data () {
    return {
      open: 'fabric',
      imprint_color: '000000',
      imprint_pms: '63666A',
      imprint_color_name: 'white',
      imprint_swatch: '000000',
      isSwatches: false,
      swatches: [],
      background: []
    }
  },
  methods: {
    getImageData () {
    },
    onChange () {
      let newcordinates = this.cordinates
      if (newcordinates.text_color.length > 0) {
        for (let i = 0; i < newcordinates.text_color.length; i++) {
          newcordinates.text_color[i].value = this.imprint_color
        }
      }
      newcordinates.imprintColor = this.imprint_color
      this.$store.dispatch('setImageCordinates', newcordinates)
      return this.$store.dispatch('generateSequence', this.cordinates)
    },
    onColorChange () {
      let newcordinates = this.cordinates
      this.swatches = []
      newcordinates.imprintColor = this.imprint_color
      if (newcordinates.text_color.length > 0) {
        for (let i = 0; i < newcordinates.text_color.length; i++) {
          newcordinates.text_color[i].value = this.imprint_color
        }
      }
      this.getPmsColor(this.imprint_color)
      this.$store.dispatch('setImageCordinates', newcordinates)
      return this.$store.dispatch('generateSequence', this.cordinates)
    },
    onPmsChange () {
      let newcordinates = this.cordinates
      newcordinates.imprintColor = this.imprint_pms
      if (newcordinates.text_color.length > 0) {
        for (let i = 0; i < newcordinates.text_color.length; i++) {
          newcordinates.text_color[i].value = this.imprint_pms
        }
      }
      this.$store.dispatch('setImageCordinates', newcordinates)
      return this.$store.dispatch('generateSequence', this.cordinates)
    },
    changeBackground () {
      let newcordinates = this.cordinates
      let selected = this.selecteArea.value
      selected = parseInt(selected) - 1
      console.log(selected)
      newcordinates.background[selected].value = this.background.join('-')
      this.$store.dispatch('setImageCordinates', newcordinates)
      return this.$store.dispatch('generateSequence', this.cordinates)
    },
    getPmsColor (imprintColor) {
      let selectedColor = imprintColor
      let bpl = 8
      let distance = 32
      let a = []
      let aDis = []
      let i = this.$store.state.aRGB.indexOf(selectedColor)
      let m = ''
      if (i >= 0) {
        m = this.$store.state.aPMS[i]
      }
      if (m !== '') { a[0] = m }
      let r = parseInt(selectedColor.substr(0, 2), 16)
      let g = parseInt(selectedColor.substr(2, 2), 16)
      let b = parseInt(selectedColor.substr(4, 2), 16)

      for (let i = 0; i < this.$store.state.aRGB.length; i++) {
        let rgb1 = this.$store.state.aRGB[i]
        let r1 = parseInt(rgb1.substr(0, 2), 16)
        let g1 = parseInt(rgb1.substr(2, 2), 16)
        let b1 = parseInt(rgb1.substr(4, 2), 16)
        aDis[i] = Math.sqrt(Math.pow((r - r1), 2) + Math.pow((g - g1), 2) + Math.pow((b - b1), 2))
      }
      for (let i = 0; i < aDis.length; i++) {
        if (aDis[i] <= distance) {
          if (a.indexOf(this.$store.state.aPMS[i]) === -1) {
            a.push(this.$store.state.aPMS[i])
          }
        }
      }
      this.createpmspalette(a, bpl, selectedColor)
    },
    createpmspalette (m, bpl, selectcolor) {
      // let m2 = ''
      if ((m.length) > 0) {
        // m2 = '<span class="obv-pms-color-shades-label">Shades</span><ul class="colorbox-panel clearfix swatch-box-open">'
        let ipms = 0
        let mtr = Math.ceil(m.length / bpl)
        for (let i = 0; i < mtr; i++) {
          for (let j = 0; j < bpl; j++) {
            if (ipms < m.length) {
              let rgbcode = this.PMS2RGB(m[ipms])
              this.$set(this.swatches, j, rgbcode)
              ipms = ipms + 1
            }
          }
        }
        // m2 = m2 + '</ul>'
      } else {
        // m2 = '<ul>'
        if (selectcolor !== '') {
          // m2 = m2 + '<li><a href="javascript:void(0);" role="menuitem" title=' + selectcolor + '><span style="background-color:#' + selectcolor + '"></span></a></li>'
        } else {
          // m2 = m2 + '<li><i>Not Found</i></li>'
        }
        // m2 = m2 + '</ul>'
      }
      // console.log(m2)
    },
    PMS2RGB (pms) {
      let i = this.$store.state.aPMS.indexOf(pms)
      if (i >= 0) {
        return this.$store.state.aRGB[i]
      } else {
        return ''
      }
    },
    searchPmsColor (e) {
      if (event.keyCode === 13 || e === 1) {
        let pmscolor = this.imprint_color_name.trim()
        let m = []
        let j = 0
        this.swatches = []
        for (let i = 0; i < this.$store.state.aPMS.length; i++) {
          if (this.$store.state.aPMS[i].toLowerCase().indexOf(pmscolor.toLowerCase()) !== -1) {
            m[j] = this.$store.state.aPMS[i]
            j++
          }
          this.createpmspalette(m, 8, '')
        }
      }
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
    defaultImprintMethod: {
      get: function () {
        return this.$store.state.defaultImprintMethod
      },
      set: function (value) {
        this.$store.dispatch('setDefaultImprintMethod', value)
        this.$store.dispatch('setImprintMethodImage', 'static/images/' + value + '.png')
      }
    },
    ...mapGetters({
      cordinates: 'getImageCordinates',
      selecteArea: 'getIsSelectedArea'
    }),
    isTextorImage: function () {
      if (Object.keys(this.cordinates).length === 0 && this.cordinates.constructor === Object) {
        return true
      } else {
        return false
      }
    },
    imprintMethodImage: function () {
      return this.$store.state.imprintMethodImage
    },

    isColor: () => {
      return true
    }
  },
  mounted: function () {
  }
}
</script>
<style>
.swatches{
  width: 30px;height: 30px;display: inline-block;border: 1px solid #4c4c4c
}
.color-swatches-box li input[type=radio] {
  height: 48px !important;
  width: 100% !important;
  left: 14px;
}
.multicolor-listbox ul {
  overflow-y: scroll;
  height: 100%;
}

</style>
