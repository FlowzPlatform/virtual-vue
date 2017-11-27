<template>
  <div id="app">
      <ul v-sortable="{onEnd: reorder}">
        <li v-for="i in itemss" :key="i.id" >{{ i.id }}</li>
      </ul>
      {{ JSON.stringify(itemss) }}
    </div>
</template>

<script>
export default {
  name: 'Test',
  data () {
    	return {
      	items: [{id: 1},{id: 2},{id: 3},{id: 4},{id: 5}]
      }
  },
  methods: {
  	reorder ({oldIndex, newIndex}) {
    	const movedItem = this.itemss.splice(oldIndex, 1)[0]
        this.itemss.splice(newIndex, 0, movedItem)
    }
  },
  computed: {
    itemss: function() {
        return this.items
    }
  }
}
</script>

<style>
li{
  padding: 10px;
  margin: 10px;
  cursor: pointer;
}
</style>
