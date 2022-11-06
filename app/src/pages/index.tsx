import Link from "next/link"
import Container from "@/components/Base/Container"
import { GetStaticProps } from "next"
import { dataHandler } from "../handlers/ApiHandler"

export const getStaticProps: GetStaticProps = async () => {
  const data = await dataHandler().then((res) => {
    return res
  })

  return { props: data, revalidate: 120 }
}

export default function Home({ comicCount, charCount }: IDataResponse) {
  const title = "Searchpets! v2 - Under construction"
	const description = `Browse over ${comicCount} comics and ${charCount} characters from the Housepets! catalog`

	return (
    <Container title={title} description={description}>
      <div className="text-center flex flex-col items-center w-full">
        <div className="p-4 mb-6 bg-red-700 text-white rounded-md w-[50%]">
          <strong>Warning:</strong> Searchpets v2 is still incomplete! This
          domain is only for testing purposes, the v2 part of the domain will be
          omitted once it's ready to be rolled out.
        </div>
        <Heading characters={charCount} comic={comicCount} />
        <div>searchbox here</div>
      </div>
    </Container>
  )
}

interface HeadingProps {
  comic: number
  characters: number
}

function Heading(props: HeadingProps) {
  return (
    <div>
      Browse through {props.comic} comics and{" "}
      <Link href="/characters">
        <a>{props.characters}</a>
      </Link>{" "}
    </div>
  )
}
