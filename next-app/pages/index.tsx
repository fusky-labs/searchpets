import Head from "next/head";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ComicItem from "../components/ComicItem";

export default function Home() {
  // #region API stuff
  const [comics, setComics] = useState([]);

  const [characters, setCharacters] = useState([]);

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
        year: "2019",
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
    console.log("welcome :3");
  }, [comics]);
  // #endregion
  
  const title = "Searchpets! - Search characters and pages from Housepets!";
  const description = "Search from 370 characters and 5,000 pages from a furry comic, Housepets!";
  
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
        <div className="mx-auto my-0 max-w-[1400px] flex flex-col items-center gap-y-8">
          <div className="text-center w-[700px] p-2 mt-[12vh] mx-0 flex justify-center">
            <h1 className="text-center max-w-3xl text-3xl">
              Search through <span id="pages-count" className="font-black bg-clip-text text-transparent">pagesCount</span>
              &nbsp;pages and <span id="character-count" className="font-black bg-clip-text text-transparent">370</span> characters
              from your favorite furry comic!
            </h1>
          </div>
          <div className="search-box-clamp flex items-center gap-x-4 p-[2ex] pl-6 rounded-md">
            <FontAwesomeIcon icon={["fas", "fa-magnifying-glass"]} size="lg" />
            <input
              type="text"
              className="w-full border-non text-xl"
              placeholder="Search for characters..."
              onChange={onChangeCharacters}
              onKeyDown={(e) => e.key === "Enter" && requestHousepetsData()}
            />
            <button
              className="border-none text-lg p-3 text-white"
              onClick={requestHousepetsData}
            >
              <FontAwesomeIcon icon={["fas", "fa-caret-right"]} size="lg" />
            </button>
          </div>
        </div>
        <div id="results-box-container" className="p-5">
          <h2 className="mb-4 text-2xl text-center">Showing <strong>{comics.length}</strong> results</h2>
          <sp-results-box className="grid grid-cols-4 gap-4">
            {comics.map((comic) => {
              return (
                <ComicItem
                  key={comic.comic_link}
                  characters={comic.characters.join(", ")}
                  link={comic.comic_link}
                />
              );
            })}
          </sp-results-box>
        </div>
      </main>
    </div>
  );
};
