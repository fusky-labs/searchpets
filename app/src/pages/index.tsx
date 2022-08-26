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
  const [characters, setCharacters] = useState<string[]>([])
  const [years, setYears] = useState<string[]>([])

  useEffect(() => {
    const comicsParse: string | null = localStorage.getItem("comics")

    if (comicsParse) {
      setComics(JSON.parse(comicsParse))
    }
    // if (charactersParse) {
    //   setCharacters(charactersParse.split(", "))
    // }
    // if (yearsParse) {
    //   setYears(yearsParse.split(","))
    //   yearsParse.split(",").forEach((year) => {
    //     const year_id = document.getElementById(
    //       `year-${year}`
    //     ) as HTMLInputElement
    //     if (year_id) {
    //       year_id.checked = true
    //     }
    //   })
    // }
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
