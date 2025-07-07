<script>
  let images = [
    [
      "CC_Public_Domain.png",
      "https://creativecommons.org/publicdomain/zero/1.0/",
    ],
    ["tim.png", "https://tim.izhanov.ru/"],
    ["emmalink.gif", "https://heckscaper.com/main.html"],
    ["trans_your_gender.gif", "https://turnmeintoagirl.com/"],
    ["paws.png"],
    ["linux.gif"],
    ["hacker.png", "http://www.catb.org/~esr/faqs/hacker-howto.html"],
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
