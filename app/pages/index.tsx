import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import ComicItem from "../components/ComicItem";
import CheckboxItem from "../components/CheckboxItem";

export default function Home() {
  // #region API stuff
  const [comics, setComics] = useState([]);
  const [totalComicCount, setTotalComicCount] = useState(0);
  const [characters, setCharacters] = useState([]);
  const [years, setYears] = useState([]);
  let year_list = ["2008", "2009", "2010", "2011", "2012", "2013", 
                  "2014", "2015", "2016", "2017", "2018", "2019",
                  "2020", "2021", "2022"];
  const onChangeCharacters = (e) => {
    console.log(e.target.value);
    setCharacters(e.target.value.toLowerCase().split(", "));
  };

  const requestHousepetsData = () => {
    console.log(`searching on year ${years}`)
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
        console.log(res);
        setComics(res.comics);
      });
  };

  
  const ClickedYears = (year) => {
    
    if (years.includes(year)) {
      // delete the year from the year array
      console.log("deleting an element")
      setYears(years.filter((y) => y !== year));
    } else {
      // add the year to the years variable
      setYears(years.concat(year));
      console.log("adding an element")
    }
  }

  useEffect(() => {
    // async function requestHousepetsData() {
    //   let response = await fetch("/api/search", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       year: "2019",
    //       characters: characters,
    //     }),
    //   });
    //   response = await response.json();
    //   console.log(response);
    // }

    // requestHousepetsData();
    console.log("welcome :3");
    fetch("/api/data")
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setTotalComicCount(res.housepets_db_length);
      });
    console.log(years)
  }, [comics, years]);
  // #endregion
  
  const title = "Searchpets! - Search characters and pages from Housepets!";
  const description = `Search through ${totalComicCount} pages and 370 characters from a furry comic, Housepets!`;
  
  return (
    <div>
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
      <header>
        <div className="content-wrapper flex justify-center text-4xl">
          <strong className="text-2xl">Searchpets</strong>
        </div>
      </header>
      <main className="flex flex-col justify-between">
        <div className="mx-auto my-0 max-w-[1400px] p-5 flex flex-col items-center gap-y-8">
          <div className="text-center max-w-[700px] p-4 mt-[12vh] mx-0 flex justify-center">
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
          <div className="search-box-clamp flex items-center gap-x-4 px-[2ex] pl-6 rounded-md duration-300 transition-all">
            <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" />
            <input
              type="text"
              className="w-full border-non text-xl h-16"
              placeholder="Search for characters..."
              onChange={onChangeCharacters}
              onKeyDown={(e) => e.key === "Enter" && requestHousepetsData()}
            />
          </div>
          <div className="year-picker grid gap-2 w-full">
            {year_list.map((year) => (
              // <CheckboxItem key={year} year={year}/>
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
        </div>
        <div id="results-box-container" className="p-5">
          <h2 className="mb-4 text-2xl text-center">
            Showing <strong>{comics.length}</strong> results
          </h2>
          <div className="grid gap-4 max-w-screen-md my-0 mx-auto">
            {comics.map((comic) => {
              return (
                <>
                  <ComicItem
                    key={comic.comic_link}
                    characters={comic.characters.join(", ")}
                    link={comic.comic_link}
                  />
                </>
              );
            })}
          </div>
        </div>
      </main>
      <footer>
        <div className="content-wrapper">
          <hr className="my-5" />
          <div className="flex justify-center text-center sm:text-inherit sm:justify-between flex-col sm:flex-row">
            <p className="text-neutral-400 w-full sm:w-[50%] text-sm text-center sm:text-left">
              The use of third-party content is heavily transformative, and
              therefore, subject of Fair Use. <i>Housepets!</i> and its
              characters is a trademark of Rick Grifin. All rights reserved.
            </p>
            <div>
              <Link href="https://github.com/OpenFurs/searchpets" passHref>
                <a
                  rel="noreferrer"
                  target="_blank"
                  className="text-center sm:text-right"
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
    </div>
  );
};
