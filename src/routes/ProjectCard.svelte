<script>
  export let title;
  export let description;
  export let link;
</script>

<div class="project-card">
  <div class="corner-deco top-left" />
  <div class="corner-deco bottom-right" />
  <h3>{title}</h3>
  <p>{description}</p>
  <a href={link} target="_blank"
    >{link.replace(new RegExp("https?://"), ">>> ")}</a
  >
</div>

<style>
  .project-card {
    position: relative;
    padding: 40px 15px;
    margin-bottom: 15px;
    --s: 30px;
    clip-path: polygon(
      -100px -100px,
      calc(100% - var(--s)) 0,
      100% var(--s),
      150% 150%,
      var(--s) 100%,
      0 calc(100% - var(--s))
    );
    --hexagons: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='49' viewBox='0 0 28 49'%3E%3Cg fill-rule='evenodd'%3E%3Cg id='hexagons' fill='%2300ffff' fill-opacity='0.25' fill-rule='nonzero'%3E%3Cpath d='M13.99 9.25l13 7.5v15l-13 7.5L1 31.75v-15l12.99-7.5zM3 17.9v12.7l10.99 6.34 11-6.35V17.9l-11-6.34L3 17.9zM0 15l12.98-7.5V0h-2v6.35L0 12.69v2.3zm0 18.5L12.98 41v8h-2v-6.85L0 35.81v-2.3zM15 0v7.5L27.99 15H28v-2.31h-.01L17 6.35V0h-2zm0 49v-8l12.99-7.5H28v2.31h-.01L17 42.15V49h-2z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    background-image: var(--hexagons),
      linear-gradient(to bottom, #0aa, #000, #000, #000, #000, #0aa);
  }
  .project-card:hover {
    background-image: var(--hexagons),
      linear-gradient(to bottom, #0ff, #000, #000, #000, #000, #0ff);
  }

  .corner-deco {
    position: absolute;
    width: 20px;
    height: 70px;
    border: 7px double #00ffff;
    --distance: -15px;
  }
  .top-left {
    top: var(--distance);
    left: var(--distance);
    border-bottom: none;
    border-right: none;
  }
  .bottom-right {
    bottom: var(--distance);
    right: var(--distance);
    border-top: none;
    border-left: none;
  }

  .project-card h3 {
    font-family: "moderndos", sans-serif;
    text-align: center;
    margin: 0;
    font-size: 1.5rem;
    color: #ffffff;
    text-shadow: #000 0 0px 4px, #000 0 3px 4px, #7ff 0 1px 7px, #0ff 0 1px 13px,
      #0ff 0 1px 15px, #0ff 0 1px 35px;
  }

  .project-card a {
    color: #00ffff;
    font-weight: bold;
    text-decoration: none;
    background-color: rgba(0, 0, 0, 0.7);
    padding: 6px 16px;
  }
</style>
