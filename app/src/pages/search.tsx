import { useEffect, useState, useContext } from "react"
import { useRouter } from "next/router"
import dynamic from "next/dynamic"
import styles from "@/styles/pages/Search.module.scss"
import { SearchQueryContext } from "@/utils/Contexts"
import { searchHandler } from "../handlers/ApiHandler"
import Container from "@/components/Base/Container"
import { ComicItemLoading } from "@/components/ComicItem"
import SearchInfoItem from "@/components/SearchInfoItem"
import ComicLightbox from "@/components/ComicLightbox"

const ComicItem = dynamic(() => import("../components/ComicItem"), {
  loading: () => <ComicItemLoading />,
  ssr: false
})

export default function SearchPage() {
  const router = useRouter()

  const { searchQuery } = useContext(SearchQueryContext)

  const [comics, setComics] = useState([])
  // const [query, setQuery] = useState<string>()

  type SearchType = Partial<{
    year: string
    char: string
  }>

  const [debugResults, setDebugResults] = useState<SearchType>({
    year: undefined,
    char: undefined
  })

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

    let year = ["2015", "2016", "2017", "2018", "2019", "2020"]
    let char = ["grape", "king", "peanut", "great kitsune", "tarot"]

    let randomYear = randomizer(year)
    let randomChar = randomizer(char)

    setDebugResults({
      year: randomYear,
      char: randomChar
    })

    searchHandler([randomYear], [randomChar]).then((response) => {
      setComics(response as never[] & ComicItemType[])
    })
  }, [])

  return (
    <Container title="Search page" description="Search page description">
      {/* <ComicLightbox comicsArray={comics} comicIndex={0} /> */}
      <SearchInfoItem comics={comics?.length} />
      <div className="fixed bottom-7 left-7 bg-neutral-700 px-5 py-4 shadow-md z-[999]">
        DEBUG: {debugResults.char} - {debugResults.year} &bull; {comics?.length}{" "}
        returned
      </div>
      <div
        className={styles["comic-contents"]}
        role="list"
        data-items="default"
      >
        {comics?.map((comic: ComicItemType, index) => (
          <ComicItem
            key={index}
            comicIndex={index}
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
