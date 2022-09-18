import Container from "@/components/base/Container"
import { GetServerSideProps } from "next"
import { dataHandler } from "../handlers/ApiHandler"

export const getServerSideProps: GetServerSideProps = async () => {
  const data = dataHandler().then((res) => {
    return res
  })
  return { props: data }
}

export default function Home({ comicCount, charCount }: DataResponseType) {
  return (
    <Container>
      <div className="text-center flex flex-col items-center w-full">
        {charCount} characters and {comicCount} comics
        <div>searchbox here</div>
      </div>
    </Container>
  )
}
