import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Footer() {
  return (
    <footer className="bg-neutral-900">
      <div className="content-wrapper flex justify-between">
        <span>Some disclaimer crap in here</span>
        <div>
          <a href="https://github.com/OpenFurs/searchpets" target="_blank" rel="noreferrer">
            <FontAwesomeIcon icon={['fab', 'github']} />
            <span>&nbsp;Source code</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
