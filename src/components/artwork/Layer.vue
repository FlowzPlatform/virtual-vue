<template>
<li class="dropdown">
  <a href="javascript:void(0);" data-toggle="dropdown" data-hover="tooltip" data-placement="left" title="Layer" @click="isImageText">
        <i class="icon-Layers"></i>
    </a>
    <div class="dropdown-menu" v-if="isWorkSelected">
      <h2>Layer Order</h2>
        <div class="layer-order">
          <ul class="layer-button">
              <li><a href="javascript:void(0);"><span class="icon-Move-up"></span></a></li>
                <li><a href="javascript:void(0);"><span class="icon-Move-Down"></span></a></li>
                <li><a href="javascript:void(0);"><span class="icon-Move-top"></span></a></li>
                <li><a href="javascript:void(0);"><span class="icon-Move-bottom"></span></a></li>
            </ul>
            <div class="layer-position">
              <ul>
                  <li></li>
                    <li></li>
                    <li class="active"></li>
                    <li></li>
                    <li></li>
                </ul>
            </div>
        </div>
    </div>
</li>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'layer',
  data () {
    return {
      open: true
    }
  },
  methods: {
    isImageText () {
      if (this.isWorkSelected === false) {
        alert('Please select a Image/Text')
        return false
      }
    }
  },
  computed: {
    isWorkSelected: function () {
      return (this.selecteArea === null) ? false : true
    },
    ...mapGetters({
      selecteArea: 'getIsSelectedArea'
    })
  }
}
</script>
