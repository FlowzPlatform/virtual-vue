<template>
<div>
  <div class="logo">
      <i></i>
      <span>Powered by: Office Brain</span>
  </div>
  <header id="obv-header">
      <ul class="ui-action-button">
          <li>
              <a href="javascript:void();" class="">
                  <i class="icon-Download">
                      <span class="path1"></span><span class="path2"></span>
                  </i>
              </a>
          </li>
          <li>
              <a href="javascript:void();" class="">
                  <i class="icon-Share">
                      <span class="path1"></span><span class="path2"></span>
                  </i>
              </a>
          </li>
          <li>
              <a href="javascript:void();" class="">
                  <i class="icon-Logofy">
                      <span class="path1"></span><span class="path2"></span>
                  </i>
              </a>
          </li>
          <li>
              <a href="http://demo.officebrain.com/html/virtual-desktop/product_detail.php" target="_blank" class="close-icon">
                  <i class="icon-Close-main">
                      <span class="path1"></span><span class="path2"></span>
                  </i>
              </a>
          </li>
      </ul>
  </header>
</div>
</template>

<script>
export default {
  name: 'header',
  data () {
    return {
      open: true
    }
  }
}
</script>
