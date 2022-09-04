import { ComicItemLoading } from "@/components/ComicItem"
import Container from "@/components/Container"
import dynamic from "next/dynamic"
import { useEffect, useState } from "react"
import styles from "@/styles/pages/Search.module.scss"
import { Search, Data, Characters } from "../handlers/ApiHandler"

const ComicItem = dynamic(() => import("../components/ComicItem"), {
  loading: () => <ComicItemLoading />,
  ssr: false
})

export default function Home() {
  const [comics, setComics] = useState([])
  const [query, setQuery] = useState<string>("")

  useEffect(() => {
    const comicsParse: string | null = localStorage.getItem("comics")
    const queryParse: string | null = localStorage.getItem("query")

    if (comicsParse) {
      setComics(JSON.parse(comicsParse))
    }

    if (queryParse) {
      setQuery(queryParse)
    }

    Characters().then((response: any) => {
      console.log(response)
      // will return a list of characters
    })
    Data().then((response: any) => {
      console.log(response)
      // will return a json object, see the console to see the response
    })
    Search(["2008"], ["bino", "grape", "peanut"]).then((response: any) => {
      setComics(response)
      // will return a list of json objects that will be the comics
    })
  }, [])

  return (
    <Container wrap title="Search page" description="Search page description">
      <div className={styles["comic-contents"]}>
        {comics.map((comic) => (
          <ComicItem
            key={comic}
            img={comic["image"]}
            title={comic["title"]}
            characters={comic["characters"]}
            link={comic["comic_link"]}
          />
        ))}
      </div>
    </Container>
  )
}
