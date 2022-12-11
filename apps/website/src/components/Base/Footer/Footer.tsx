import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub } from "@fortawesome/free-brands-svg-icons"
import styles from "./Footer.module.scss"

export function Footer() {
  const VERSION_NO = "2.3.0"

  return (
    <footer className={styles["wrapper"]}>
      <article className={styles["copyright-panel"]}>
        <p>
          <span className={styles["emphasis"]}>Searchpets!</span> is a
          passionate, open source project created by two developers from
          Southeast Asia. SP does not own any of the contents used on this
          website and has no direct affiliation with <em>Housepets!</em> and/or
          all of Rick Griffin's intellectual property.
        </p>
        <p>
          {`© ${new Date().getFullYear()} OpenFurs. Source code licensed under `}
          <Link
            href="https://www.gnu.org/licenses/old-licenses/gpl-2.0.html"
            target="_blank"
            rel="noopener norefferer"
          >
            GPL-2.0
          </Link>
          {"."}
        </p>
      </article>
      <div className={styles["version-panel"]}>
        <Link
          href="https://github.com/openfurs/searchpets"
          target="_blank"
          rel="noopener norefferer"
        >
          <FontAwesomeIcon icon={faGithub} />
          <span>View source code</span>
        </Link>
        <span>{`Searchpets! Beta ${VERSION_NO}`}</span>
      </div>
    </footer>
  )
}
