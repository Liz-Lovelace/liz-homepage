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

  <h2>My social media</h2>
  <SocialButton
    website="Bluesky"
    link="https://bsky.app/profile/liz.sex"
    handle="@liz.sex"
    icon="bluesky-icon.svg"
    description="Decentralized bangers"
  />
  <!--
    <SocialButton
      website="Twitter (MAIN)"
      link="https://twitter.com/liz_love_lace"
      handle="@liz_love_lace"
      icon="twitter-icon.svg"
      description="Where I post bangers"
    />
    <SocialButton
      website="Twitter (NSFW)"
      link="https://twitter.com/lace_love_liz"
      handle="@lace_love_liz"
      icon="twitter-icon.svg"
      description="Where I post nudes"
    />
  -->
  <SocialButton
    website="Discord"
    link="https://discordapp.com/users/967498063121903686"
    handle="LizLovelace#2420"
    icon="discord-icon.svg"
    description="Let's chat! DMs open!"
  />
  <SocialButton
    website="Telegram"
    link="https://t.me/liz_lovelace"
    handle="@Liz_Lovelace"
    icon="/telegram-icon.svg"
    description="Other chat app"
  />
  <SocialButton
    website="GitHub"
    link="https://github.com/Liz-Lovelace"
    handle="Liz-Lovelace"
    icon="github-icon.svg"
    description="Source code for projects"
  />
  <SocialButton
    website="MyAnimeList"
    link="https://myanimelist.net/animelist/Liz-Lovelace"
    handle="Liz-Lovelace"
    icon="myanimelist-icon.png"
    description="Anime I've seen"
  />

  <h2>My projects</h2>
  <ProjectCard
    title="Liz Lovelace homepage"
    description="A cool website all about me and my projects!"
    link="https://liz.sex"
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
</style>
