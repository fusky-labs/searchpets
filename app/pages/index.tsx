import Head from "next/head";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import ComicItem from "../components/ComicItem";
import CheckboxItem from "../components/CheckboxItem";

export default function Home() {
  // #region API stuff
  const [comics, setComics] = useState([]);
  const [totalComicCount, setTotalComicCount] = useState(0);
  const [years, setyears] = useState(["2019"]);
  const [characters, setCharacters] = useState([]);
  let year_list = ["2008", "2009", "2010", "2011", "2012", "2013", 
                  "2014", "2015", "2016", "2017", "2018", "2019",
                  "2020", "2021", "2022"];
  const onChangeCharacters = (e) => {
    console.log(e.target.value);
    setCharacters(e.target.value.toLowerCase().split(", "));
  };

  const requestHousepetsData = () => {
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
  }, [comics]);
  // #endregion
  
  const title = "Searchpets! - Search characters and pages from Housepets!";
  const description = `Search from 370 characters and ${totalComicCount} pages from a furry comic, Housepets!`;
  
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
        <meta name="keywords" content="housepets, furry, comics, furry comics, animals, animal comic, fursuit" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col justify-between">
        <div className="mx-auto my-0 max-w-[1400px] p-5 flex flex-col items-center gap-y-8">
          <div className="text-center max-w-[700px] p-4 mt-[12vh] mx-0 flex justify-center">
            <h1 className="text-center max-w-3xl text-3xl">
              Search through <span id="pages-count" className="font-black bg-clip-text text-transparent">{totalComicCount}</span>
              &nbsp;pages and <span id="character-count" className="font-black bg-clip-text text-transparent">370</span> characters
              from your favorite furry comic!
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
            {/* TODO: MAKE A FOR LOOP FOR THIS -- THIS IS TERRIBLE */}
            {
              year_list.map((year) => (
                <CheckboxItem
                  key={year}
                  year={year}
                />
              ))
            }
          </div>
        </div>
        <div id="results-box-container" className="p-5">
          <h2 className="mb-4 text-2xl text-center">Showing <strong>{comics.length}</strong> results</h2>
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
    </div>
  );
};
