<script>
  import PostCard from "./PostCard.svelte";
  import "./blog.css";
  import BackgroundColor from "../BackgroundColor.svelte";
</script>

<BackgroundColor color="var(--black-bc)" />
<main>
  <h1>Liz Blog</h1>
  <p>Hi welcome to my blog here are all of the 1 posts lmao</p>
  <PostCard
    href="robust-trust"
    title="Robust Trust"
    summary="Relying on others without being vulnerable to betrayal"
    date="2023"
  />
  <a href="/"> Back to homepage </a>
</main>
