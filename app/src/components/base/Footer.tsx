import styles from "@/styles/base/Footer.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub } from "@fortawesome/free-brands-svg-icons"
import { faLink } from "@fortawesome/free-solid-svg-icons"
import Link from "next/link"

export default function Footer() {
  return (
    <footer>
      <div className={styles.wrapper}>
        <hr />
        <div className={styles.container}>
          <article className={styles["text-container"]}>
            <p>
              The use of third-party content falls under Fair Use.{" "}
              <em>Housepets!</em> and its characters and story is a trademark of
              Rick Griffin. All rights reserved.
            </p>
            <p><em>Searchpets!</em> is an open source project built with Next.js and FastAPI.</p>
            <p>Updated August 2022</p>
          </article>
          <ul className={styles["links-container"]}>
            <FooterLink
              icon={faGithub}
              link="https://github.com/openfurs/searchpets"
              name="Source code on GitHub"
            />
            <FooterLink
              icon={faLink}
              link="https://housepetscomic.com"
              name="Official Housepets! website"
            />
          </ul>
        </div>
      </div>
    </footer>
  )
}

export function FooterLink({ link = "#", name, icon }: IFooterLinkProps) {
  return (
    <li>
      <Link href={link} passHref>
        <a className={styles["link-item"]}>
          <div className={styles["icon-align"]}>
            <FontAwesomeIcon icon={icon} />
          </div>
          <span>{name}</span>
        </a>
      </Link>
    </li>
  )
}
