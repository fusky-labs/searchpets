import { PageContainer } from "../components/Base";
import { searchHandlers, fetchSomeStuff } from "../handlers";
import { useState } from "react";
import { GetServerSideProps, GetStaticProps } from "next"


export const getStaticProps: GetStaticProps = async () => {
  const data = await fetchSomeStuff("/api/data").then((res) => {
    return res
  })

  return {
    props: data,
    revalidate: 60
  }
}


export default function Home({ comicCount, charCount }: any) {
  type Response = ComicItemType[] | never[]

  const [comics, setComics] = useState<ComicItemType[]>([])

  let years = ["2017"]
  let characters = ["grape"]

  return (
    <PageContainer title="Search" description="Search page">
      <div className="grid grid-cols-2 gap-3">
        {comicCount}
        {charCount}
        {
          comics.map((items) => {
            return (

              <div className="p-4 border">
                {items.title}
              </div>
            )
          })
        }
      </div>
    </PageContainer>
  );
}
