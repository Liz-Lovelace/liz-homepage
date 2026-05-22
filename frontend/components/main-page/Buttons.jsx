import styles from "./Buttons.module.css";

export default function Buttons() {
  const images = [
    [
      "CC_Public_Domain.png",
      "https://creativecommons.org/publicdomain/zero/1.0/",
    ],
    ["tim.png", "https://tim.izhanov.ru/"],
    ["emmalink.gif", "https://heckscaper.com/landing.php"],
    ["trans_your_gender.gif", "https://turnmeintoagirl.com/"],
    ["paws.png"],
    ["linux.gif"],
    ["hacker.png", "http://www.catb.org/~esr/faqs/hacker-howto.html"],
  ];

  return (
    <div className={styles.imageContainer}>
      {images.map(([filename, url], index) => (
        <a key={index} href={url} target="_blank" rel="noopener noreferrer">
          <img alt={filename.slice(0, -4)} src={`/static/buttons/${filename}`} />
        </a>
      ))}
    </div>
  );
}
