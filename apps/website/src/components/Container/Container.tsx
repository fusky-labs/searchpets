import Head from "next/head"
import { useRouter } from "next/router"
import { BackToTop } from "../Buttons/BackToTop"

interface ContainerProps {
  children?: React.ReactNode
  t: string
  d: string
}

export default function Container(props: ContainerProps) {
  const router = useRouter()

  const SITE_URL = `https://searchpets.xyz${router.asPath}`

  return (
    <>
      <Head>
        <title>{props.t}</title>
        <meta name="description" content={props.d} />
        <meta property="og:title" content={props.t} />
        <meta property="og:description" content={props.d} />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content={props.t} />
        <meta name="twitter:url" content={SITE_URL} />
        <meta name="twitter:description" content={props.d} />
        <meta name="twitter:card" content="summary" />
        <link rel="canonical" href={SITE_URL} />
      </Head>
			<BackToTop />
      <main className="pt-[6.125rem]">{props.children}</main>
    </>
  )
}
