import { useEffect, useState } from "react"
import { ComicItemLoading } from "@/components/ComicItem/ComicItem"
import Container from "@/components/base/Container"
import dynamic from "next/dynamic"
import styles from "@/styles/pages/Search.module.scss"
import {
  searchHandler,
  dataHandler,
  characterHandler
} from "../handlers/ApiHandler"

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

    // dataHandler().then((response) => {
    //   console.log(response)
    // })

    searchHandler(["2019", "2020"], ["lois"]).then((response) => {
      setComics(response as never[])
    })
  }, [])

  return (
    <Container title="Search page" description="Search page description">
      <div className={styles["info-contents"]}>
        <h2>
          {comics!.length !== 0
            ? `Returned ${comics!.length} result(s)`
            : "No results found"}
        </h2>
      </div>
      <div className={styles["comic-contents"]}>
        {comics.map((comic: ComicItems) => (
          <ComicItem
            key={comic.title}
            img={comic.image}
            title={comic.title}
            characters={comic.characters}
            link={comic.comic_link}
          />
        ))}
        <ComicItem
          title="(Isolated component debug mode)"
          characters={["test", "test2"]}
          img="https://www.housepetscomic.com/wp-content/uploads/2017/07/2017-07-14-concerned-1.png"
          link=""
          guestItem
        />
      </div>
    </Container>
  )
}
