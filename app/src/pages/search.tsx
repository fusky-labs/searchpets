import { useEffect, useState } from "react"
import { ComicItemLoading } from "@/components/ComicItem"
import Container from "@/components/base/Container"
import dynamic from "next/dynamic"
import styles from "@/styles/pages/Search.module.scss"
import { searchHandler } from "../handlers/ApiHandler"

const ComicItem = dynamic(() => import("../components/ComicItem"), {
  loading: () => <ComicItemLoading />,
  ssr: false
})

export default function SearchPage() {
  const [comics, setComics] = useState([])
  const [query, setQuery] = useState<string>()

  useEffect(() => {
    const comicsParse: string | null = localStorage.getItem("comics")
    const queryParse: string | null = localStorage.getItem("query")

    if (comicsParse) {
      setComics(JSON.parse(comicsParse))
    }

    if (queryParse) {
      setQuery(queryParse)
    }

    let year = ["2016", "2017", "2018", "2019", "2020"]
    let char = ["grape", "king", "peanut", "great kitsune", "tarot"]

    const randomizer = (arr: string[]) => {
      return arr[Math.floor(Math.random() * arr.length)]
    }

    let randomYear = randomizer(year)
    let randomChar = randomizer(char)

    searchHandler([randomYear], [randomChar]).then((response) => {
      setComics(response as never[] & ComicItemType[])
    })
  }, [])

  return (
    <Container title="Search page" description="Search page description">
      <div className={styles["info-contents"]} aria-live="polite">
        <h2>
          {comics?.length !== 0
            ? `Returned ${comics!.length} result(s)`
            : "No results found"}
        </h2>
      </div>
      <div className={styles["comic-contents"]} role="list">
        {comics?.map((comic: ComicItemType) => (
          <ComicItem
            key={comic.title}
            img={comic.image}
            title={comic.title}
            characters={comic.characters}
            link={comic.comic_link}
            guestItem={comic.guest !== "0" ? true : false}
          />
        ))}
      </div>
    </Container>
  )
}
