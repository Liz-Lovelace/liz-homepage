<script>
  import { randomFromHash } from "./randomNumberGenerator.js";

  export let src;
  export let alt;

  let srcPath =
    "/optimized-gallery/" + src.substring(0, src.lastIndexOf(".")) + ".webp";

  let rotationAmount = 6;
  let rotation =
    randomFromHash(src + alt) * rotationAmount * 2 - rotationAmount;
  if (rotation < 0.1 && rotation > -0.1) {
    rotation *= 3;
  }
</script>

<div class="frame" style="transform: rotate({rotation}deg);">
  <img class="image" src={srcPath} {alt} />
  <div class="textbox">
    <p>{alt}</p>
  </div>
</div>

<style>
  .frame {
    background-color: #fee;
    box-sizing: border-box;
    flex-direction: column;
    text-align: center;
    padding: 10px;
    padding-top: 14px;
    padding-bottom: 0;
    box-shadow: 3px 3px 8px 2px #0008;
  }

  img {
    width: 100%;
    object-fit: cover;
  }

  .textbox {
    min-height: 3em;
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 5px 0;
  }

  p {
    font-family: "Kalam", sans-serif;
    line-height: 1;
    color: #211;
    margin: 0;
  }
</style>
