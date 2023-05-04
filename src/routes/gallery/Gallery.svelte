<script>
  import GalleryImage from "./GalleryImage.svelte";

  export let currentTag;

  const images = [
    {
      src: "bedroom-ropes-butt.png",
      alt: "what a cute butt!",
      tags: ["porn"],
    },
    {
      src: "pasties.jpg",
      alt: "pasties are cool",
      tags: ["porn"],
    },
    {
      src: "hearts-and-belly.jpg",
      alt: "first time I really noticed breast growth",
      tags: ["porn"],
    },
    {
      src: "radioactive.png",
      alt: "radioactive girl",
      tags: ["porn"],
    },
    {
      src: "sophia-peacefullness.jpg",
      alt: "tied and grounded",
      tags: ["porn"],
    },
    {
      src: "wax-sophia-closeup.jpg",
      alt: "wax play!",
      tags: ["porn"],
    },
    {
      src: "calculator.jpg",
      alt: "pre-hrt nipples :D",
      tags: ["porn"],
    },
    {
      src: "bedroom-ropes-rotissary.png",
      alt: "roast me over a bonfire :3",
      tags: ["porn"],
    },
    {
      src: "frog.jpg",
      alt: "pepis >///<",
      tags: ["porn"],
    },
    /*{ src: "sophia-princess.jpg", alt: "So owned", tags: ['porn'] },*/
    /*{ src: "wax-sophia-wide.jpg", alt: "", tags: ['porn'] },*/
    /*{ src: "bedroom-ballet.png", alt: "", tags: ['porn'] },*/

    {
      src: "dementia.jpg",
      alt: "a random grandpa outside took this pic???",
      tags: ["face"],
    },
    {
      src: "spiky-choker.jpg",
      alt: "I really go outside like this ",
      tags: ["face"],
    },
    {
      src: "naked-pink-hair.jpg",
      alt: "Yes I'm naked in this pic. Yes I used it as my pfp for slack",
      tags: ["face"],
    },
    {
      src: "point-up.jpg",
      alt: "OLD pic, I'm like 16 here",
      tags: ["face"],
    },
    {
      src: "femme-look.jpg",
      alt: "I could collapse civilizations with that jawline ",
      tags: ["face"],
    },
    {
      src: "butch-liz.jpg",
      alt: "butch Liz v0.1",
      tags: ["face"],
    },

    {
      src: "picrew-bag.png",
      alt: "grocery shopper Liz :3",
      tags: ["avatar"],
    },
    {
      src: "picrew-fist.png",
      alt: "used this picrew everywhere to match my gf",
      tags: ["avatar"],
    },

    {
      src: "star-scar.jpg",
      alt: "I looove this scar! My first dom had me carve it into my hand ^_^",
      tags: ["other"],
    },
  ];

  function divideIntoColumns(images, numColumns) {
    const columns = Array.from({ length: numColumns }, () => []);
    images.forEach((image, index) => {
      columns[index % numColumns].push(image);
    });
    return columns;
  }
</script>

<div class="gallery">
  {#each divideIntoColumns(images, 3) as column, columnIndex}
    <div class="gallery-column desktop">
      {#each column as image}
        {#if image.tags.includes(currentTag)}
          <GalleryImage src={image.src} alt={image.alt} />
        {/if}
      {/each}
    </div>
  {/each}
  {#each divideIntoColumns(images, 2) as column, columnIndex}
    <div class="gallery-column mobile">
      {#each column as image}
        {#if image.tags.includes(currentTag)}
          <GalleryImage src={image.src} alt={image.alt} />
        {/if}
      {/each}
    </div>
  {/each}
</div>

<style>
  :root {
    --horizontal-gap: 30px;
  }

  .gallery {
    display: flex;
    justify-content: center;
    max-width: 768px;
    margin: auto;
    gap: var(--horizontal-gap);
  }

  .gallery-column {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 30px;
    margin-bottom: 60px;
  }

  @media (max-width: 768px) {
    .gallery-column {
      flex-basis: calc(50% - var(--horizontal-gap) * 2);
    }
  }

  .desktop {
    display: none;
  }

  @media (min-width: 769px) {
    .desktop {
      display: flex;
    }

    .mobile {
      display: none;
    }
  }
</style>
