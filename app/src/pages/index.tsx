import { ComicItemLoading } from "@/components/ComicItem"
import Container from "@/components/Container"
import dynamic from "next/dynamic"
import { useEffect, useState } from "react"
import styles from "@/styles/pages/Search.module.scss"

const ComicItem = dynamic(() => import("../components/ComicItem"), {
  loading: () => <ComicItemLoading />,
  ssr: false,
})

export default function Home() {
  const [comics, setComics] = useState([])
  const [query, setQuerry] = useState<string>("")

  useEffect(() => {
    const comicsParse: string | null = localStorage.getItem("comics")
    const queryParse: string | null = localStorage.getItem("query")

    if (comicsParse) {
      setComics(JSON.parse(comicsParse))
    }
    if(queryParse) {
      setQuerry(queryParse)
    }
  }, [])

  return (
    <Container wrap title="Search page" description="Search page description">
      <div className={styles["comic-contents"]}>
        {comics.map((comic) => (
          <ComicItem
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
