import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <footer>
      <div className="content-wrapper select-none">
        <hr className="my-5" />
        <div className="flex justify-center text-center sm:text-inherit sm:justify-between flex-col sm:flex-row">
          <section className="text-neutral-400 w-full sm:w-[50%] text-sm text-center sm:text-left">
            <p className="mb-[0.55rem]">
              The use of third-party content is heavily transformative, and
              therefore, subject of Fair Use. <i>Housepets!</i> and its
              characters and story is a trademark of Rick Grifin. All rights
              reserved.
            </p>
            <p>
              A full stack web app created with Next.js and Flask by{" "}
              <Link href="https://twitter.com/skepfuskyjs" passHref>
                <a className="font-bold text-white styled-link">
                  <FontAwesomeIcon icon={faTwitter} />
                  <span className="pl-0.5">@skepfuskyjs</span>
                </a>
              </Link>{" "}
              and{" "}
              <Link href="https://twitter.com/maxthecomputer1" passHref>
                <a className="font-bold text-white styled-link">
                  <FontAwesomeIcon icon={faTwitter} />
                  <span className="pl-0.5">@maxthecomputer1</span>
                </a>
              </Link>
              .
            </p>
          </section>
          <div>
            <Link href="https://github.com/OpenFurs/searchpets" passHref>
              <a
                rel="noreferrer"
                target="_blank"
                className="styled-link text-center sm:text-right"
              >
                <FontAwesomeIcon icon={faGithub} />
                <span className="whitespace-nowrap">
                  &nbsp;Source code on GitHub
                </span>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
