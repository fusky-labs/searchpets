import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import dynamic from "next/dynamic";
import { ReactNotifications, Store } from "react-notifications-component";

import { ComicItemLoading } from "../components/ComicItem";
const ComicItem = dynamic(
  () => import("../components/ComicItem"),
  { loading: () => <ComicItemLoading />, ssr: false },
);

import BaseHead from "../components/BaseHead";
import Container from "../components/Container";
import HeaderHero from "../components/HeaderHero";
import YearPickerItem from "../components/YearPickerItem";

export default function Home() {
  // #region Communicating with the Flask server and some UI stuff
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

  const onChangeCharacters = (e) =>
    setCharacters(e.target.value.toLowerCase().split(", "));

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
    }

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

  const ClickedYears = (year) =>
    years.includes(year)
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
    const backToTop = document.querySelector(".back-to-top-btn");

    window.onscroll = () => {
      window.pageYOffset > 321
        ? searchBox.classList.add("lock")
        : searchBox.classList.remove("lock");

      window.pageYOffset > 675
        ? backToTop.classList.add("expand")
        : backToTop.classList.remove("expand");
    };
  }, [comics, years]);

  const title = "Searchpets! - Search characters and pages from Housepets!";
  let description = `Search through ${totalComicCount} pages and ${totalCharacterCount} characters from a furry comic, Housepets!`;

  // #endregion

  return (
    <>
      <ReactNotifications />
      <BaseHead title={title} description={description} />
      <Container>
        {/* main */}
        <HeaderHero
          characterCount={totalCharacterCount}
          comicCount={totalComicCount}
        />
        {/* Search box */}
        <div className="search-box-wrapper">
          <div className="search-box">
            <input
              type="text"
              className="search-box__input"
              placeholder="Search for characters"
              onChange={onChangeCharacters}
              onKeyDown={(e) => e.key === "Enter" && requestHousepetsData()}
            />
            <div className="search-actions">
              <button
                className="back-to-top-btn"
                onClick={() => window.scrollTo(0, 314)}
              >
                <FontAwesomeIcon
                  icon={faCaretUp}
                  size="lg"
                  className="translate-y-[0.20rem]"
                />
                <span className="px-1 text-[1.125rem]">Back to top</span>
              </button>
              <button className="search-btn" onClick={requestHousepetsData}>
                <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" />
              </button>
            </div>
          </div>
        </div>
        {/* Year picker */}
        <div className="year-picker">
          {year_list.map((year) => (
            <YearPickerItem
              key={year}
              years={year}
              onClick={() => ClickedYears(year)}
            />
          ))}
        </div>
        {/* Search results */}
        <div className="result-container">
          <h2 className="result-text">
            Showing <strong>{comics.length}</strong> results
          </h2>
          <div className="result-grid">
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
    </>
  );
}
