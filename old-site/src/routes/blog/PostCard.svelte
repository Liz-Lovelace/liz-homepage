<script>
  export let href = "";
  export let title = "";
  export let summary = "";
  export let date = "";
</script>

<div class="post">
  <a class="post-link" href="/blog/{href}"> {title} </a>
  <span class="date"> {date} </span>
  <p>{summary}</p>
</div>

<style>
  .post {
    border: 2px solid var(--grey-bc);
    margin-bottom: 10px;
    padding: 10px 15px;
  }

  .date {
    color: #444;
  }

  .post-link {
    font-size: 1.2em;
  }
</style>
