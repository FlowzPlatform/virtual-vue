<template>
<div id="history" class="ui-right-panel">
    <div class="ui-button"><a href="javascript:void(0);"> <span> History </span> </a></div>
    <div class="history-content">
       <div class="right-panel-heading">
          <h1><i class="icon-history"></i> History </h1>
       </div>
       <ul class="history-list">
           <li class="radio">
                <input type="radio" name="Version">
                <label >
                  <span><i class="icon-Version"></i> Version 001</span>
                </label>
           </li>
           <li class="radio">
                <input type="radio" name="Version">
                <label >
                  <span><i class="icon-Version"></i> Version 002</span>
                </label>
           </li>
           <li class="radio">
                <input type="radio" name="Version">
                <label >
                  <span><i class="icon-Version"></i> Version 003</span>
                </label>
           </li>
           <li class="radio">
                <input type="radio" name="Version">
                <label >
                  <span><i class="icon-Version"></i> Version 004</span>
                </label>
           </li>
           <li class="radio">
                <input type="radio" name="Version">
                <label >
                  <span><i class="icon-Version"></i> Version 005</span>
                </label>
           </li>

       </ul>
    </div>
</div>
</template>

<script>
export default {
  name: 'history',
  data () {
    return {
      open: true
    }
  }
}
</script>
