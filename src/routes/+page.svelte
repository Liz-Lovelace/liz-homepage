<script>
  import SocialButton from "./SocialButton.svelte";
</script>

<div class="spacebg1" />
<div class="spacebg2" />
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
  <SocialButton
    website="Telegram"
    link="https://t.me/liz_lovelace"
    handle="@Liz_Lovelace"
    icon="/telegram-icon.svg"
    description="Let chat! DMs open!"
  />
  <SocialButton
    website="Discord"
    link="https://discordapp.com/users/967498063121903686"
    handle="LizLovelace#2420"
    icon="discord-icon.svg"
    description="Let's chat (for gamers)"
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
  <div class="center-vertically">
    <p>I stole the design for this page from</p>
    <a href="https://heckscaper.com/main.html"
      ><img alt="Emma Essex" src="emmalink.gif" />
    </a>
  </div>
</main>

<style>
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: "alagard", sans-serif;
    text-align: center;
  }

  h1 {
    font-size: 4rem;
  }

  .spacebg1,
  .spacebg2 {
    width: 100%;
    height: 100%;
    background-repeat: repeat;
    position: fixed;
    top: 0px;
    left: 0px;
    transform: translateZ(0);
  }

  .spacebg1 {
    animation: backgroundScroll1 30s linear infinite;
    background-image: url("space_bg1.gif");
    z-index: -1;
  }

  .spacebg2 {
    animation: backgroundScroll2 55s linear infinite;
    background-image: url("space_bg2.gif");
    z-index: -2;
  }

  @keyframes backgroundScroll1 {
    0% {
      background-position: 0px 0px;
      filter: opacity(100%);
    }
    50% {
      background-position: 0px -234px;
      filter: opacity(50%);
    }
    100% {
      background-position: 0px -468px;
      filter: opacity(100%);
    }
  }

  @keyframes backgroundScroll2 {
    0% {
      background-position: 0px 0px;
      filter: opacity(50%);
    }
    50% {
      background-position: 0px -234px;
      filter: opacity(100%);
    }
    100% {
      background-position: 0px -468px;
      filter: opacity(50%);
    }
  }

  main {
    max-width: 40rem;
    margin: auto;
    padding: 0 1.5em;
  }

  .center-vertically {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
  }
  .center-vertically p {
    margin-right: 10px;
  }
</style>
