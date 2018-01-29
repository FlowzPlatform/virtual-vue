<template>
<li class="dropdown" >
    <a href="javascript:void(0);" data-toggle="dropdown" data-hover="tooltip" data-placement="left" title="Alignment" @click="isImageText">
          <i class="icon-Alignment">
              <span class="path1"></span><span class="path2"></span><span class="path3"></span>
          </i>
      </a>
      <div class="dropdown-menu" v-if="isWorkSelected">
        <h2>Alignment</h2>
          <div class="obc-text-align-btn">
    <div class="obc-add-img-align-und">
      <div class="obc-add-img-align-top" @click="setAlign('top')"></div>
      <div class="obc-add-img-align-right" @click="setAlign('right')"></div>
      <div class="obc-add-img-align-bott" @click="setAlign('bottom')"></div>
      <div class="obc-add-img-align-left" @click="setAlign('left')"></div>
      <div class="obc-add-img-align-cent" @click="setAlign('center')"></div>
    </div>
  </div>

      </div>
  </li>
</template>

  <script>
  /*eslint-disable */

  import { mapGetters } from 'vuex'

  export default {
    name: 'alignment',
    data () {
      return {
        open: true,
        alignment: ''
      }
    },
    computed: {
      ...mapGetters({
        cordinates: 'getImageCordinates',
        selecteArea: 'getIsSelectedArea',
        productSelectedImprint: 'getProductSelectedImprint'
      }),
      isWorkSelected: function () {
        return this.selecteArea
      }
    },
    methods: {
      isImageText () {
        if (this.isWorkSelected === null) {
          alert('Please select a Image/Text')
          return false
        }
      },
      setAlign (type) {
        this.isImageText()

        this.alignment = type

        let selectedval = this.selecteArea.value
        let selectedKey = this.selecteArea.key
        let selected = parseInt(selectedval) - 1
        let selectedImprint = this.productSelectedImprint
        let index = _.findIndex(this.cordinates, function (o) { return o.position === selectedImprint })
        let newcordinates = this.cordinates[index]

        let parentELement = $('.selector')

        let parentLeft = parentELement.offset().left - $('.obv-product-main-images').offset().left
        let parentTop = parentELement.offset().top - $('.obv-product-main-images').offset().top

        if (this.alignment === 'left') {
          $('.obv-product-design-objects-' + selectedKey + '-i' + selectedval).css('left', 0)

          if (selectedKey === 'image') newcordinates.left[selected].value = parentLeft
          else newcordinates.text_left[selected].value = parentLeft
        } else if (this.alignment === 'right') {
          let ele = $('.obv-product-design-objects-' + selectedKey + '-i' + selectedval)

          $('.obv-product-design-objects-' + selectedKey + '-i' + selectedval).css('left', ele.parent().width() - ele.width())
          if (selectedKey === 'image') newcordinates.left[selected].value = ele.parent().width() + parentLeft - ele.width()
          else newcordinates.text_left[selected].value = ele.parent().width() + parentLeft - ele.width()
        } else if (this.alignment === 'top') {
          $('.obv-product-design-objects-' + selectedKey + '-i' + selectedval).css('top', 0)

          if (selectedKey === 'image') newcordinates.top[selected].value = parentTop
          else newcordinates.text_top[selected].value = parentTop
        } else if (this.alignment === 'bottom') {
          let ele = $('.obv-product-design-objects-' + selectedKey + '-i' + selectedval)

          $('.obv-product-design-objects-' + selectedKey + '-i' + selectedval).css('top', ele.parent().height() - ele.height())
          if (selectedKey === 'image') newcordinates.top[selected].value = ele.parent().height() + parentTop - ele.height()
          else newcordinates.text_top[selected].value = ele.parent().height() + parentTop - ele.height()
        } else if (this.alignment === 'center') {
          let ele = $('.obv-product-design-objects-' + selectedKey + '-i' + selectedval)

          $('.obv-product-design-objects-' + selectedKey + '-i' + selectedval).css('top', (ele.parent().height() - ele.height()) / 2)
          if (selectedKey === 'image') newcordinates.top[selected].value = ((ele.parent().height() - ele.height()) / 2) + parentTop
          else newcordinates.text_top[selected].value = (ele.parent().height() + parentTop - ele.height()) / 2

          $('.obv-product-design-objects-' + selectedKey + '-i' + selectedval).css('left', (ele.parent().width() - ele.width()) / 2)
          if (selectedKey === 'image') newcordinates.left[selected].value = ((ele.parent().width() - ele.width()) / 2) + parentLeft
          else newcordinates.text_left[selected].value = (ele.parent().width() + parentLeft - ele.width()) / 2
        } else {
        }
        let setCords = this.cordinates
        setCords[index] = newcordinates
        this.$store.dispatch('setImageCordinates', setCords)
        return this.$store.dispatch('generateSequence', this.cordinates[index])
      }
    }
  }
  </script>
