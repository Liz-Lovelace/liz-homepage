<script>
  import BackgroundColor from "../BackgroundColor.svelte";
  import "./blog.css";

  export let wideLayout = false;
</script>

<svelte:head>
  <title>Liz Blog</title>
</svelte:head>

<BackgroundColor color="var(--black-bc)" />
<main class="blog-main" class:wide={wideLayout}>
  <slot />
  <a class="back" href="/blog/"> &lt;&lt;&lt; Back to index </a>
  <p class="license">Liz Lovelace <br /> CC0. No copyright intended.</p>
</main>

<style>
  .license {
    text-align: center;
    color: var(--grey-bc);
    padding: 0;
  }

  .back {
    text-align: center;
    display: block;
    margin: 70px 0;
  }

  .wide {
    max-width: 50em;
  }
</style>
