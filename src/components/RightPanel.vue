<template>
<div id="obv-right-panel" class="ui-vertical-menu">
    <decoration></decoration>
    <history></history>
    <layers></layers>
</div>
</template>

<script>
import Decoration from './Decoration.vue'
import History from './History.vue'
import Layers from './Layers.vue'

export default {
  name: 'right-panel',
  data () {
    return {
      open: true
    }
  },
  components: {
    'decoration': Decoration, 'history': History, 'layers': Layers
  }
}
</script>
