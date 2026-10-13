<div class="spacebg1" />
<div class="spacebg2" />

<style>
  .spacebg1,
  .spacebg2 {
    width: 100%;
    height: 100%;
    background-repeat: repeat;
    position: fixed;
    top: 0px;
    left: 0px;
    transform: translateZ(0);
  }

  .spacebg1 {
    animation: backgroundScroll1 30s linear infinite;
    background-image: url("/space_bg1.gif");
    z-index: -1;
  }

  .spacebg2 {
    animation: backgroundScroll2 55s linear infinite;
    background-image: url("/space_bg2.gif");
    z-index: -2;
  }

  @keyframes backgroundScroll1 {
    0% {
      background-position: 0px 0px;
      filter: opacity(100%);
    }
    50% {
      background-position: 0px -234px;
      filter: opacity(50%);
    }
    100% {
      background-position: 0px -468px;
      filter: opacity(100%);
    }
  }

  @keyframes backgroundScroll2 {
    0% {
      background-position: 0px 0px;
      filter: opacity(50%);
    }
    50% {
      background-position: 0px -234px;
      filter: opacity(100%);
    }
    100% {
      background-position: 0px -468px;
      filter: opacity(50%);
    }
  }
</style>
