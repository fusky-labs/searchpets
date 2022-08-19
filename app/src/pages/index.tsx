import { ComicItemLoading } from "@/components/ComicItem"
import Container from "@/components/Container"
import SearchBox from "@/components/search/SearchBox"
import FilterBox from "@/components/search/FilterBox"
import dynamic from "next/dynamic"
import { useEffect, useState } from "react"
import styles from "@/styles/pages/Search.module.scss"

const ComicItem = dynamic(() => import("../components/ComicItem"), {
  loading: () => <ComicItemLoading />,
  suspense: true,
  ssr: false
})

export default function Home() {
  const [comics, setComics] = useState([])
  const [characters, setCharacters] = useState<string[]>([])
  const [years, setYears] = useState<string[]>([])

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
      setYears(years.split(","))
      // for every yearpicker item, check if it's checked
      years.split(",").forEach((year) => {
        const year_id = document.getElementById(
          `year-${year}`
        ) as HTMLInputElement
        if (year_id) {
          year_id.checked = true
        }
      })
    }
  }, [])

  return (
    <Container wrap>
      <SearchBox />
      <FilterBox />
      <div className={styles["comic-contents"]}>
        {/* <ComicItemLoading /> */}
        <ComicItem
          img="https://www.housepetscomic.com/wp-content/uploads/2019/01/2019-01-16-whats-the-story-wishbone.png"
          title="title"
        />
        <ComicItem img="/static/02.jpg" title="title" />
        <ComicItem img="/static/03.jpg" title="title" />
        <ComicItem img="/static/04.jpg" title="title" />
        <ComicItem img="/static/05.jpg" title="title" />
      </div>
    </Container>
  )
}
