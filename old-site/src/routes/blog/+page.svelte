<script>
  import PostCard from "./PostCard.svelte";
  import "./blog.css";
  import BackgroundColor from "../BackgroundColor.svelte";
</script>

<BackgroundColor color="var(--black-bc)" />
<main class="blog-main">
  <h1>Liz Blog</h1>
  <PostCard
    href="factorio"
    title="FACTORIO: E/ACC UPDATE"
    summary="What if you don't get into the rocket?"
    date="2024"
  />
  <PostCard
    href="robust-trust"
    title="Robust Trust"
    summary="Relying on others without being vulnerable to betrayal"
    date="2023"
  />
  <a href="/"> Back to homepage </a>
</main>
