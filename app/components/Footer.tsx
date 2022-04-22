import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <footer>
      <div className="content-wrapper select-none">
        <hr className="my-5" />
        <div className="flex justify-center text-center sm:text-inherit sm:justify-between flex-col sm:flex-row">
          <p className="text-neutral-400 w-full sm:w-[50%] text-sm text-center sm:text-left">
            The use of third-party content is heavily transformative, and
            therefore, subject of Fair Use. <i>Housepets!</i> and its characters
            is a trademark of Rick Grifin. All rights reserved.
          </p>
          <div>
            <Link href="https://github.com/OpenFurs/searchpets" passHref>
              <a
                rel="noreferrer"
                target="_blank"
                className="text-center sm:text-right underline decoration-2 transition-colors duration-150 decoration-blue-500 hover:decoration-blue-300"
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
