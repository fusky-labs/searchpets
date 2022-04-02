import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Footer() {
  return (
    <footer>
      <div id="wrapper" className="wrapper">
        <span>Some disclaimer crap in here</span>
        <div id="social">
          <a href="https://github.com/OpenFurs/searchpets" target="_blank" rel="noreferrer">
            <FontAwesomeIcon icon={['fab', 'github']} />
            <span> Source code lol</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
