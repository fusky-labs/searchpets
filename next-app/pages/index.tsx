import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.scss";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ComicItem from "../components/ComicItem";

const Home: NextPage = () => {
  // #region API stuff
  const [comics, setComics] = useState([]);

  const [characters, setCharacters] = useState([]);

  const onchangecharacters = (e) => {
    console.log(e.target.value);
    setCharacters(e.target.value.toLowerCase().split(", "));
  };

  const requestHousepetsDataUwU = () => {
    // console.log("Submitted!")
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
        <meta name="keywords" content="housepets, furry, comics, furry comics, animals, fursuit" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div id={styles.homeSearchContainer}>
          <h1>
            Search through <span id={styles.pagesCount}>pagesCount</span> pages
            and <span id={styles.characterCount}>370</span> characters from your
            favorite furry comic!
          </h1>
          <div className="searchBox">
            <FontAwesomeIcon icon={["fas", "fa-magnifying-glass"]} />
            <input
              type="text"
              placeholder="Search for characters..."
              onChange={onchangecharacters}
            />
            <button id={styles.searchIcon} onClick={requestHousepetsDataUwU}>
              <FontAwesomeIcon icon={["fas", "fa-caret-right"]} />
            </button>
            <button id={styles.filterIcon}>
              <FontAwesomeIcon icon={["fas", "filter"]} />
            </button>
          </div>
          <div id="responses">
            <h1>Results: {comics.length}</h1>
              {comics.map((comic) => {
                return (
                  <ComicItem
                    key={comic.comic_link}
                    characters={comic.characters.join(", ")}
                    link={comic.comic_link}
                  />
                );
              })}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;