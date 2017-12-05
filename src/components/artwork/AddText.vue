<template>
  <!--ADD TEXT-->
  <div class="add-your-text">
      <form action="">
          <input type="text" value="" v-model="inputText" placeholder="Add your text">
          <a href="javascript:void(0);" class="js-hide-text" @click="addText"><span class="icon-Check"></span></a>
      </form>
  </div>
  <!--END ADD TEXT-->
</template>

<script>
  export default {
    name: 'add-text',
    data () {
      return {
        inputText: ''
      }
    },
    methods: {
      addText: function () {
        if(this.inputText) {
          this.$store.dispatch('setIsTextAdded',true)
          this.$store.dispatch('setText', this.inputText)
        }else{
          alert("Please add text.")
        }
      }
    }
  }
</script>
