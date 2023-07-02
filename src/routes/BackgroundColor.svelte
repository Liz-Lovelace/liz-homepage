<script>
  export let color = "black";
</script>

<div class="color-background" style="background-color: {color};" />

<style>
  .color-background {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: -3;
  }
</style>
