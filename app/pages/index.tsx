import Head from "next/head";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import ComicItem from "../components/ComicItem";
import Container from "../components/Container";

import { ReactNotifications, Store } from "react-notifications-component";

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

  const onChangeCharacters = (e) => {
    setCharacters(e.target.value.toLowerCase().split(", "));
  };

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

  const ClickedYears = (year) => {
    if (years.includes(year)) {
      setYears(years.filter((y) => y !== year));
    } else {
      setYears(years.concat(year));
    }
  };

  useEffect(() => {
    fetch("/api/data")
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setTotalComicCount(res.housepets_db_length);
        setTotalCharacterCount(res.characters_db_length);
      });
    console.log(years);

    // Handle your mom
    const searchBox = document.querySelector(".search-box-wrapper");
    const backToTop = document.getElementById("btt-btn");

    window.onscroll = () => {
      if (window.pageYOffset > 309) {
        searchBox.classList.add("lock");
      } else {
        searchBox.classList.remove("lock");
      }

      if (window.pageYOffset > 310) {
        backToTop.classList.add("btt-btn-show");
      } else {
        backToTop.classList.remove("btt-btn-show");
      }
    };

  }, [comics, years]);
  // #endregion

  const title = "Searchpets! - Search characters and pages from Housepets!";
  let description = `Search through ${totalComicCount} pages and ${totalCharacterCount} characters from a furry comic, Housepets!`;

  return (
    <div>
      <ReactNotifications />
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <meta name="description" content={description} />
        <meta name="og:type" content="website" />
        <meta name="og:title" content={title} />
        <meta name="og:description" content={description} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta
          name="keywords"
          content="housepets, furry, comics, furry comics, animals, animal comic, fursuit"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <div className="fixed bottom-0 right-0 m-4">
          <button
            id="btt-btn"
            className="px-5 py-3 pointer-events-none opacity-0 shadow-md font-bold rounded-md transition-all translate-y-5 duration-300 text-xl text-center h-full w-full"
            onClick={() => window.scrollTo(0, 310)}
          >
            <FontAwesomeIcon
              icon={faCaretUp}
              size="lg"
              className="translate-y-[0.20rem]"
            />
            <span className="px-2">Back to top</span>
          </button>
        </div>
        <div className="text-center max-w-[900px] p-4 mt-[12vh] mx-0 flex justify-center">
          <h1 className="text-center max-w-3xl text-3xl">
            Search through{" "}
            <span
              id="pages-count"
              className="font-black bg-clip-text text-transparent"
            >
              {totalComicCount}
            </span>
            &nbsp;pages and{" "}
            <span
              id="character-count"
              className="font-black bg-clip-text text-transparent"
            >
              370
            </span>{" "}
            characters from your favorite furry comic!
          </h1>
        </div>
        <div className="search-box-wrapper relative min-w-full z-10">
          <div className="search-box-clamp flex pl-4 max-w-[800px] mx-auto my-0 px-[1.5ex] rounded-md duration-300 transition-all">
            <input
              type="text"
              className="w-full border-none text-xl h-16"
              placeholder="Search for characters"
              onChange={onChangeCharacters}
              onKeyDown={(e) => e.key === "Enter" && requestHousepetsData()}
            />
            <button
              className="p-3 px-5 rounded-md"
              onClick={requestHousepetsData}
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" />
            </button>
          </div>
        </div>
        <div className="year-picker grid gap-2 min-w-full">
          {year_list.map((year) => (
            <div className="relative block" key={year}>
              <input
                className="absolute top-0 invisible"
                type="checkbox"
                id={"year-" + year}
              />
              <label
                className="block px-5 py-3 shadow-md font-bold rounded-md transition-all duration-300 text-xl text-center h-full w-full bg-slate-800"
                htmlFor={"year-" + year}
                onClick={() => ClickedYears(year)}
              >
                {year}
              </label>
            </div>
          ))}
        </div>
        <div className="p-5">
          <h2 className="mb-4 text-2xl text-center">
            Showing <strong>{comics.length}</strong> results
          </h2>
          <div className="grid gap-4 max-w-screen-md my-0 mx-auto">
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
