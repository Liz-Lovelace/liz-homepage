<script>
  let images = [
    [
      "CC_Public_Domain.png",
      "https://creativecommons.org/publicdomain/zero/1.0/",
    ],
    ["emmalink.gif", "https://heckscaper.com/main.html"],
    ["trans_your_gender.gif"],
    ["paws.png"],
    ["linux.gif"],
  ];
</script>

<div class="image-container">
  {#each images as [filename, url]}
    <a href={url}>
      <img alt={filename.slice(0, -4)} src="buttons/{filename}" />
    </a>
  {/each}
</div>

<style>
  .image-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: nowrap;
    margin-top: 100px;
    margin-bottom: 30px;
  }

  .image-container img {
    margin: 0 4px;
  }

  .image-container a {
    padding: 0;
  }
</style>
