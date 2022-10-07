import { useEffect, useState, useContext } from "react"
import { useRouter } from "next/router"
import Container from "@/components/Base/Container"
import { ComicItemLoading } from "@/components/ComicItem"
import dynamic from "next/dynamic"
import styles from "@/styles/pages/Search.module.scss"
import { searchHandler } from "../handlers/ApiHandler"
import SearchInfoItem from "@/components/SearchInfoItem"
import { SearchQueryContext } from "@/utils/Contexts"

const ComicItem = dynamic(() => import("../components/ComicItem"), {
  loading: () => <ComicItemLoading />,
  ssr: false
})

export default function SearchPage() {
  const router = useRouter()

  // !!! referred from searchQuery from Layout.tsx since it's wrapped with a Provider
  const { searchQuery } = useContext(SearchQueryContext)

  const [comics, setComics] = useState([])
  // const [query, setQuery] = useState<string>()

  useEffect(() => {
    const comicsParse: string | null = localStorage.getItem("comics")
    const queryParse: string | null = localStorage.getItem("query")

    if (comicsParse) {
      setComics(JSON.parse(comicsParse))
    }

    // if (queryParse) {
    //   setQuery(queryParse)
    // }

    const randomizer = (arr: string[]) => {
      return arr[Math.floor(Math.random() * arr.length)]
    }

    let year = ["2016", "2017", "2018", "2019", "2020"]
    let char = ["grape", "king", "peanut", "great kitsune", "tarot"]

    let randomYear = randomizer(year)
    let randomChar = randomizer(char)

    searchHandler(year, [randomChar]).then((response) => {
      setComics(response as never[] & ComicItemType[])
    })
  }, [])

  return (
    <Container title="Search page" description="Search page description">
      <SearchInfoItem comics={comics?.length} />
      <div className={styles["comic-contents"]} role="list">
        {comics?.map((comic: ComicItemType) => (
          <ComicItem
            key={comic.title}
            img={comic.image}
            title={comic.title}
            characters={comic.characters}
            link={comic.comic_link}
            guestItem={comic.guest == "0" ? true : false}
          />
        ))}
      </div>
    </Container>
  )
}
