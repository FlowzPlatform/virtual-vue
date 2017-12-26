<template>
<li class="dropdown">
  <a href="javascript:void(0);" data-toggle="dropdown" data-hover="tooltip" data-placement="left" title="Rotate"  @click="isImageText">
        <i class="icon-Opacity"></i>
    </a>
    <div class="dropdown-menu" v-if="isWorkSelected">
      <h2>Rotate</h2>
        <div class="opacity-ui">
            <!-- <form action="">
                <input type="range" min="0" max="360" step="10" value="0" data-rangeslider v-on:change="changeRotate" id="Rotate-slider">
                <i>%</i>
                <output id="js-output"></output>
            </form> -->
            <form action="">
                <input type="range" min="0" max="360" v-model="rotate" step="10" value="10"  v-on:change="changeRotate" id="Rotate-slider">
                <i>{{rotate}}%</i>
                <output id="js-output"></output>
            </form>
        </div>
    </div>
</li>
</template>
<script>
/*eslint-disable */
import { mapGetters } from 'vuex'

export default {
  name: 'rotate',
  data () {
    return {
      open: true,
      rotate: 0
    }
  },
  methods: {
    changeRotate () {
      let selectedImprint = this.productSelectedImprint
      let index = _.findIndex(this.cordinates, function (o) { return o.position === selectedImprint })
      let newcordinates = this.cordinates[index]

      let selected = this.selecteArea.value
      let selectedKey = this.selecteArea.key
      selected = parseInt(selected) - 1

      if (selectedKey === 'image') newcordinates.rotate[selected].value = this.rotate
      else newcordinates.text_rotate[selected].value = this.rotate
      // newcordinates.rotate = this.rotate;
      let setCords = this.cordinates
      setCords[index] = newcordinates
      this.$store.dispatch('setImageCordinates', setCords)
      return this.$store.dispatch('generateSequence', this.cordinates[index])
    },
    isImageText () {
      if (this.isWorkSelected === false) {
        alert('Please select a Image/Text')
        return false
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
    ...mapGetters({
      cordinates: 'getImageCordinates',
      selecteArea: 'getIsSelectedArea',
      productSelectedImprint: 'getProductSelectedImprint'
    }),
    isWorkSelected: function () {
      return (this.selecteArea === null) ? false : true
    }
  }
}
</script>
