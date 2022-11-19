import { PageContainer } from "../components/Base";
import { searchHandlers } from "src/handlers";
import { useState } from "react";
export default function Home() {
  type Response = ComicItemType[] | never[]

  const [comics, setComics] = useState<ComicItemType[]>([])
  
  let years = ["2017"]
  let characters = ["grape"]

  searchHandlers(years, characters).then((response) => {
    console.log(response)
    setComics(response as Response)
  })

  return (
    <PageContainer title="Search" description="Search page">
      <div className="grid grid-cols-2 gap-3">
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
