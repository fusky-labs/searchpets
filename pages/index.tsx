import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.scss";
import { useEffect } from "react";
import { useState } from "react";

const Home: NextPage = () => {
  const [comics, setComics] = useState([]);
  useEffect(() => {
    fetch("/api/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "year": "2019",
        "characters": ["Grape"]
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setComics(res.data)
      }
      )
  }, [])
  return (
    <div>
      <main className={styles.main}>
        <div id={styles.homeSearchContainer}>
          <h1>
            Search through <span id={styles.pagesCount}>pagesCount</span> pages
            and <span id={styles.characterCount}>characterCount</span> characters from your
            favorite furry comic!
          </h1>
          <div className="searchBox">
            <input type="text" placeholder="Search for comics, archives, etc..."/>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
