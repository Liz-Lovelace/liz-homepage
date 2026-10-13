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
    margin-bottom: 70px;
    height: 40px;
    align-items: flex-end;
  }

  button {
    font-family: "Kalam", sans-serif;
    background-color: #eee;
    color: #988;
    padding: 10px 22px;
    font-size: 18px;
    cursor: pointer;
    height: 50px;
    box-shadow: 0px 16px 12px -18px #611 inset;
    transition: 0.4s ease;
    border-top: none;
    border-right: 1px solid #a99;
    border-left: 1px solid #a99;
    border-bottom: 3px solid #977;
  }

  button:hover {
    color: black;
    height: 55px;
    transition: 0.3s ease;
  }

  button.selected {
    background-color: #f8f5f5;
    color: black;
    box-shadow: 0px 16px 12px -20px black inset;
    height: 70px;
    border-radius: 15px 15px 0 0;
    transition: 0.2s;
  }
</style>
