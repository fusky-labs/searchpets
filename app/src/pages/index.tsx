import ComicItem from "@/components/ComicItem";
import Container from "@/components/Container";
import SearchContainer from "@/components/SearchContainer";

export default function Home() {
  return (
    <Container wrap>
      <SearchContainer />
      <div>
        <ComicItem />
        <ComicItem />
        <ComicItem />
      </div>
    </Container>
  )
}
