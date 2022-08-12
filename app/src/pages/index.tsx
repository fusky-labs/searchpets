import {ComicItemLoading} from "@/components/ComicItem";
import Container from "@/components/Container";
import SearchContainer from "@/components/SearchContainer";
import dynamic from "next/dynamic";

const ComicItem = dynamic(() => import("../components/ComicItem"), {
  loading:() => <ComicItemLoading />,
  suspense: true,
  ssr: false
})

export default function Home() {
  return (
    <Container wrap>
      <SearchContainer />
      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-3 mt-2 px-1">
        {/* <ComicItemLoading /> */}
        <ComicItem img="/static/01.jpg" title="title" />
        <ComicItem img="/static/02.jpg" title="title" />
        <ComicItem img="/static/03.jpg" title="title" />
        <ComicItem img="/static/04.jpg" title="title" />
        <ComicItem img="/static/05.jpg" title="title" />
      </div>
    </Container>
  )
}
