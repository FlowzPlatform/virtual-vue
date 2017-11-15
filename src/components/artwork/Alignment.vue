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
  import { mapGetters } from 'vuex'

  export default {
    name: 'alignment',
    data () {
      return {
        open: true,
        alignment: ''
      }
    },
    methods: {
      isImageText() {
        if(this.isWorkSelected === false){
          alert("Please select a Image/Text")
          return false
        }
      },
      setAlign(type){

        this.isImageText()

        this.alignment = type

        let selectedval = this.selecteArea.value
        let selectedKey = this.selecteArea.key
        let selected = parseInt(selectedval)-1

        let newcordinates = this.cordinates

        if(this.alignment == 'left'){
          $('.obv-product-design-objects-'+selectedKey+'-i'+selectedval).css('left', 0);

          if(selectedKey=='image') newcordinates.left[selected].value = 0;
          else newcordinates.text_left[selected].value = 0;
        } else if (this.alignment == 'right') {
          let ele = $('.obv-product-design-objects-'+selectedKey+'-i'+selectedval)

          $('.obv-product-design-objects-'+selectedKey+'-i'+selectedval).css('left', ele.parent().width()-ele.width());
          if(selectedKey=='image') newcordinates.left[selected].value = ele.parent().width()-ele.width();
          else newcordinates.text_left[selected].value = ele.parent().width()-ele.width();
        } else if (this.alignment == 'top') {
          $('.obv-product-design-objects-'+selectedKey+'-i'+selectedval).css('top', 0);

          if(selectedKey=='image') newcordinates.top[selected].value = 0;
          else newcordinates.text_top[selected].value = 0;
        } else if (this.alignment == 'bottom') {
          let ele = $('.obv-product-design-objects-'+selectedKey+'-i'+selectedval)

          $('.obv-product-design-objects-'+selectedKey+'-i'+selectedval).css('top', ele.parent().height()-ele.height());
          if(selectedKey=='image') newcordinates.top[selected].value = ele.parent().height()-ele.height();
          else newcordinates.text_top[selected].value = ele.parent().height()-ele.height();

        } else if (this.alignment == 'center') {
          let ele = $('.obv-product-design-objects-'+selectedKey+'-i'+selectedval)
          console.log((ele.parent().height()-ele.height())/2)
          console.log((ele.parent().width()-ele.width())/2)

          $('.obv-product-design-objects-'+selectedKey+'-i'+selectedval).css('top', (ele.parent().height()-ele.height())/2);
          if(selectedKey=='image') newcordinates.top[selected].value = (ele.parent().height()-ele.height())/2;
          else newcordinates.text_top[selected].value = (ele.parent().height()-ele.height())/2;

          $('.obv-product-design-objects-'+selectedKey+'-i'+selectedval).css('left', (ele.parent().width()-ele.width())/2);
          if(selectedKey=='image') newcordinates.left[selected].value = (ele.parent().width()-ele.width())/2;
          else newcordinates.text_left[selected].value = (ele.parent().width()-ele.width())/2;

        } else {

        }
        this.$store.commit('setImageCordinates', { cordinates:newcordinates } )
        return this.$store.dispatch('generateSequence',this.cordinates)
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
