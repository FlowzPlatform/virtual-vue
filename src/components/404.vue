<template>
  <div id="fof">
    <div class="hgroup">
      <h1>Something Just Went Wrong !</h1>
      <h2>404 Error</h2>
  </div>
  </div>
</template>

<script>
export default {
  name: 'notFound',
  data () {
    return {
    }
  }
}
</script>
<style>
#fof {
    display: block;
    width: 100%;
    padding: 150px 0;
    line-height: 1.6em;
    text-align: center;
}

#fof .hgroup h2 {
    display: inline-block;
    padding: 0 0 15px 0;
    font-size: 80px;
    border: solid #CCCCCC;
    border-width: 1px 0;
    text-transform: lowercase;
}
#fof .hgroup h1, #fof .hgroup h2 {
    margin: 0;
    padding: 0;
    text-transform: uppercase;
}
#fof .hgroup h1 {
    margin-bottom: 15px;
    font-size: 40px;
}
</style>
