import styles from "./ProjectCard.module.css";

export default function ProjectCard({ title, description, link }) {
  return (
    <div className={styles.projectCard}>
      <div className={`${styles.cornerDeco} ${styles.topLeft}`} />
      <div className={`${styles.cornerDeco} ${styles.bottomRight}`} />
      <h3>{title}</h3>
      <p>{description}</p>
      <a href={link} target="_blank" rel="noopener noreferrer">
        {link.replace(/https?:\/\//, ">>> ")}
      </a>
    </div>
  );
}
