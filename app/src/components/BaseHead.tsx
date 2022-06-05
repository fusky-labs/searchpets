import Head from "next/head"
import { useRouter } from "next/router"

export default function BaseHead({
  title,
  description,
}: {
  title: string
  description: string
}) {
  const SITE_TITLE = "Searchpets!"
  const router = useRouter()

  return (
    <>
      <Head>
        <title>
          {SITE_TITLE} | {title}
        </title>
        <meta name="description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={SITE_TITLE} />
        <meta property="og:title" content={`${SITE_TITLE} | ${title}`} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content="/static/Searchpets-Peanut.png" />
        <meta
          property="og:url"
          content={`https://searchpets.xyz${router.asPath}`}
        />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:image" content="/static/Searchpets-Peanut.png" />
        <meta name="twitter:title" content={`${SITE_TITLE} | ${title}`} />
        <meta name="twitter:description" content={description} />
        <link rel="canonical" href={`https://searchpets.xyz${router.asPath}`} />
        <meta
          name="keywords"
          content="housepets, furry, furries, searchpets, cartoon, comics, furry comics, animals, animal comic, fursuit"
        />
      </Head>
    </>
  )
}
