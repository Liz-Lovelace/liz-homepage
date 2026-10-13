<script>
    import BlogLayout from "../BlogLayout.svelte";
</script>
  
<BlogLayout wideLayout={true}>
  <h1 class="factorio-title">FACTORIO: E/ACC UPDATE</h1>

  <p>The goal of Factorio is to escape the planet you crash-landed on by launching a rocket. But what if instead of getting into the rocket, you launch a recon satellite?</p>

  <p>
    The satellite will permanently uncover a big area on the map, letting you
    place templates without being physically present. Construction bots will
    build the physical machines.
  </p>

  <p>
    This would abstract away the individual machines, letting you design, say, an
    <span class="factorio-template">ore mining</span> template. You go to the map and put it on the nearest ore
    deposit. To transport the resources back to the base, you put down a bunch of
    <span class="factorio-template">railroad + electricity line</span> templates. Construction bots get to work, and
    pretty soon a whole ore patch is added to your base's resources.
  </p>

  <img class="factorio-img" src="/blog/factorio.jpg" alt="A view of the map in factorio with rectangles showing the modules built using templates" />

  <p>
    The large amount of resources lets you launch more recon satellites to uncover
    new areas of the map. You then combine all your templates into the <span class="factorio-template">factory</span>
    template, which will output satellites, as well as machines for new <span class="factorio-template">factory</span>
    instances.
  </p>

  <p>
    You're two layers of abstraction above your machines now. Your organic body
    is irrelevant. You have become the factory. Eventually, the planet's resources
    run out. Everything has become your synthetic flesh. You achieved the true
    ending. Or have you?
  </p>

  <div class="factorio-ending">
    <p>CTRL + A</p>
    <p>CTRL + C</p>
    <p>CTRL + V</p>
  </div>

  <img class="factorio-rocket" src="/blog/factorio-rocket.png" alt="The factorio rocket" />
</BlogLayout>

<style>
  .factorio-img {
    width: 450px;
    height: 450px;
    margin: auto;
    display: block;
  }

  .factorio-template {
    border: 1px solid #00f7ff90;
    display: inline-block;
    padding: 0 5px;
  }

  .factorio-ending {
    margin-top: 2em;
    text-align: center;
    font-weight: bold;
  }

  .factorio-rocket {
    margin: auto;
    display: block;
  }
</style>
