import { useEffect, useState } from "react"
import { GetStaticProps } from "next"
import dynamic from "next/dynamic"
import { ReactNotifications, Store } from "react-notifications-component"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCaretUp } from "@fortawesome/free-solid-svg-icons"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { ComicItemLoading } from "../components/ComicItem"
import BaseHead from "../components/BaseHead"
import Container from "../components/Container"
import HeaderHero from "../components/HeaderHero"
import YearPickerItem from "../components/YearPickerItem"

const ComicItem = dynamic(() => import("../components/ComicItem"), {
  loading: () => <ComicItemLoading />,
  ssr: false,
})

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch("http://localhost:5000/data")
  const data = await res.json()
  console.log(data)

  return {
    props: data,
  }
}

export default function Home({ housepets_db_length, characters_db_length }) {
  // #region Communicating with the Flask server and some UI stuff
  const [comics, setComics] = useState([])
  const [characters, setCharacters] = useState([])
  const [years, setYears] = useState([])

  // load the data from localstorage
  useEffect(() => {
    const comics = localStorage.getItem("comics")
    const characters = localStorage.getItem("characters")
    const years = localStorage.getItem("years")

    if (comics) {
      setComics(JSON.parse(comics))
    }
    if (characters) {
      setCharacters(characters.split(", "))
    }
    if (years) {
      setYears(years.split(", "))
    }
  }, [])

  // generate a list of years from 2008 to the current year in strings
  const generateYears = () => {
    const currentYear = new Date().getFullYear()
    const years = []
    for (let i = 2008; i <= currentYear; i++) {
      years.push(i.toString())
    }
    return years
  }

  const year_list = generateYears()

  const onChangeCharacters = (e: any) =>{
    setCharacters(e.target.value.toLowerCase().split(", "))
    console.log(e.target.value.toLowerCase())
    // were storing the characters in localstorage as a string
    localStorage.setItem("characters", e.target.value.toLowerCase())
  }
  
  const requestHousepetsData = () => {
    console.info(`🚧 DEBUG: Searching on year ${years}`)
    console.info(`🚧 DEBUG: ${characters}`)

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
      })
      return
    }

    if (characters.join(", ") === "") {
      console.log("🚧 DEBUG: No year selected")
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
      })
      return
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
        setComics(res.comics)
        localStorage.setItem("comics", JSON.stringify(res.comics))
      })
  }

  const ClickedYears = (year) =>
    years.includes(year)
      ? setYears(years.filter((y) => y !== year))
      : setYears(years.concat(year))

  useEffect(() => {
    console.info(`🚧 DEBUG: ${years}`)
    localStorage.setItem("years", years.join(","))
  }, [comics, years])

  useEffect(() => {
    window.onscroll = () => {
      const heroText = document.querySelector(".hero-header")
      const searchBox = document.querySelector(".search-box-wrapper")

      if (heroText.clientHeight === 72) {
        window.pageYOffset > 327
          ? searchBox.classList.add("lock")
          : searchBox.classList.remove("lock")
      }

      if (heroText.clientHeight === 108) {
        window.pageYOffset > 390
          ? searchBox.classList.add("lock")
          : searchBox.classList.remove("lock")
      }

      if (heroText.clientHeight === 144) {
        window.pageYOffset > 408
          ? searchBox.classList.add("lock")
          : searchBox.classList.remove("lock")
      }
    }
  }, [])

  const title = "Searchpets! - Search characters and pages from Housepets!"
  let description = `Search through ${housepets_db_length} pages and ${characters_db_length} characters from a furry comic, Housepets!`

  // #endregion

  return (
    <>
      <ReactNotifications />
      <BaseHead title={title} description={description} />
      <Container>
        {/* main */}
        <HeaderHero
          characterCount={characters_db_length}
          comicCount={housepets_db_length}
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
              value={characters}
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
        <div className="year-picker-wrapper">
          <div className="year-picker">
            {year_list.map((year) => (
              <YearPickerItem
                key={year}
                years={year}
                onClick={() => ClickedYears(year)}
              />
            ))}
          </div>
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
              )
            })}
          </div>
        </div>
      </Container>
    </>
  )
}
