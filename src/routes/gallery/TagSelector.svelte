<script>
  export let currentTag;
  export let updateTag;

  let tagList = [
    ["Liz irl", "face"],
    ["Avatars", "avatar"],
    ["Erotica", "porn"],
    ["Other", "other"],
  ];
</script>

<div class="container">
  {#each tagList as [title, tag]}
    <button
      class={tag === currentTag ? "selected" : ""}
      on:click={() => updateTag(tag)}
    >
      {title}
    </button>
  {/each}
</div>

<style>
  .container {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-bottom: 20px;
  }

  button {
    background-color: #ef7a00;
    border: none;
    color: white;
    padding: 8px 16px;
    text-align: center;
    text-decoration: none;
    font-size: 16px;
    cursor: pointer;
    border-radius: 4px;
    transition: background-color 0.3s;
    font-family: "moderndos", sans-serif;
    border: 2px solid white;
  }

  button:hover {
    background-color: #ff9a00;
  }

  button.selected {
    background-color: #c55f00;
    text-decoration: underline;
  }
</style>
