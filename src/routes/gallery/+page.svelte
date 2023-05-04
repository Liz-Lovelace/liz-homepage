<script>
  import { onMount } from "svelte";
  import { browser } from "$app/environment";
  import TagSelector from "./TagSelector.svelte";
  import Gallery from "./Gallery.svelte";

  let currentTag;

  if (browser) {
    const urlParams = new URLSearchParams(window.location.search);
    currentTag = urlParams.get("t") || "face";
  }

  function updateTag(tag) {
    currentTag = tag;
    if (browser) {
      const url = new URL(window.location);
      url.searchParams.set("t", tag);
      window.history.pushState({}, "", url);
    }
  }
</script>

<main class="striped-background">
  <a class="back" href="/"> &lt;- BACK</a>
  <h1>Pictures ^-^</h1>
  <TagSelector {currentTag} {updateTag} />
  <Gallery {currentTag} />
</main>

<style>
  :root {
    --horizontal-gap: 30px;
  }

  .striped-background {
    --backgroundA: #ff9a00;
    --backgroundB: #ef7a00;
    --backgroundSize: 30px;

    position: absolute;
    width: 100%;
    min-height: 100%;
    background: repeating-linear-gradient(
      45deg,
      var(--backgroundA),
      var(--backgroundA) var(--backgroundSize),
      var(--backgroundB) var(--backgroundSize),
      var(--backgroundB) calc(var(--backgroundSize) + var(--backgroundSize))
    );
  }

  h1 {
    font-size: 4rem;
    font-family: "Kalam", sans-serif;
    text-align: center;
    margin-bottom: 30px;
    text-shadow: 2px 4px 8px #600;
  }

  .back {
    font-family: "Kalam", sans-serif;
    font-size: 2em;
    text-decoration: none;
    margin-left: 90px;
    margin-top: 50px;
    display: inline-block;
    color: black;
    background-color: #fff8f8;
    color: #211;
    box-shadow: 3px 3px 8px 2px #500a, 0px 0px 8px 2px #5002 inset;
    transform: rotate(-5deg);
    color: #211;
    padding: 10px 40px 0 30px;
    border-bottom: 3px solid #dcc;
    border-top: 2px solid #fff;
    border-left: 1px solid #fff;
  }
</style>
