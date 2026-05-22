import SpaceBackground from "./SpaceBackground.jsx";
import SocialButton from "./SocialButton.jsx";
import ProjectCard from "./ProjectCard.jsx";
import Buttons from "./Buttons.jsx";
import styles from "./MainPage.module.css";

export default function MainPage() {
  return (
    <div>
      <SpaceBackground />
      <main className={styles.homepageMain}>
        <h1>Liz Lovelace</h1>

        <h2>About me</h2>
        <p>
          I'm a Rationalist; Heretic; Queer; Trans(fem); Kinkster; Coder; Ainotkilleveryoneist; Chuuni;
        </p>

        <a className={`${styles.outsideLink}`} href="/blog">
          &lt;&lt;&lt; Read the <span>Essays</span>
        </a>
        <a className={`${styles.outsideLink} ${styles.right}`} href="/gallery">
          Check out the <span>Gallery</span> &gt;&gt;&gt;
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
          website="Discord"
          link="https://discordapp.com/users/967498063121903686"
          handle="lizlovelace"
          icon="discord-icon.svg"
          description="DMs open!"
        />
        <SocialButton
          website="Telegram"
          link="https://t.me/liz_lovelace"
          handle="@Liz_Lovelace"
          icon="telegram-icon.svg"
          description="Message me"
        />
        <SocialButton
          website="GitHub"
          link="https://github.com/Liz-Lovelace"
          handle="Liz-Lovelace"
          icon="github-icon.svg"
          description="Source code for projects"
        />
        <SocialButton
          website="FetLife"
          link="https://fetlife.com/users/18532106"
          handle="Liz-Lovelace"
          icon="fetlife-icon.svg"
          description="Have sex with me!"
        />

        <h2>My projects</h2>
        <ProjectCard
          title="Quantum Decoherence Generator"
          description="Splits your reality every once in a while, as a practical joke on God"
          link="https://quantum.liz-lovelace.com"
        />
        <ProjectCard
          title="Ely Timer"
          description="Shouts at you to get back to work every 25 minutes"
          link="https://ely.liz-lovelace.com"
        />
        <Buttons />
      </main>
    </div>
  );
}