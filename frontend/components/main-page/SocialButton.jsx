import styles from "./SocialButton.module.css";

export default function SocialButton({ website, link, handle, icon, description }) {
  return (
    <a className={styles.mainContainer} href={link}>
      <img src={`/static/social-icons/${icon}`} alt={`${website} icon`} />
      <div className={styles.mainContainerText}>
        <h3>
          <span className={styles.website}>{website} //</span> {description}
        </h3>
        <p className={styles.handle}>{handle}</p>
      </div>
    </a>
  );
}
