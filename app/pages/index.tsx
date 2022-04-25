import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import ComicItem from "../components/ComicItem";
import Container from "../components/Container";
import BaseHead from "../components/BaseHead";

import { ReactNotifications, Store } from "react-notifications-component";
import YearPickerItem from "../components/YearPickerItem";
import HeaderHero from "../components/HeaderHero";

export default function Home() {
  // #region API
  const [comics, setComics] = useState([]);
  const [totalComicCount, setTotalComicCount] = useState(0);
  const [totalCharacterCount, setTotalCharacterCount] = useState(0);
  const [characters, setCharacters] = useState([]);
  const [years, setYears] = useState([]);
  
  let year_list = [
    "2008",
    "2009",
    "2010",
    "2011",
    "2012",
    "2013",
    "2014",
    "2015",
    "2016",
    "2017",
    "2018",
    "2019",
    "2020",
    "2021",
    "2022",
  ];

  const onChangeCharacters = (e) => setCharacters(e.target.value.toLowerCase().split(", "));

  const requestHousepetsData = () => {
    console.log(`Searching on year ${years}`);
    console.log(characters);
    if (years.length === 0) {
      Store.addNotification({
        title: "No year selected",
        message: "Please select a year",
        type: "danger",
        insert: "top",
        container: "top-right",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
          duration: 2000,
        },
      });
      return;
    };

    if (characters.join(", ") === "") {
      console.log("No year selected");
      Store.addNotification({
        title: "Nothing has been outputted",
        message: "Please select a character",
        type: "danger",
        insert: "top",
        container: "top-right",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
          duration: 1000,
        },
      });
      return;
    }

    fetch("/api/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        year: years,
        characters: characters,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setComics(res.comics);
      });
  };

  const ClickedYears = (year) => years.includes(year)
      ? setYears(years.filter((y) => y !== year))
      : setYears(years.concat(year));

  useEffect(() => {
    fetch("/api/data")
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setTotalComicCount(res.housepets_db_length);
        setTotalCharacterCount(res.characters_db_length);
      });
    console.log(years);

    const searchBox = document.querySelector(".search-box-wrapper");
    const backToTop = document.getElementById("back-to-top-btn");

    window.onscroll = () => {
      window.pageYOffset > 313
        ? searchBox.classList.add("lock")
        : searchBox.classList.remove("lock");

      window.pageYOffset > 675
        ? backToTop.classList.add("show")
        : backToTop.classList.remove("show");
    };
  }, [comics, years]);
  // #endregion

  const title = "Searchpets! - Search characters and pages from Housepets!";
  let description = `Search through ${totalComicCount} pages and ${totalCharacterCount} characters from a furry comic, Housepets!`;

  return (
    <div>
      <ReactNotifications />
      <BaseHead title={title} description={description} />
      <Container>
        {/* main */}
        <HeaderHero characterCount={totalCharacterCount} comicCount={totalComicCount} />
        {/* Search box */}
        <div className="search-box-wrapper px-4 relative min-w-full z-10 transition-colors duration-300">
          <div className="search-box-clamp flex max-w-[800px] mx-auto my-0 relative rounded-md overflow-hidden">
            <input
              type="text"
              className="w-full border-none text-xl h-16 px-[1.5ex]"
              placeholder="Search for characters"
              onChange={onChangeCharacters}
              onKeyDown={(e) => e.key === "Enter" && requestHousepetsData()}
            />
            <div className="absolute right-4 top-[0.4rem] flex justify-end items-center">
              <button
                id="back-to-top-btn"
                className="px-3 pl-4 py-3 rounded-md text-center h-max pointer-events-none opacity-0 translate-x-5 transition-all"
                onClick={() => window.scrollTo(0, 314)}
              >
                <FontAwesomeIcon
                  icon={faCaretUp}
                  size="lg"
                  className="translate-y-[0.20rem]"
                />
                <span className="px-2 text-[1.125rem]">Back to top</span>
              </button>
              <button
                id="search-btn"
                className="p-3 px-5 rounded-md h-max"
                onClick={requestHousepetsData}
              >
                <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" />
              </button>
            </div>
          </div>
        </div>
        {/* Year picker */}
        <div className="year-picker grid gap-2 md:min-w-[50rem] min-w-full">
          {year_list.map((year) => (
            <YearPickerItem key={year} years={year} onClick={() => ClickedYears(year)} />
          ))}
        </div>
        {/* Search results */}
        <div className="p-5 max-w-screen-2xl md:max-w-screen-lg">
          <h2 className="mb-4 text-2xl text-center">
            Showing <strong>{comics.length}</strong> results
          </h2>
          <div
            id="result-grid"
            className="grid gap-4 max-w-screen-md md:max-w-screen-2xl my-0 mx-auto"
          >
            {comics.map((comic) => {
              return (
                <ComicItem
                  key={comic.comic_link}
                  characters={comic.characters.join(", ")}
                  link={comic.comic_link}
                  title={comic.title}
                  image={comic.image}
                />
              );
            })}
          </div>
        </div>
      </Container>
    </div>
  );
}
