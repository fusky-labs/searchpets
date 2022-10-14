import Container from "@/components/Base/Container"
import Link from "next/link"
import { GetStaticProps } from "next"
import { dataHandler } from "../handlers/ApiHandler"

export const getStaticProps: GetStaticProps = async () => {
  const data = await dataHandler().then((res) => {
    return res
  })

  return {
    props: { data },
    revalidate: 120
  }
}

export default function Home({ comicCount, charCount }: DataResponseType) {
  return (
    <Container>
      <div className="text-center flex flex-col items-center w-full">
        <Link href="/characters">{charCount}</Link> characters and {comicCount}
        comics
        <div>searchbox here</div>
      </div>
    </Container>
  )
}
