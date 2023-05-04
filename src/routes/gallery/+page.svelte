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
  <a href="/"> -- back</a>
  <h1>Pictures :)</h1>
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
    font-size: 3rem;
    font-family: "moderndos", sans-serif;
    text-align: center;
  }
</style>
