<script>
  import SocialButton from "./SocialButton.svelte";
  import ProjectCard from "./ProjectCard.svelte";
  import Buttons from "./Buttons.svelte";
  import SpaceBackground from "./SpaceBackground.svelte";
</script>

<SpaceBackground />
<main>
  <h1>Liz Lovelace</h1>

  <h2>About me</h2>
  <p>
    My two main interests are Programming and Sex. All of my other interests
    derive from a combination of those two :D
  </p>
  <p>
    In sex/relationships I'm a: transgender (mtf) polyamorous pansexual kinkster
  </p>
  <p>I like code that is: pragmatic, elegant, declarative and useful</p>

  <a class="gallery-link" href="/gallery">
    Check out the <span>Gallery</span> >>>
  </a>

  <h2>My social media</h2>
  <SocialButton
    website="Twitter"
    link="https://twitter.com/liz_love_lace"
    handle="@liz_love_lace"
    icon="twitter-icon.svg"
    description="Where I post bangers"
  />
  <SocialButton
    website="Matrix"
    link="https://matrix.to/#/@lizlovelace:matrix.org"
    handle="@lizlovelace:matrix.org"
    icon="matrix-icon.png"
    description="Private Preferred Chat"
  />
  <SocialButton
    website="Discord"
    link="https://discordapp.com/users/967498063121903686"
    handle="LizLovelace#2420"
    icon="discord-icon.svg"
    description="DMs open!"
  />
  <!--
  <SocialButton
    website="Telegram"
    link="https://t.me/liz_lovelace"
    handle="@Liz_Lovelace"
    icon="telegram-icon.svg"
    description="Other chat app"
  />
  -->
  <SocialButton
    website="GitHub"
    link="https://github.com/Liz-Lovelace"
    handle="Liz-Lovelace"
    icon="github-icon.svg"
    description="Source code for projects"
  />
  <!--
    <SocialButton
      website="MyAnimeList"
      link="https://myanimelist.net/animelist/Liz-Lovelace"
      handle="Liz-Lovelace"
      icon="myanimelist-icon.png"
      description="Anime I've seen"
    />
  -->

  <h2>My projects</h2>
  <ProjectCard
    title="Liz Lovelace homepage"
    description="A cool website all about me and my projects!"
    link="https://liz.sex"
  />
  <ProjectCard
    title="Novelty filesharing website"
    description="Single file download website. Lets me publically share a file from my server with a cute frontend"
    link="https://here-is-your.download/?liz.zip"
  />
  <ProjectCard
    title="Ely Timer"
    description="Shouts at you to get back to work every 25 minutes"
    link="https://ely.liz.sex"
  />
  <Buttons />
</main>

<style>
  main {
    max-width: 40rem;
    margin: auto;
    padding: 0 1.5em;
  }

  h1 {
    font-size: 4rem;
    font-family: "alagard", sans-serif;
    text-align: center;
  }

  h2 {
    margin-top: 50px;
    text-align: center;
    font-family: "moderndos", sans-serif;
  }
  h2:before {
    content: "// ";
    color: #888;
  }

  .gallery-link {
    color: #0ff;
    font-size: 1.5em;
    text-decoration: none;
    margin-left: auto;
    display: block;
    text-align: right;
    transition: 0.4s ease;
    padding: 20px 0;
  }

  .gallery-link:hover {
    letter-spacing: 0.8px;
    transition: 0.2s;
  }

  .gallery-link span {
    text-decoration: underline;
  }
</style>
