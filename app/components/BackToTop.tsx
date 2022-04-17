import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";

export default function BackToTop() {

  useEffect(() => {
    const backToTop = document.getElementById("btt-btn");
    
    window.onscroll = () => {
      if (window.pageYOffset > 311) {
        backToTop.classList.add("btt-btn-show");
      } else {
        backToTop.classList.remove("btt-btn-show");
      }
    };
  }, []);

  return (
    <>
      <div className="fixed bottom-0 right-0 m-4">
        <button
          id="btt-btn"
          className="px-5 py-3 pointer-events-none opacity-0 shadow-md font-bold rounded-md transition-all translate-y-5 duration-300 text-xl text-center h-full w-full"
          onClick={() => window.scrollTo(0, 310)}
        >
          <FontAwesomeIcon icon={faCaretUp} size="lg" className="translate-y-[0.20rem]" />
          <span className="px-2">Back to top</span>
        </button>
      </div>
    </>
  );
};
